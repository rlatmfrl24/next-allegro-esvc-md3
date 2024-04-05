import { Column, Row, Table, flexRender } from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "./typography";
import { CSSProperties } from "react";

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
  return (
    <table className={styles.table}>
      {table.getHeaderGroups().map((headerGroup) => (
        <thead key={headerGroup.id}>
          <tr>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  ...getCommonPinningStyles(header.column),
                }}
              >
                <MdTypography variant="body" size="medium" className="p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </MdTypography>
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
