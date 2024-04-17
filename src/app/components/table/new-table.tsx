import {
  Cell,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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

export const NewBasicTable = ({
  data,
  columns,
  pinningColumns = [],
  controlColumns = [],
  ignoreSelectionColumns = [],
  disableColumns = [],
  editableColumns = [],
  isSingleSelect = false,
  getSelectionRows,
  actionComponent,
  updater,
}: {
  data: any[];
  columns: any[];
  pinningColumns?: string[];
  controlColumns?: string[];
  ignoreSelectionColumns?: string[];
  disableColumns?: string[];
  editableColumns?: string[];
  isSingleSelect?: boolean;
  getSelectionRows?: (Rows: any[]) => void;
  actionComponent?: React.ReactNode;
  updater?: Dispatch<SetStateAction<any[]>>;
}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id)
  );
  const [selectedCell, setSelectedCell] = useState<Cell<any, unknown> | null>(
    null
  );

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
    initialState: {
      columnPinning: {
        left: pinningColumns,
      },
    },
    state: {
      rowSelection: selectedRows,
      columnOrder,
      sorting,
      columnVisibility,
      pagination,
    },
    onRowSelectionChange: setSelectedRows,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableMultiRowSelection: !isSingleSelect,
    // enableMultiSort: true,
    meta: {
      updateData: (rowIndex: string, columnIndex: string, value: string) => {},
    },
  });

  function handleCellUpdate(
    rowIndex: string,
    columnIndex: string,
    value: string
  ) {
    updater &&
      updater((prev) => {
        // const updatedIndex = prev.findIndex((row) => row.id === rowIndex);
        const updatedIndex = parseInt(rowIndex);
        return [
          ...prev.slice(0, updatedIndex),
          {
            ...prev[updatedIndex],
            [columnIndex]: value,
          },
          ...prev.slice(updatedIndex + 1),
        ];
      });
  }

  useEffect(() => {
    getSelectionRows &&
      getSelectionRows(
        Object.keys(selectedRows).map((key) => data[parseInt(key)])
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
    <div className="relative flex flex-col gap-4">
      <div className="flex items-end ">
        {actionComponent}
        <div className="flex gap-2 items-center h-10 z-10">
          <TablePaginator table={table} />
          <MdTypography variant="label" size="large" className="text-outline">
            Total: {data.length}
          </MdTypography>
          <ColumnFilterButton table={table} expectColumnIds={controlColumns} />
        </div>
      </div>
      <OverlayScrollbarsComponent defer>
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
              // width: table.getCenterTotalSize(),
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
                onCellEdit={(rowId, columnId, value) => {
                  handleCellUpdate(rowId, columnId, value);
                }}
              />
            ) : (
              <TableBody
                table={table}
                selectedCell={selectedCell}
                onCellSelected={setSelectedCell}
                ignoreSelectionColumns={ignoreSelectionColumns}
                disableColumns={disableColumns}
                editableColumns={editableColumns}
                onCellEdit={(rowId, columnId, value) => {
                  handleCellUpdate(rowId, columnId, value);
                }}
              />
            )}
          </table>
        </DndContext>
      </OverlayScrollbarsComponent>
    </div>
  );
};
