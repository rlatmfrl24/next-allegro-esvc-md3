import { Column, Row, Table, flexRender } from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "./typography";
import { CSSProperties, useEffect } from "react";
import { DividerComponent } from "../main/booking/information/components/base";

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
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

export const BasicTable = ({
  table,
  onRowSelction,
}: {
  table: Table<any>;
  onRowSelction?: (row: Row<any>, columnId: string | undefined) => void;
}) => {
  useEffect(() => {
    console.log(table.getState().columnSizing);
    console.log(table.getState().columnSizingInfo);
  }, [table]);

  return (
    <table
      className={styles.table}
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <thead key={headerGroup.id}>
          <tr>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  ...getCommonPinningStyles(header.column),
                  width: header.getSize(),
                }}
                className="max-h-14 h-14"
              >
                <div className="h-full flex items-center">
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="p-2 flex-1 select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </MdTypography>

                  <div
                    {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                    }}
                    className="w-2 h-[calc(100%-16px)] cursor-col-resize border-r border-r-outlineVariant"
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
      ))}
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="group">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      ...getCommonPinningStyles(cell.column),
                    }}
                    className="group-hover:bg-surfaceContainer p-2"
                    onClick={(e) => {
                      onRowSelction?.(row, cell.column.id);
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
