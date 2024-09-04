"use client";
import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { MdChipSet, MdFilterChip, MdRadio, MdTextButton } from "@/app/util/md3";
import {
  BookingStatus,
  BookingStatusTableProps,
} from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";
import { Download, Info } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import { createDummyVesselInformation } from "../../schedule/util";
import BookingStatusChip from "./components/booking-status-chip";
import { useEstimatedTimeofDepartureDialog } from "./components/estimated-time-of-departure-dialog";
import { useRouter } from "next/navigation";
import { CodeCopyButton } from "./components/code-copy-button";
import { useSetRecoilState } from "recoil";
import { CurrentBookingDataState } from "@/app/store/booking.store";
import { getCookie, setCookie } from "cookies-next";

const HasShippingInstructionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15.4173 19.1663H3.75065C2.83398 19.1663 2.08398 18.4163 2.08398 17.4997V5.83301H3.75065V17.4997H15.4173V19.1663ZM12.9173 0.833008H7.08398C6.16732 0.833008 5.42565 1.58301 5.42565 2.49967L5.41732 14.1663C5.41732 15.083 6.15898 15.833 7.07565 15.833H16.2507C17.1673 15.833 17.9173 15.083 17.9173 14.1663V5.83301L12.9173 0.833008ZM16.2507 14.1663H7.08398V2.49967H12.2257L16.2507 6.52467V14.1663Z"
        fill="#40484C"
      />
      <path
        d="M14.0996 6.3252L10.9329 9.49186L9.27558 7.8409L8.09961 9.01686L10.9329 11.8502L15.2834 7.49979L14.0996 6.3252Z"
        fill="#40484C"
      />
    </svg>
  );
};

function createDummyBookingStatus() {
  return {
    requestNo: `R${faker.string.numeric(12)}`,
    status: faker.helpers.arrayElement(
      Object.values(BookingStatus)
    ) as BookingStatus,
    hasShippingInstruction: faker.datatype.boolean(),
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
  } as BookingStatusTableProps;
}

export default function BookingStatusTable() {
  const router = useRouter();
  const columnHelper = createColumnHelper<BookingStatusTableProps>();

  const tempData: BookingStatusTableProps[] = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => createDummyBookingStatus());
  }, []);

  const [tableData, setTableData] = useState<BookingStatusTableProps[]>([]);
  // const [currentBookingData, setCurrentBookingData] = useRecoilState(
  //   CurrentBookingDataState
  // );
  const setCurrentBookingData = useSetRecoilState(CurrentBookingDataState);
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
        <div className="flex items-center relative -translate-y-1">
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
          <CodeCopyButton code={info.getValue()} />
        </div>
      ),
      size: 230,
      minSize: 230,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <BookingStatusChip status={info.getValue()} />
          {info.row.original.hasShippingInstruction &&
            info.getValue() === BookingStatus.Accepted && (
              <HasShippingInstructionIcon />
            )}
        </div>
      ),
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(row.original.status);
      },
      minSize: 140,
    }),
    columnHelper.accessor("bookingNo", {
      id: "bookingNo",
      header: "Booking No",
      cell: (info) => (
        <div className="flex items-center -translate-y-1">
          <Link
            href={`/main/booking/information/confirmation`}
            className="block w-fit"
          >
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurfaceVariant underline cursor-pointer w-fit"
            >
              {info.getValue()}
            </MdTypography>
          </Link>
          <CodeCopyButton code={info.getValue()} />
        </div>
      ),
      size: 180,
      minSize: 180,
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
            className="underline cursor-pointer w-fit"
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
          className="flex"
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
      <div className="relative w-full max-w-full h-full">
        <BasicTable
          cookieKey="bookingStatusTable"
          ActionComponent={(table) => {
            const currentSelection = table.getSelectedRowModel().rows as any[];
            return (
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdChipSet>
                      <StatusFilterComponent
                        statusOptions={Object.values(BookingStatus)}
                        onChange={(states) => {
                          table.setColumnFilters([
                            {
                              id: "status",
                              value: states as BookingStatus[],
                            },
                          ]);
                        }}
                      />
                      <MdFilterChip label="My Booking" />
                    </MdChipSet>

                    <MdTextButton>
                      <div slot="icon">
                        <Download fontSize="small" />
                      </div>
                      Download
                    </MdTextButton>
                    {currentSelection.length > 0 &&
                      getActivatedActionButton(
                        currentSelection[0].original.status
                      ).map(
                        (action) =>
                          ((
                            {
                              Copy: (
                                <MdTextButton key={action}>Copy</MdTextButton>
                              ),
                              Edit: (
                                <MdTextButton
                                  key={action}
                                  onClick={() => {
                                    router.push(
                                      `/main/booking/request
                                      ?requestNo=${currentSelection[0].original.requestNo}
                                      &bookingNo=${currentSelection[0].original.bookingNo}
                                      &status=${currentSelection[0].original.status}&type=edit`
                                    );
                                  }}
                                >
                                  Edit
                                </MdTextButton>
                              ),
                              Cancel: (
                                <MdTextButton key={action}>Cancel</MdTextButton>
                              ),
                              "S/I": (
                                <MdTextButton
                                  key={action}
                                  onClick={() => {
                                    router.push(
                                      `/main/documents/si${
                                        !currentSelection[0]
                                          .hasShippingInstruction
                                          ? "/edit"
                                          : ""
                                      }`
                                    );
                                  }}
                                >
                                  S/I
                                </MdTextButton>
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
          getSelectionRows={(rows) => {
            setCurrentBookingData(rows[0]);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <MdTypography variant="body" size="small">
          If there is time difference between the changed departure time and the
          time previously notified, it will marked as below.
        </MdTypography>
        <div className="flex gap-4">
          <MdTypography
            variant="body"
            size="small"
            className="text-outline flex gap-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <circle cx="6" cy="6" r="6" fill="#325BDA" />
            </svg>
            Advance
          </MdTypography>
          <MdTypography
            variant="body"
            size="small"
            className="text-outline flex gap-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <circle cx="6" cy="6" r="6" fill="#BA1A1A" />
            </svg>
            Delay
          </MdTypography>
        </div>
      </div>
    </>
  );
}
