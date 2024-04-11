import {
  Header,
  flexRender,
  getCoreRowModel,
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

export const NewBasicTable = ({
  data,
  columns,
  pinningColumns = [],
  isSingleSelect = false,
}: {
  data: any[];
  columns: any[];
  pinningColumns?: string[];
  isSingleSelect?: boolean;
}) => {
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
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: pinningColumns,
      },
    },
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    enableMultiRowSelection: !isSingleSelect,
    debugAll: true,
  });

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
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
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
                items={columns.map((column) => column.id)}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <HeaderComponent
                    key={header.id}
                    header={header}
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
  );
};

const HeaderComponent = ({
  header,
  isPinned = false,
}: {
  header: Header<any, any>;
  isPinned?: boolean;
}) => {
  // const headerStyles = isPinned ? getCommonPinningStyles(header.column) :
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const draggableStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
  };

  const headerStyles = isPinned
    ? getCommonPinningStyles(header.column)
    : draggableStyles;

  return (
    <th
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        ...headerStyles,
        // width: header.getSize(),
        width: `calc(var(--header-${header?.id}-size) * 1px)`,
      }}
      className="max-h-14 h-14"
    >
      <div className="h-full flex items-center">
        <MdTypography
          variant="body"
          size="medium"
          prominent
          className="p-2 flex-1 select-none"
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </MdTypography>

        <div
          onMouseDown={(e) => {
            // table.resetRowSelection();
            header.getResizeHandler()(e);
          }}
          onTouchStart={(e) => {
            // table.resetRowSelection();
            header.getResizeHandler()(e);
          }}
          className={`w-2 h-[calc(100%-16px)] cursor-col-resize border-r border-r-outlineVariant`}
        ></div>
      </div>
    </th>
  );
};
