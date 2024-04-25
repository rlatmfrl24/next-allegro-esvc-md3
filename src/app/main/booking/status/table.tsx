"use client";

import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { CurrentBookingDataState } from "@/app/store/booking.store";
import { MdChipSet, MdFilterChip, MdRadio, MdTextButton } from "@/app/util/md3";
import {
  BookingStatus,
  BookingStatusTableProps,
} from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { createDummyVesselInformation } from "../../schedule/util";
import BookingStatusChip from "./components/booking-status-chip";
import EstimatedTimeofDepartureCell from "./components/estimated-time-of-departure-cell";

export default function BookingStatusTable() {
  const columnHelper = createColumnHelper<BookingStatusTableProps>();

  const tempData: BookingStatusTableProps[] = useMemo(() => {
    return Array.from({ length: 900 }, (_, i) => ({
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
  const [currentBookingData, setCurrentBookingData] = useRecoilState(
    CurrentBookingDataState
  );

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columns = [
    columnHelper.accessor("requestNo", {
      id: "requestNo",
      header: "Request No",
      cell: (info) => (
        <>
          <MdRadio
            // name="requestNo"
            className="mr-2"
            checked={info.row.getIsSelected()}
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
      id: "status",
      header: "Status",
      cell: (info) => <BookingStatusChip status={info.getValue()} />,
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(row.original.status);
      },
      minSize: 140,
    }),
    columnHelper.accessor("bookingNo", {
      id: "bookingNo",
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
      id: "requestDate",
      header: "Request Date",
      enableResizing: true,
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 130,
      minSize: 130,
    }),

    columnHelper.accessor("vessel", {
      id: "vessel",
      header: "Vessel",
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
      size: 300,
    }),
    columnHelper.accessor("requestDepartureTime", {
      id: "requestDepartureTime",
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
      size: 130,
      minSize: 130,
    }),
    columnHelper.accessor("estimatedTimeofDeparture", {
      id: "estimatedTimeofDeparture",
      header: "Estimated Time of Departure",
      cell: (info) => {
        return EstimatedTimeofDepartureCell(info.row.original);
      },
      size: 130,
      minSize: 130,
    }),
    columnHelper.accessor("origin", {
      id: "origin",
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
    }),
    columnHelper.accessor("destination", {
      id: "destination",
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
    }),
    columnHelper.accessor("cargoClosingTime", {
      id: "cargoClosingTime",
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
      id: "docClosingTime",
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
      id: "vgmCutOffTime",
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
    columnHelper.accessor("actualShipper", {
      id: "actualShipper",
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
    columnHelper.accessor("via", {
      id: "via",
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
      id: "qty",
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

  return (
    <>
      <div className="relative w-full max-w-full">
        <BasicTable
          ActionComponent={() => {
            return (
              <div className="flex-1 flex flex-col gap-4">
                <MdChipSet className="z-40">
                  <StatusFilterComponent
                    statusOptions={Object.values(BookingStatus)}
                    onChange={(states) => {
                      console.log(states);
                      setTableData(
                        tempData.filter((row) => states.includes(row.status))
                      );
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
                    {currentBookingData && (
                      <>
                        <div className="w-px h-6 bg-outlineVariant"></div>
                        <MdTextButton>Copy</MdTextButton>
                      </>
                    )}
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
                </div>
              </div>
            );
          }}
          data={tableData}
          columns={columns}
          isSingleSelect={true}
          pinningColumns={["requestNo", "status"]}
          getSelectionRows={(rows: any[]) => {
            setCurrentBookingData(rows[0]);
          }}
        />
      </div>

      <MdTypography variant="body" size="small">
        If there is time difference between the changed departure time and the
        time previously notified, it will marked as below.
      </MdTypography>
    </>
  );
}
