import {
  Cell,
  ColumnFiltersState,
  PaginationState,
  RowData,
  SortingState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "@/app/styles/table.module.css";
import { MemoizedTableBody, TableBody } from "./table-body";
import { MdTypography } from "../typography";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { HeaderComponent } from "./header";
import { ColumnFilterButton } from "./column-filter";
import { TablePaginator } from "./paginator";
import { getCommonPinningStyles } from "./util";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateRow: (rowIndex: number, value: unknown) => void;
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
      hiddenColumns={hiddenColumns}
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
  getSelectionRows,
  ActionComponent,
  updater,
}: {
  data: any[];
  columns: any[];
  pinningColumns?: string[];
  controlColumns?: string[];
  ignoreSelectionColumns?: string[];
  hiddenColumns?: string[];
  requiredColumns?: string[];
  disableColumns?: string[];
  editableColumns?: string[];
  onlyNumberColumns?: string[];
  isSingleSelect?: boolean;
  getSelectionRows?: (Rows: any[], table: Table<any>) => void;
  ActionComponent?: (table: Table<any>) => React.ReactNode;
  updater?: Dispatch<SetStateAction<any[]>>;
}) => {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, column) => {
      acc[column.id] = !hiddenColumns.includes(column.id);
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id)
  );
  const [selectedCell, setSelectedCell] = useState<Cell<any, unknown> | null>(
    null
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
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
    setColumnOrder(columns.map((column) => column.id));
  }, [columns, table]);

  useEffect(() => {
    getSelectionRows &&
      getSelectionRows(
        Object.keys(selectedRows).map((key) => data[parseInt(key)]),
        table
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

  return (
    <div className="relative flex flex-col gap-4 flex-1 h-full">
      <div className="flex items-end">
        {ActionComponent && <ActionComponent {...table} />}
        <div className="flex gap-2 items-center h-10 z-10">
          <TablePaginator table={table} />
          <MdTypography variant="label" size="large" className="text-outline">
            Total: {data.length}
          </MdTypography>
          <ColumnFilterButton table={table} expectColumnIds={controlColumns} />
        </div>
      </div>
      <OverlayScrollbarsComponent defer className="flex-1">
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
                  >
                    {headerGroup.headers.map((header) =>
                      controlColumns.includes(header.id) ? (
                        <th
                          key={header.id}
                          style={{
                            width: `calc(var(--header-${header?.id}-size) * 1px)`,
                            ...getCommonPinningStyles(header.column),
                          }}
                          className="max-h-14 h-14 p-2 min-w-fit "
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ) : (
                        <HeaderComponent
                          key={header.id}
                          header={header}
                          required={requiredColumns.includes(header.id)}
                          disabled={!header.column.getCanSort()}
                          isPinned={header.column.getIsPinned() !== false}
                        />
                      )
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
      </OverlayScrollbarsComponent>
    </div>
  );
};
