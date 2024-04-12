import { Cell, Row, Table, flexRender } from "@tanstack/react-table";
import { getCommonPinningStyles } from "./util";
import { CSSProperties, memo, use, useEffect, useState } from "react";

export const TableBody = ({ table }: { table: Table<any> }) => {
  const [hoverInfo, setHoverInfo] = useState<{
    row: Row<any>;
    cell: Cell<any, unknown>;
  } | null>(null);

  const [selectInfo, setSelectInfo] = useState<{
    row: Row<any>;
    cell: Cell<any, unknown>;
  } | null>(null);

  useEffect(() => {
    setHoverInfo(null);
    setSelectInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().pagination]);

  useEffect(() => {
    console.log(hoverInfo);
  }, [hoverInfo]);

  useEffect(() => {
    console.log(selectInfo);
  }, [selectInfo]);

  function getBgColor(
    isSelected: boolean,
    isHovered: boolean,
    type: "cell" | "row"
  ) {
    if (type === "cell") {
      // Cell Style
      if (isSelected) {
        return `color-mix(in srgb, var(--md-sys-color-primary) 12%, transparent)`;
      } else {
        if (isHovered) {
          return `color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent)`;
        } else {
          return ``;
        }
      }
    } else {
      // Row Style
      if (isSelected) {
        return `color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent)`;
      } else {
        if (isHovered) {
          return `color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent)`;
        } else {
          return `var(--md-sys-color-surface)`;
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
            style={{
              backgroundColor: getBgColor(
                row === selectInfo?.row,
                row === hoverInfo?.row,
                "row"
              ),
            }}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  style={{
                    // width: cell.column.getSize(),
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    ...getCommonPinningStyles(cell.column),
                    backgroundColor: getBgColor(
                      cell === selectInfo?.cell,
                      cell === hoverInfo?.cell,
                      "cell"
                    ),
                  }}
                  className="p-2"
                  onMouseEnter={(e) => {
                    setHoverInfo({ row, cell });
                  }}
                  onMouseLeave={(e) => {
                    setHoverInfo((prev) => (prev?.row === row ? null : prev));
                  }}
                  onClick={(e) => {
                    setSelectInfo({ row, cell });
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
