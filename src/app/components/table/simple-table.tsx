import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/table.module.css";
import { MdTypography } from "../typography";

export const useSimpleTable = ({
  data,
  columns,
  getSelectionRows,
}: {
  data: any[];
  columns: any[];
  getSelectionRows?: (Rows: any[]) => void;
}) => {
  const [selectedRows, setSelectedRows] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows,
    },
    onRowSelectionChange: setSelectedRows,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
  });

  useEffect(() => {
    getSelectionRows &&
      getSelectionRows(
        Object.keys(selectedRows).map((key) => data[parseInt(key)])
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);

  const clearSelection = useCallback(() => {
    setSelectedRows({});
  }, []);

  const renderTable = () => (
    <OverlayScrollbarsComponent defer>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  <MdTypography
                    variant="body"
                    size="medium"
                    prominent
                    className="p-2 flex-1 select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </MdTypography>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                onClick={() => {
                  row.toggleSelected();
                }}
                className={`cursor-pointer group ${
                  row.getIsSelected() ? "bg-outline-variant" : "bg-surface"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-2 group-hover:bg-surfaceContainerLow"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </OverlayScrollbarsComponent>
  );

  return {
    renderTable,
    clearSelection,
  };
};
