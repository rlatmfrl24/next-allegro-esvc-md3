import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { info } from "console";

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
    const tempDate = DateTime.fromJSDate(faker.date.future());
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
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("terminal", {
    header: "Terminal",
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("arrivalDate", {
    header: "Arrival Date",
    cell: (info) => <div>{info.getValue().toISODate()}</div>,
  }),
  columnHelper.accessor("berthingDate", {
    header: "Berthing Date",
    cell: (info) => <div>{info.getValue().toISODate()}</div>,
  }),
  columnHelper.accessor("departureDate", {
    header: "Departure Date",
    cell: (info) => <div>{info.getValue().toISODate()}</div>,
  }),
];

export default function VesselResultTable() {
  return (
    <div>
      {DummyVesselSchedule.map((vessel, index) => {
        return (
          <div key={index}>
            <div>{vessel.port}</div>
            <div>{vessel.terminal}</div>
            <div>{vessel.arrivalDate.toISODate()}</div>
            <div>{vessel.berthingDate.toISODate()}</div>
            <div>{vessel.departureDate.toISODate()}</div>
          </div>
        );
      })}
    </div>
  );
}
