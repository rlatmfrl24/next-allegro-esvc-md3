import {
  CSSProperties,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Cell, flexRender, Row, Table } from "@tanstack/react-table";

import { getCommonPinningStyles } from "./util";
import { MdTypography } from "../typography";
import { MdOutlinedTextField } from "@/app/util/md3";
import { only } from "node:test";

export const TableBody = ({
  table,
  selectedCell,
  onCellSelected,
  ignoreSelectionColumns,
  disableColumns,
  onlyNumberColumns,
  editableColumns,
}: {
  table: Table<any>;
  selectedCell?: Cell<any, unknown> | null;
  onCellSelected?: Dispatch<SetStateAction<any>>;
  ignoreSelectionColumns?: string[];
  disableColumns?: string[];
  editableColumns?: string[];
  onlyNumberColumns?: string[];
}) => {
  const [currentEditCell, setCurrentEditCell] = useState<Cell<
    any,
    unknown
  > | null>(null);

  // function getCellStyles(cell: Cell<any, unknown>) {
  //   if (selectedCell?.id === cell.id) {
  //     return {
  //       backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 12%, white)`,
  //       border: `2px solid var(--md-sys-color-primary)`,
  //       zIndex: 10,
  //     } as CSSProperties;
  //   } else {
  //     if (cell.row.getIsSelected()) {
  //       return {
  //         backgroundColor: `color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
  //         borderTop: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
  //         borderLeft: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
  //         borderRight: `1px solid color-mix(in srgb, var(--md-sys-color-primary) 8%, white)`,
  //         borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
  //       } as CSSProperties;
  //     } else {
  //       if (hoverInfo?.cell === cell) {
  //         return {
  //           backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 12%, white)`,
  //           border: `1px solid var(--md-sys-color-outline)`,
  //         } as CSSProperties;
  //       } else {
  //         if (hoverInfo?.row === cell.row) {
  //           return {
  //             backgroundColor: `color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
  //             borderTop: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
  //             borderLeft: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
  //             borderRight: `1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 8%, white)`,
  //             borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
  //           } as CSSProperties;
  //         } else {
  //           return {
  //             backgroundColor: disableColumns?.includes(cell.column.id)
  //               ? `var(--md-sys-color-surface-container-low)`
  //               : `var(--md-sys-color-surface-container-lowest)`,
  //             borderBottom: `1px solid var(--md-sys-color-outline-variant)`,
  //           } as CSSProperties;
  //         }
  //       }
  //     }
  //   }
  // }

  function getZIndex(cell: Cell<any, unknown>) {
    if (cell.column.getIsPinned()) {
      // pinned columns
      if (selectedCell?.id === cell.id) {
        return "z-50";
      } else {
        return "z-30 hover:z-40";
      }
    } else {
      // non-pinned columns
      if (selectedCell?.id === cell.id) {
        return "z-20";
      } else {
        return "z-0 hover:z-10";
      }
    }
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} className="group">
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  style={{
                    // width: cell.column.getSize(),
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    ...getCommonPinningStyles(cell.column),
                    // ...getCellStyles(cell),
                  }}
                  className={`p-2
                    ${
                      selectedCell?.id === cell.id
                        ? `bg-primary-160 outline-2 outline outline-primary`
                        : row.getIsSelected()
                        ? `bg-primary-80`
                        : `bg-surfaceContainerLowest
                            group-hover:bg-onSurface-80
                            group-hover:outline-1
                            hover:outline`
                    }
                    ${getZIndex(cell)}
                    ${
                      onlyNumberColumns?.includes(cell.column.id)
                        ? "text-right"
                        : ""
                    }`}
                  // onDoubleClick={(e) => {
                  //   row.toggleSelected();
                  //   row.getIsSelected()
                  //     ? onCellSelected?.(null)
                  //     : onCellSelected?.(cell);
                  //   if (editableColumns?.includes(cell.column.id))
                  //     setCurrentEditCell(cell);
                  // }}
                  onClick={(e) => {
                    if (
                      ignoreSelectionColumns?.includes(cell.column.id) ||
                      editableColumns?.includes(cell.column.id) ||
                      disableColumns?.includes(cell.column.id)
                    )
                      return;
                    row.getIsSelected()
                      ? onCellSelected?.(null)
                      : onCellSelected?.(cell);
                    row.toggleSelected();
                  }}
                >
                  {editableColumns?.includes(cell.column.id) ? (
                    <>
                      <input
                        className={`border border-outlineVariant rounded w-full bg-transparent outline-primary px-3 py-2 font-pretendard ${
                          onlyNumberColumns?.includes(cell.column.id)
                            ? "text-right"
                            : ""
                        }`}
                        defaultValue={
                          onlyNumberColumns?.includes(cell.column.id)
                            ? cell.column.columnDef.meta?.format !== undefined
                              ? cell.column.columnDef.meta?.format(
                                  cell.getValue()
                                )
                              : cell.getValue()?.toString() ?? ""
                            : cell.getValue()?.toString() ?? ""
                        }
                        onFocus={(e) => {
                          e.currentTarget.value =
                            cell.getValue()?.toString() ?? "";
                          row.toggleSelected();
                          onCellSelected?.(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                          }
                          if (onlyNumberColumns?.includes(cell.column.id)) {
                            // allow only numbers and backspace
                            if (
                              !/^\d+$/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "Delete" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight" &&
                              e.key !== "ArrowUp" &&
                              e.key !== "ArrowDown" &&
                              e.key !== "Tab" &&
                              e.key !== "."
                            ) {
                              e.preventDefault();
                            }
                          }
                        }}
                        onBlur={(e) => {
                          if (onlyNumberColumns?.includes(cell.column.id)) {
                            const value = parseFloat(
                              e.currentTarget.value.replace(/,/g, "")
                            );
                            if (isNaN(value)) {
                              table.options.meta?.updateData(
                                parseInt(row.id),
                                cell.column.id,
                                undefined
                              );
                              e.currentTarget.value = "";
                            } else {
                              table.options.meta?.updateData(
                                parseInt(row.id),
                                cell.column.id,
                                value
                              );
                              e.currentTarget.value =
                                cell.column.columnDef.meta?.format !== undefined
                                  ? cell.column.columnDef.meta?.format(value)
                                  : value.toString();
                            }
                          } else {
                            table.options.meta?.updateData(
                              parseInt(row.id),
                              cell.column.id,
                              e.currentTarget.value
                            );
                          }
                          setCurrentEditCell(null);
                        }}
                      />
                    </>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
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
