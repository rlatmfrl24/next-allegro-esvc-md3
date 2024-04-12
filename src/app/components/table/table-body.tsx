import { CSSProperties, Dispatch, memo, SetStateAction, useState } from "react";

import { Cell, flexRender, Row, Table } from "@tanstack/react-table";

import { getCommonPinningStyles } from "./util";

export const TableBody = ({
  table,
  selectedCell,
  onCellSelected,
}: {
  table: Table<any>;
  selectedCell?: Cell<any, unknown> | null;
  onCellSelected?: Dispatch<SetStateAction<any>>;
}) => {
  const [hoverInfo, setHoverInfo] = useState<{
    row: Row<any>;
    cell: Cell<any, unknown>;
  } | null>(null);

  function getCellStyles(cell: Cell<any, unknown>) {
    if (selectedCell?.id === cell.id) {
      return {
        backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 12%, white)`,
        border: `2px solid var(--md-sys-color-primary)`,
        zIndex: 10,
      } as CSSProperties;
    } else {
      if (cell.row.getIsSelected()) {
        return {
          backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderTop: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderLeft: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderRight: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
          borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
        } as CSSProperties;
      } else {
        if (hoverInfo?.cell === cell) {
          return {
            backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 12%, white)`,
            border: `1px solid var(--md-sys-color-outline)`,
          } as CSSProperties;
        } else {
          if (hoverInfo?.row === cell.row) {
            return {
              backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderTop: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderLeft: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderRight: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
              borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
            } as CSSProperties;
          } else {
            return {
              backgroundColor: `var(--md-sys-color-surface)`,
              borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
            } as CSSProperties;
          }
        }
      }
    }
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr
            key={row.id}
            // style={{
            //   borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
            // }}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  style={{
                    // width: cell.column.getSize(),
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    ...getCommonPinningStyles(cell.column),
                    ...getCellStyles(cell),
                  }}
                  className="p-2 border-box border-x border-x-transparent border-y border-y-transparent"
                  onMouseEnter={(e) => {
                    setHoverInfo({ row, cell });
                  }}
                  onMouseLeave={(e) => {
                    setHoverInfo((prev) => (prev?.row === row ? null : prev));
                  }}
                  onClick={(e) => {
                    row.getIsSelected()
                      ? onCellSelected?.(null)
                      : onCellSelected?.(cell);
                    row.toggleSelected();
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
  );
};

// Upgrade Performance by memoizing the TableBody component
export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody;
