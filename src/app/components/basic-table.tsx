import { Table, flexRender } from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "./typography";

export const BasicTable = ({ table }: { table: Table<any> }) => {
  return (
    <table className={styles.table}>
      {table.getHeaderGroups().map((headerGroup) => (
        <thead key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{
                width:
                  header.column?.columnDef.size !== undefined
                    ? `${header.column.columnDef.size}px`
                    : "auto",
              }}
            >
              <MdTypography variant="body" size="medium">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </MdTypography>
            </th>
          ))}
        </thead>
      ))}
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
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
