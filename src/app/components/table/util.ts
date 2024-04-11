import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "@tanstack/react-table";
import { CSSProperties, Dispatch, SetStateAction } from "react";

export const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    // right border for left pinned columns
    boxShadow: isLastLeftPinnedColumn
      ? "-1px 0 0 0 var(--md-sys-color-on-surface-variant) inset"
      : isFirstRightPinnedColumn
      ? "1px 0 0 0 var(--md-sys-color-on-surface-variant) inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.columnDef?.size === undefined ? "auto" : column.getSize(),
    minWidth: column.columnDef.minSize,
    zIndex: isPinned ? 20 : undefined,
  };
};

// reorder columns after drag & drop
export function handleDragEnd(
  event: DragEndEvent,
  setColumnOrder: Dispatch<SetStateAction<string[]>>
) {
  const { active, over } = event;
  if (active && over && active.id !== over.id) {
    setColumnOrder((columnOrder) => {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
    });
  }
}
