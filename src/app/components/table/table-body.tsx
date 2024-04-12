import { Cell, Row, Table, flexRender } from "@tanstack/react-table";
import { getCommonPinningStyles } from "./util";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  memo,
  use,
  useEffect,
  useState,
} from "react";

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

  function getStyles(
    isSelected: boolean,
    isHovered: boolean,
    type: "cell" | "row"
  ) {
    if (type === "cell") {
      // Cell Style
      if (isSelected) {
        return {
          backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 12%, transparent)`,
          border: `2px solid var(--md-sys-color-primary)`,
        } as CSSProperties;
      } else {
        if (isHovered) {
          return {
            backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent)`,
            border: `1px solid var(--md-sys-color-outline)`,
          } as CSSProperties;
        } else {
          return {} as CSSProperties;
        }
      }
    } else {
      // Row Style
      if (isSelected) {
        return {
          backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent)`,
        } as CSSProperties;
      } else {
        if (isHovered) {
          return {
            backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent)`,
          } as CSSProperties;
        } else {
          return {
            backgroundColor: `var(--md-sys-color-surface)`,
          } as CSSProperties;
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
            style={getStyles(
              row.getIsSelected(),
              hoverInfo?.row === row,
              "row"
            )}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  style={{
                    // width: cell.column.getSize(),
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    ...getCommonPinningStyles(cell.column),
                    ...getStyles(
                      selectedCell?.id === cell.id,
                      hoverInfo?.cell === cell,
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
                    onCellSelected?.(cell);
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
