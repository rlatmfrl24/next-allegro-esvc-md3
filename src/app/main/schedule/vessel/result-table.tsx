import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import classNames from "classnames";

type VesselScheduleType = {
  port: string;
  terminal: string;
  arrivalDate: DateTime;
  berthingDate: DateTime;
  departureDate: DateTime;
};

const DummyVesselSchedule: VesselScheduleType[] = Array.from(
  { length: 10 },
  (_, i) => {
    const tempDate =
      i > 4
        ? DateTime.fromJSDate(faker.date.future())
        : DateTime.fromJSDate(faker.date.past());

    return {
      port: `Port ${i}`,
      terminal: `Terminal ${i}`,
      departureDate: tempDate,
      berthingDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
      arrivalDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
    };
  }
);

const columnHelper = createColumnHelper<VesselScheduleType>();

const columns = [
  columnHelper.accessor("port", {
    header: "Port",
    cell: (info) => {
      return info.getValue();
    },
    size: undefined,
  }),
  columnHelper.accessor("terminal", {
    header: "Terminal",
    cell: (info) => <div className="underline">{info.getValue()}</div>,
    size: undefined,
  }),
  columnHelper.accessor("arrivalDate", {
    header: "Arrival Date",
    cell: (info) => <div>{info.getValue().toISODate()}</div>,
    size: 200,
  }),
  columnHelper.accessor("berthingDate", {
    header: "Berthing Date",
    cell: (info) => <div>{info.getValue().toISODate()}</div>,
    size: 200,
  }),
  columnHelper.accessor("departureDate", {
    header: "Departure Date",
    cell: (info) => <div>{info.getValue().toISODate()}</div>,
    size: 200,
  }),
];

export default function VesselResultTable() {
  const table = useReactTable({
    data: DummyVesselSchedule,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
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
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
}
