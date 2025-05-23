import { getCookie, setCookie } from "cookies-next";
import type React from "react";
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useDraggable } from "react-use-draggable-scroll";

import styles from "@/app/styles/table.module.css";
import { MdFilledIconButton, MdOutlinedIconButton } from "@/app/util/md3";
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
} from "@dnd-kit/sortable";
import { Check, MoveDown } from "@mui/icons-material";
import {
	type Cell,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type RowData,
	type SortingState,
	type Table,
	useReactTable,
} from "@tanstack/react-table";

import { MdTypography } from "../typography";
import { ColumnFilterButton } from "./column-filter";
import { HeaderComponent } from "./header";
import { TablePaginator } from "./paginator";
import { MemoizedTableBody, TableBody } from "./table-body";
import { getCommonPinningStyles } from "./util";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
		updateRow: (rowIndex: number, value: unknown) => void;
	}
	interface ColumnMeta<TData extends RowData, TValue> {
		format?: (value: TValue) => string;
		rowSpan?: number;
	}
}

function useSkipper() {
	const shouldSkipRef = useRef(true);
	const shouldSkip = shouldSkipRef.current;

	// Wrap a function with this to skip a pagination reset temporarily
	const skip = useCallback(() => {
		shouldSkipRef.current = false;
	}, []);

	useEffect(() => {
		shouldSkipRef.current = true;
	});

	return [shouldSkip, skip] as const;
}

export const useBasicTable = ({
	data,
	columns,
	pinningColumns = [],
	controlColumns = [],
	ignoreSelectionColumns = [],
	disableColumns = [],
	requiredColumns = [],
	editableColumns = [],
	hiddenColumns = [],
	isSingleSelect = false,
	ActionComponent,
	updater,
}: {
	data: any[];
	columns: any[];
	pinningColumns?: string[];
	controlColumns?: string[];
	ignoreSelectionColumns?: string[];
	disableColumns?: string[];
	requiredColumns?: string[];
	editableColumns?: string[];
	hiddenColumns?: string[];
	isSingleSelect?: boolean;
	ActionComponent?: (table: Table<any>) => React.ReactNode;
	updater?: Dispatch<SetStateAction<any[]>>;
}) => {
	// const [data, setData] = useState<any[]>([]);
	// const [columns, setColumns] = useState<any[]>([]);
	// const tableData = useMemo(() => data, [data]);
	// const tableColumns = useMemo(() => columns, [columns]);
	const [selectedRows, setSelectedRows] = useState<any>({});

	const renderTable = (props: {
		data: any[];
		columns: any[];
		getSelectionRows?: (Rows: any[], table: Table<any>) => void;
		onRowSelectionChange?: Dispatch<SetStateAction<any>>;
	}) => (
		<BasicTable
			{...props}
			data={data}
			columns={columns}
			pinningColumns={pinningColumns}
			controlColumns={controlColumns}
			ignoreSelectionColumns={ignoreSelectionColumns}
			disableColumns={disableColumns}
			requiredColumns={requiredColumns}
			editableColumns={editableColumns}
			// hiddenColumns={hiddenColumns}
			isSingleSelect={isSingleSelect}
			getSelectionRows={(rows) => {
				setSelectedRows(rows);
			}}
			ActionComponent={ActionComponent}
			updater={updater}
		/>
	);

	return { renderTable, selectedRows, setSelectedRows };
};

