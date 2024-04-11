import {
  Header,
  SortingState,
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
  MdElevatedCard,
  MdIcon,
  MdIconButton,
  MdOutlinedIconButton,
} from "@/app/util/md3";
import { ArrowUpward, Settings } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { HeaderComponent } from "./header";
import {
  FloatingFocusManager,
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicPopoverStyles } from "@/app/util/constants";

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

  const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isColumnFilterOpen,
    onOpenChange: setIsColumnFilterOpen,
    middleware: [offset(6), shift()],
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
    <div className="relative flex flex-col gap-4">
      <div className="flex items-end ">
        {actionComponent}
        <div className="flex gap-2 items-center h-10 z-20">
          <MdTypography variant="label" size="large" className="text-outline">
            Total: {data.length}
          </MdTypography>
          <MdOutlinedIconButton
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <MdIcon>
              <Settings />
            </MdIcon>
          </MdOutlinedIconButton>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {isMounted && (
              <FloatingFocusManager context={context}>
                <div style={transitionStyles}>
                  <MdElevatedCard className="p-3">123123</MdElevatedCard>
                </div>
              </FloatingFocusManager>
            )}
          </div>
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
