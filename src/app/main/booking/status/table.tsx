"use client";

import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { CurrentBookingDataState } from "@/app/store/booking.store";
import { MdChipSet, MdFilterChip, MdRadio, MdTextButton } from "@/app/util/md3";
import {
  BookingStatus,
  BookingStatusTableProps,
} from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { Download, Info } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { createDummyVesselInformation } from "../../schedule/util";
import BookingStatusChip from "./components/booking-status-chip";
import { useEstimatedTimeofDepartureDialog } from "./components/estimated-time-of-departure-dialog";

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
      qty: Array.from(
        { length: faker.number.int(4) },
        (_, i) =>
          `${faker.helpers.arrayElement([
            "Dry 20:",
            "Dry 40:",
            "Reefer 20:",
            "Reefer 40:",
          ])} ${faker.number.int(9)}`
      ).join("\n"),
    }));
  }, []);

  const [tableData, setTableData] = useState<BookingStatusTableProps[]>([]);
  const [currentBookingData, setCurrentBookingData] = useRecoilState(
    CurrentBookingDataState
  );
  const {
    renderDialog: renderVesselInfoDialog,
    setCurrentVessel,
    setIsVesselScheduleDialogOpen,
  } = useVesselScheduleDialog();

  const {
    renderDialog: renderEstimatedTimeofDepartureDialog,
    setBookingData,
    setIsVesselStatusNotesDialogOpen,
  } = useEstimatedTimeofDepartureDialog();

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
      // cell: (info) => <VesselInfoCell {...info.getValue()} />,
      cell: (info) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentVessel(info.getValue());
              setIsVesselScheduleDialogOpen(true);
            }}
          >
            {info.getValue().vesselName}
          </MdTypography>
        );
      },
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
      cell: (info) => (
        <div
          className="flex p-2 "
          onClick={(e) => {
            e.stopPropagation();
            setIsVesselStatusNotesDialogOpen(true);
            setBookingData(info.row.original);
          }}
        >
          <MdTypography
            variant="body"
            size="medium"
            className={`text-onSurfaceVariant ${
              info.getValue().status !== "normal"
                ? "underline cursor-pointer"
                : ""
            }`}
          >
            {info.getValue().date.toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
          {info.getValue().status !== "normal" && (
            <Info
              className={`m-0.5 ${
                info.getValue().status === "early"
                  ? "text-[#325BDA]"
                  : "text-error"
              }`}
              sx={{ fontSize: "16px" }}
            />
          )}
        </div>
      ),
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
          className="text-onSurfaceVariant flex flex-col gap-1"
        >
          {info
            .getValue()
            .split("\n")
            .map((item, index) => (
              <span key={index} className="block">
                {item}
              </span>
            ))}
        </MdTypography>
      ),
    }),
  ];

  function getActivatedActionButton(status: BookingStatus) {
    switch (status) {
      case BookingStatus.Requested:
      case BookingStatus.ChangeRequested:
        return ["Copy", "Edit", "Cancel"];
      case BookingStatus.CancelRequested:
      case BookingStatus.Cancelled:
        return ["Copy"];
      case BookingStatus.Accepted:
        return ["Copy", "Edit", "Cancel", "S/I", "Print Receipt"];
      case BookingStatus.Rejected:
      case BookingStatus.ChangeRequestedRejected:
        return ["Copy", "Edit"];
      case BookingStatus.Pending:
        return ["Copy"];
      default:
        return [];
    }
  }

  return (
    <>
      {renderEstimatedTimeofDepartureDialog()}
      {renderVesselInfoDialog()}
      <div className="relative w-full max-w-full">
        <MdChipSet className="mb-4">
          <StatusFilterComponent
            statusOptions={Object.values(BookingStatus)}
            onChange={(states) => {
              setTableData(
                tempData.filter((row) => states.includes(row.status))
              );
            }}
          />
          <MdFilterChip label="My Booking" />
        </MdChipSet>
        <BasicTable
          ActionComponent={() => {
            return (
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdTextButton>
                      <div slot="icon">
                        <Download fontSize="small" />
                      </div>
                      Download
                    </MdTextButton>
                    {currentBookingData &&
                      getActivatedActionButton(currentBookingData.status).map(
                        (action) =>
                          ((
                            {
                              Copy: (
                                <MdTextButton key={action}>Copy</MdTextButton>
                              ),
                              Edit: (
                                <MdTextButton key={action}>Edit</MdTextButton>
                              ),
                              Cancel: (
                                <MdTextButton key={action}>Cancel</MdTextButton>
                              ),
                              "S/I": (
                                <MdTextButton key={action}>S/I</MdTextButton>
                              ),
                              "Print Receipt": (
                                <MdTextButton key={action}>
                                  Print Receipt
                                </MdTextButton>
                              ),
                            } as Record<string, JSX.Element>
                          )[action])
                      )}
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
