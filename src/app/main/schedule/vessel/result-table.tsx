import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { VesselScheduleType } from "@/app/util/typeDef";
import { useState } from "react";
import Portal from "@/app/components/portal";
import PlaceInformationDialog from "../popup/place-information";
import { faker } from "@faker-js/faker";
import styles from "@/app/styles/table.module.css";

const columnHelper = createColumnHelper<VesselScheduleType>();

export default function VesselResultTable({
  data,
}: {
  data: VesselScheduleType[];
}) {
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);

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
      cell: (info) => (
        <div
          className="underline cursor-pointer"
          onClick={() => {
            setIsPlaceInformationOpen(true);
          }}
        >
          {info.getValue()}
        </div>
      ),
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

  const table = useReactTable({
    data,
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
      <Portal selector="#main-container">
        <PlaceInformationDialog
          open={isPlaceInformationOpen}
          handleOpen={setIsPlaceInformationOpen}
          data={{
            yardName: faker.location.city(),
            address: faker.location.streetAddress(),
            phoneNo: faker.phone.imei(),
            faxNo: faker.phone.number(),
            customerNo: faker.string.uuid(),
            emailAddress: faker.internet.email(),
          }}
        />
      </Portal>
    </div>
  );
}
