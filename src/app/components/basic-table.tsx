import { Column, Table, flexRender } from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "./typography";
import { CSSProperties, memo, useMemo } from "react";
import { MdRippleEffect } from "../util/md3";
import React from "react";

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
    zIndex: isPinned ? 1 : 0,
  };
};

export const BasicTable = ({ table }: { table: Table<any> }) => {
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
                      if (row.getIsSelected()) {
                        return;
                      } else {
                        row.toggleSelected();
                      }
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
