"use client";

import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import { BasicTable } from "@/app/components/basic-table";
import { MdTypography } from "@/app/components/typography";
import { CurrentBookingDataState } from "@/app/store/booking-status.store";
import { MdChipSet, MdFilterChip, MdRadio, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { createDummyVesselInformation } from "../../schedule/util";
import BookingStatusChip from "./components/booking-status-chip";
import EstimatedTimeofDepartureCell from "./components/estimated-time-of-departure-cell";
import Link from "next/link";
import {
  BookingStatusTableProps,
  BookingStatus,
} from "@/app/util/typeDef/boooking";
import StatusFilterComponent from "@/app/components/status-filter";
import VesselInfoCell from "@/app/components/vessel-info-cell";

export default function BookingStatusTable() {
  const columnHelper = createColumnHelper<BookingStatusTableProps>();

  const tempData: BookingStatusTableProps[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      requestNo: `R${faker.string.numeric(12)}`,
      status: faker.helpers.arrayElement(
        Object.values(BookingStatus)
      ) as BookingStatus,
      bookingNo: `R${faker.string.numeric(12)}`,
      requestDate: DateTime.fromJSDate(faker.date.past()),
      actualShipper: faker.person.fullName(),
      vessel: createDummyVesselInformation(),
      requestDepartureTime: DateTime.fromJSDate(faker.date.past()),
      estimatedTimeofDeparture: {
        date: DateTime.fromJSDate(faker.date.future()),
        status: faker.helpers.arrayElement(["normal", "delayed", "early"]) as
          | "normal"
          | "delayed"
          | "early",
      },
      origin: faker.location.city(),
      destination: faker.location.city(),
      cargoClosingTime: DateTime.fromJSDate(faker.date.future()),
      docClosingTime: DateTime.fromJSDate(faker.date.future()),
      vgmCutOffTime: DateTime.fromJSDate(faker.date.future()),
      via: faker.helpers.arrayElement(["web", "general", "edi"]) as
        | "web"
        | "general"
        | "edi",
      qty: `${faker.string.numeric(3)} ${faker.helpers.arrayElement([
        "TEU",
        "FEU",
      ])}`,
    }));
  }, []);

  const [tableData, setTableData] = useState<BookingStatusTableProps[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentBookingData, setCurrentBookingData] = useRecoilState(
    CurrentBookingDataState
  );

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columns = [
    columnHelper.accessor("requestNo", {
      header: "Request No",
      cell: (info) => (
        <>
          <MdRadio
            name="requestNo"
            className="mr-2"
            checked={currentBookingData?.requestNo === info.getValue()}
          />
          <Link href={`/main/booking/information/request`}>
            <MdTypography
              tag="label"
              variant="body"
              size="medium"
              className="text-onSurfaceVariant underline cursor-pointer"
            >
              {info.getValue()}
            </MdTypography>
          </Link>
        </>
      ),
      size: 180,
      minSize: 180,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <BookingStatusChip status={info.getValue()} />,
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(row.original.status);
      },
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("bookingNo", {
      header: "Booking No",
      cell: (info) => (
        <Link href={`/main/booking/information/confirmation`}>
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurfaceVariant underline cursor-pointer"
          >
            {info.getValue()}
          </MdTypography>
        </Link>
      ),
      size: 140,
      minSize: 140,
    }),
    columnHelper.accessor("requestDate", {
      header: "Request Date",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("actualShipper", {
      header: "Actual Shipper",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue()}
        </MdTypography>
      ),
      size: 150,
      minSize: 150,
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
    }),
    columnHelper.accessor("requestDepartureTime", {
      header: "Request Departure Time",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofDeparture", {
      header: "Estimated Time of Departure",
      cell: (info) => {
        return EstimatedTimeofDepartureCell(info.row.original);
      },
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue()}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue()}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("cargoClosingTime", {
      header: "Cargo Closing Time",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("docClosingTime", {
      header: "Doc Closing Time",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("vgmCutOffTime", {
      header: "VGM Cut Off Time",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("via", {
      header: "Via",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {
            {
              web: "Web",
              general: "General",
              edi: "EDI",
            }[info.getValue()]
          }
        </MdTypography>
      ),
      minSize: 80,
    }),
    columnHelper.accessor("qty", {
      header: "Qty",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant whitespace-nowrap"
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnPinning: {
        left: ["requestNo", "status"],
      },
    },
    state: {
      rowSelection: rowSelection,
    },
    enableMultiRowSelection: false,
  });

  useEffect(() => {
    const selectedRow = table
      .getSelectedRowModel()
      .rows.find((row) => row.getIsSelected());

    setCurrentBookingData(selectedRow?.original);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentBookingData, table.getSelectedRowModel().rows]);

  return (
    <>
      <MdChipSet>
        <StatusFilterComponent
          statusOptions={Object.values(BookingStatus)}
          onChange={(states) => {
            table.getColumn("status")?.setFilterValue(states);
          }}
        />
        <MdFilterChip label="My Booking" />
      </MdChipSet>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdTextButton>
            <div slot="icon">
              <Download fontSize="small" />
            </div>
            Download
          </MdTextButton>
          <div className="w-px h-6 bg-outlineVariant"></div>
          <MdTextButton>Copy</MdTextButton>
          {currentBookingData?.status === "Requested" ||
          currentBookingData?.status === "Change Requested" ||
          currentBookingData?.status === "Accepted" ? (
            <>
              <MdTextButton>Edit</MdTextButton>
              <MdTextButton>Cancel</MdTextButton>
            </>
          ) : null}
          {currentBookingData?.status === "Accepted" ? (
            <>
              <MdTextButton>S/I</MdTextButton>
              <MdTextButton>Print Receipt</MdTextButton>
            </>
          ) : null}
        </div>
        <MdTypography variant="label" size="large" className="text-outline">
          Total: {table.getRowModel().rows.length}
        </MdTypography>
      </div>

      <div className="relative overflow-auto w-full max-w-full">
        <OverlayScrollbarsComponent>
          <BasicTable
            table={table}
            onRowSelction={(row) => {
              if (row.getIsSelected()) {
                return;
              } else {
                row.toggleSelected();
              }
            }}
          />
        </OverlayScrollbarsComponent>
      </div>

      <MdTypography variant="body" size="small">
        If there is time difference between the changed departure time and the
        time previously notified, it will marked as below.
      </MdTypography>
    </>
  );
}
