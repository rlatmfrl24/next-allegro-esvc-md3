import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "../typography";
import { useCallback, useEffect, useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export const useSimpleTable = ({
  data,
  columns,
  getSelectionRows,
  allowMultiRowSelection = false,
}: {
  data: any[];
  columns: any[];
  getSelectionRows?: (Rows: any[]) => void;
  allowMultiRowSelection?: boolean;
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
    enableMultiRowSelection: allowMultiRowSelection,
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
