import {
  flexRender,
  getCoreRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import tableStyles from "@/app/styles/table.module.css";
import { MdTypography } from "../../../../../components/typography";
import { use, useEffect, useState } from "react";

export const MergeSelectionTable = ({
  data,
  columnDefs,
  className,
  onRowSelectionChange,
}: {
  data: any[];
  columnDefs: any[];
  className?: string;
  onRowSelectionChange?: (rowSelection: any) => void;
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    table.getRowModel().rows[0].toggleSelected();
  }, [table]);

  useEffect(() => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected())
      .map((row) => row.original);

    onRowSelectionChange && onRowSelectionChange(selectedRows);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  return (
    <div className={`w-full flex relative ${className}`}>
      <table className={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="mx-2 group">
                  <div
                    className={`mx-px w-full border-r border-r-outlineVariant h-8 flex items-center px-2 group-last:border-r-0 group-first:border-r-0`}
                  >
                    <MdTypography variant="body" size="medium" prominent>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </MdTypography>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="group cursor-pointer">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="mx-2 p-0 group bg-white border-r border-r-outlineVariant last:border-r-0 first:border-r-0 group-hover:bg-primary-80 group-first:bg-primary-80"
                      onClick={() => {
                        row.index !== 0 && row.toggleSelected();
                      }}
                    >
                      <div className={`w-full flex-1 flex items-center`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
