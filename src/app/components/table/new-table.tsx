import {
  Header,
  SortingState,
  Table,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import styles from "@/app/styles/table.module.css";
import { MemoizedTableBody, TableBody } from "./table-body";
import { getCommonPinningStyles } from "./util";
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
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
  MdCheckbox,
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { ArrowUpward, Settings } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { HeaderComponent } from "./header";
import {
  FloatingFocusManager,
  autoUpdate,
  hide,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicPopoverStyles } from "@/app/util/constants";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { flushSync } from "react-dom";
import { useScroll } from "framer-motion";

export const NewBasicTable = ({
  data,
  columns,
  pinningColumns = [],
  isSingleSelect = false,
  getSelectionRows,
  actionComponent,
}: {
  data: any[];
  columns: any[];
  pinningColumns?: string[];
  isSingleSelect?: boolean;
  getSelectionRows?: (Rows: any[]) => void;
  actionComponent?: React.ReactNode;
}) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id)
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    },
    onRowSelectionChange: setSelectedRows,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    enableMultiRowSelection: !isSingleSelect,
    // enableMultiSort: true,
  });

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
        <div className="flex gap-2 items-center h-10 z-20">
          <MdTypography variant="label" size="large" className="text-outline">
            Total: {data.length}
          </MdTypography>
          <ColumnFilterButton table={table} />
        </div>
      </div>
      <OverlayScrollbarsComponent defer>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <table
            className={styles.table}
            style={{
              ...columnSizeVars,
              width: table.getCenterTotalSize(),
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <thead key={headerGroup.id}>
                <tr>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <HeaderComponent
                        key={header.id}
                        header={header}
                        disabled={!header.column.getCanSort()}
                        isPinned={header.column.getIsPinned() !== false}
                      />
                    ))}
                  </SortableContext>
                </tr>
              </thead>
            ))}

            {table.getState().columnSizingInfo.isResizingColumn ? (
              <MemoizedTableBody table={table} />
            ) : (
              <TableBody table={table} />
            )}
          </table>
        </DndContext>
      </OverlayScrollbarsComponent>
    </div>
  );
};

const ColumnFilterButton = ({ table }: { table: Table<any> }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    setVisibleColumns(
      table
        .getAllColumns()
        .filter((column) => column.getIsVisible())
        .map((col) => col.id)
    );
  }, [table, isColumnFilterOpen]);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isColumnFilterOpen,
    onOpenChange: setIsColumnFilterOpen,
    middleware: [
      hide(),
      offset(6),
      shift(),
      size({
        apply({ availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight));
        },
      }),
    ],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);
  return (
    <>
      <MdOutlinedIconButton ref={refs.setReference} {...getReferenceProps()}>
        <MdIcon>
          <Settings />
        </MdIcon>
      </MdOutlinedIconButton>
      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          visibility: middlewareData.hide?.referenceHidden
            ? "hidden"
            : "visible",
        }}
        {...getFloatingProps()}
      >
        {isMounted && (
          <FloatingFocusManager context={context}>
            <div style={transitionStyles}>
              <MdElevatedCard>
                <MdTypography variant="title" size="large" className="p-6">
                  Grid Column Setting
                </MdTypography>
                <MdList
                  style={{ maxHeight: maxHeight - 200 }}
                  className="bg-surfaceContainerLow overflow-y-auto"
                >
                  <MdListItem type="button">
                    <MdCheckbox
                      slot="start"
                      checked={
                        table.getAllColumns().length === visibleColumns.length
                      }
                    />
                    Select All
                  </MdListItem>
                  <DividerComponent />
                  {table.getAllColumns().map((column) => (
                    <MdListItem
                      key={column.id}
                      type="button"
                      onClick={() => {
                        setVisibleColumns((prev) => {
                          if (prev.includes(column.id)) {
                            return prev.filter((col) => col !== column.id);
                          } else {
                            return [...prev, column.id];
                          }
                        });
                      }}
                    >
                      <MdCheckbox
                        slot="start"
                        checked={
                          visibleColumns.includes(column.id) ||
                          table.getAllColumns().length === visibleColumns.length
                        }
                      />
                      {column.columnDef.header as string}
                    </MdListItem>
                  ))}
                </MdList>
                <div
                  aria-label="column-filter-actions"
                  className="flex gap-2 p-6 justify-end"
                >
                  <MdTextButton
                    onClick={() => {
                      table.toggleAllColumnsVisible(true);
                      setIsColumnFilterOpen(false);
                    }}
                  >
                    Reset
                  </MdTextButton>
                  <MdFilledButton
                    onClick={() => {
                      table.getAllColumns().forEach((column) => {
                        column.toggleVisibility(
                          visibleColumns.includes(column.id)
                        );
                      });
                      setIsColumnFilterOpen(false);
                    }}
                  >
                    Apply
                  </MdFilledButton>
                </div>
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </>
  );
};