export const BasicTable = ({
	data,
	columns,
	pinningColumns = [],
	controlColumns = [],
	ignoreSelectionColumns = [],
	disableColumns = [],
	requiredColumns = [],
	editableColumns = [],
	hiddenColumns = [],
	onlyNumberColumns = [],
	isSingleSelect = false,
	cookieKey,
	getSelectionRows,
	ActionComponent,
	updater,
}: {
	data: any[];
	columns: any[];
	pinningColumns?: string[];
	controlColumns?: string[];
	ignoreSelectionColumns?: string[];
	requiredColumns?: string[];
	disableColumns?: string[];
	editableColumns?: string[];
	onlyNumberColumns?: string[];
	hiddenColumns?: string[];
	isSingleSelect?: boolean;
	cookieKey?: string;
	getSelectionRows?: (Rows: any[], table: Table<any>) => void;
	ActionComponent?: (table: Table<any>) => React.ReactNode;
	updater?: Dispatch<SetStateAction<any[]>>;
}) => {
	const defaultColumnInfo = useMemo(() => {
		const columnInfo = getCookie(cookieKey ?? "");
		if (columnInfo) {
			return JSON.parse(columnInfo);
		}
		return [];
	}, [cookieKey]);

	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [columnSizes, setColumnSizes] = useState(
		defaultColumnInfo.length > 0
			? defaultColumnInfo.reduce((acc: any, cur: any) => {
					acc[cur.id] = cur.size;
					return acc;
				}, {})
			: {},
	);
	const [columnVisibility, setColumnVisibility] = useState(
		hiddenColumns.reduce((acc: any, cur: any) => {
			acc[cur] = false;
			return acc;
		}, {} as any),
	);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [selectedRows, setSelectedRows] = useState({});
	const [columnOrder, setColumnOrder] = useState<string[]>(
		// columns.map((column) => column.id)
		defaultColumnInfo.length > 0
			? defaultColumnInfo.map((column: any) => column.id)
			: columns.map((column) => column.id),
	);
	const [selectedCell, setSelectedCell] = useState<Cell<any, unknown> | null>(
		null,
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

	const [canReorderColumns, setCanReorderColumns] = useState(false);

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	);

	const table = useReactTable({
		data,
		columns,
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		columnResizeDirection: "ltr",
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		initialState: {
			columnPinning: {
				left: pinningColumns,
			},
		},
		state: {
			rowSelection: selectedRows,
			columnSizing: columnSizes,
			columnFilters,
			columnOrder,
			sorting,
			columnVisibility,
			pagination,
		},
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setSelectedRows,
		onColumnOrderChange: setColumnOrder,
		onColumnVisibilityChange: setColumnVisibility,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnSizingChange: setColumnSizes,
		enableMultiRowSelection: !isSingleSelect,
		// enableMultiSort: true,
		autoResetPageIndex,
		meta: {
			updateData: (rowIndex, columnId, value) => {
				updater?.((old) => {
					skipAutoResetPageIndex();
					return old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex]!,
								[columnId]: value,
							};
						}
						return row;
					});
				});
			},
			updateRow: (rowIndex, value) => {
				updater?.((old) => {
					skipAutoResetPageIndex();
					return old.map((row, index) => {
						if (index === rowIndex) {
							return value;
						}
						return row;
					});
				});
			},
		},
	});

	useEffect(() => {
		const invisibleColumnIds = defaultColumnInfo
			.filter((column: any) => !column.isVisible)
			.map((column: any) => column.id);

		table.getAllColumns().forEach((column) => {
			column.toggleVisibility(!invisibleColumnIds.includes(column.id));
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const columnInfo = table
			.getAllColumns()
			.map((column) => {
				return {
					id: column.id,
					size: column.getSize(),
					isVisible: column.getIsVisible(),
				};
			})
			.sort((a, b) => {
				return columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id);
			});

		if (cookieKey) {
			setCookie(cookieKey, JSON.stringify(columnInfo));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [columnSizes, columnOrder, columnVisibility]);

	useEffect(() => {
		getSelectionRows &&
			getSelectionRows(
				Object.keys(selectedRows).map((key) => data[parseInt(key)]),
				table,
			);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRows]);

	const columnSizeVars = useMemo(() => {
		const headers = table.getFlatHeaders();
		const colSizes: { [key: string]: number } = {};
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!;
			colSizes[`--header-${header.id}-size`] = header.getSize();
			colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
		}
		return colSizes;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [table.getState().columnSizingInfo]);

	// reorder columns after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	const scrollRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	const { events } = useDraggable(scrollRef, {
		// applyRubberBandEffect: true,
		isMounted: !!scrollRef.current,
	}); // Now we pass the reference to the useDraggable hook:

	// const [initialize, instance] = useOverlayScrollbars({
	//   defer: true,
	// });
	// useEffect(() => {
	//   initialize(scrollRef.current!);
	//   // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [instance]);

	return (
		<div className="relative flex flex-col gap-2 flex-1 h-full">
			<div className="flex items-end">
				{ActionComponent && <ActionComponent {...table} />}
				<div className="flex gap-2 items-center h-10 z-10">
					<TablePaginator table={table} />
					<MdTypography variant="label" size="large" className="text-outline">
						Total: {data.length}
					</MdTypography>
					{canReorderColumns ? (
						<MdFilledIconButton
							onClick={() => {
								setCanReorderColumns(false);
							}}
						>
							<Check />
						</MdFilledIconButton>
					) : (
						<MdOutlinedIconButton
							onClick={() => {
								setCanReorderColumns(true);
							}}
						>
							<MoveDown className="rotate-90" />
						</MdOutlinedIconButton>
					)}
					<ColumnFilterButton table={table} expectColumnIds={controlColumns} />
				</div>
			</div>
			<div
				className={styles.tableWrapper}
				ref={scrollRef}
				onMouseDown={!canReorderColumns ? events.onMouseDown : undefined}
			>
				<DndContext
					collisionDetection={closestCenter}
					modifiers={[restrictToHorizontalAxis]}
					onDragEnd={handleDragEnd}
					sensors={sensors}
				>
					<table
						className={styles.table}
						style={{
							...columnSizeVars,
							width: "99.8%", // to prevent horizontal scroll
							// minHeight: "480px",
						}}
					>
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									<SortableContext
										items={columnOrder}
										strategy={horizontalListSortingStrategy}
										disabled={!canReorderColumns}
									>
										{headerGroup.headers.map((header) =>
											controlColumns.includes(header.id) ? (
												<th
													key={header.id}
													style={{
														width: `calc(var(--header-${header?.id}-size) * 1px)`,
														...getCommonPinningStyles(header.column),
													}}
													className={`relative max-h-14 h-14 p-2 min-w-fit ${
														header.column.getIsPinned() ? "z-30" : ""
													}`}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													<div
														onMouseDown={(e) => {
															// table.resetRowSelection();
															header.getResizeHandler()(e);
														}}
														onTouchStart={(e) => {
															// table.resetRowSelection();
															header.getResizeHandler()(e);
														}}
														className={`absolute top-2 right-0 z-20 w-3 h-[calc(100%-16px)] cursor-col-resize border-r border-r-outlineVariant`}
													></div>
												</th>
											) : (
												<HeaderComponent
													key={header.id}
													header={header}
													required={requiredColumns.includes(header.id)}
													disabled={!header.column.getCanSort()}
													isPinned={header.column.getIsPinned() !== false}
												/>
											),
										)}
									</SortableContext>
								</tr>
							))}
						</thead>

						{table.getState().columnSizingInfo.isResizingColumn ? (
							<MemoizedTableBody
								table={table}
								selectedCell={selectedCell}
								onCellSelected={setSelectedCell}
								ignoreSelectionColumns={ignoreSelectionColumns}
								disableColumns={disableColumns}
								editableColumns={editableColumns}
								onlyNumberColumns={onlyNumberColumns}
							/>
						) : (
							<TableBody
								table={table}
								selectedCell={selectedCell}
								onCellSelected={setSelectedCell}
								ignoreSelectionColumns={ignoreSelectionColumns}
								disableColumns={disableColumns}
								editableColumns={editableColumns}
								onlyNumberColumns={onlyNumberColumns}
							/>
						)}
					</table>
				</DndContext>
				<div className="flex-1"></div>
			</div>
			{/* <OverlayScrollbarsComponent
        defer
        className="flex-1"
      ></OverlayScrollbarsComponent> */}
		</div>
	);
};
