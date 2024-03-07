"use client";

import {
  BookingStatus,
  BookingStatusTableProps,
  VesselInfoType,
} from "@/app/util/typeDef";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createDummaryVesselSchedules,
  createDummyVesselInformation,
} from "../../schedule/util";
import { BasicTable } from "@/app/components/basic-table";
import { faker } from "@faker-js/faker";
import { MdTypography } from "@/app/components/typography";
import Portal from "@/app/components/portal";
import VesselScheduleDialog from "../../schedule/popup/vessel-schedule";
import { MdRadio, MdTextButton } from "@/app/util/md3";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Download, Info } from "@mui/icons-material";
import VesselStatusNotesDialog from "./vessel-status-notes";

export default function BookingStatusTable() {
  const columnHelper = createColumnHelper<BookingStatusTableProps>();

  const tempData: BookingStatusTableProps[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      requestNo: `R${faker.string.numeric(12)}`,
      status: faker.helpers.arrayElement([
        "Requested",
        "Change Requested",
        "Cancel Requested",
        "Cancelled",
        "Accepted",
        "Rejected",
        "Pending",
      ]) as BookingStatus,
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
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);
  const [isVesselStatusNotesDialogOpen, setIsVesselStatusNotesDialogOpen] =
    useState(false);
  const [selectedVesselInfo, setSelectedVesselInfo] =
    useState<VesselInfoType | null>(null);

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columns = [
    columnHelper.accessor("requestNo", {
      header: "Request No",
      cell: (info) => (
        <MdTypography
          tag="label"
          variant="body"
          size="medium"
          className="text-onSurfaceVariant underline cursor-pointer p-2"
        >
          <MdRadio
            name="requestNo"
            className="mr-2"
            checked={info.row.getIsSelected()}
          />
          {info.getValue()}
        </MdTypography>
      ),
      size: 180,
      minSize: 180,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <BookingStatusChip status={info.getValue()} />,
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("bookingNo", {
      header: "Booking No",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant underline cursor-pointer p-2"
        >
          {info.getValue()}
        </MdTypography>
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
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2"
        >
          {info.getValue()}
        </MdTypography>
      ),
      size: 150,
      minSize: 150,
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant underline cursor-pointer p-2 whitespace-nowrap"
          onClick={() => {
            setSelectedVesselInfo(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestDepartureTime", {
      header: "Request Departure Time",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant p-2"
        >
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofDeparture", {
      header: "Estimated Time of Departure",
      cell: (info) => (
        <div className="flex p-2 ">
          <MdTypography
            variant="body"
            size="medium"
            className={`text-onSurfaceVariant ${
              info.getValue().status !== "normal"
                ? "underline cursor-pointer"
                : ""
            }`}
            onClick={() => {
              setIsVesselStatusNotesDialogOpen(true);
            }}
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
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2"
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
          className="text-onSurfaceVariant p-2 whitespace-nowrap"
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

  const getSelectedBooking = useMemo(() => {
    const selectedRow = table
      .getSelectedRowModel()
      .rows.find((row) => row.getIsSelected());
    return selectedRow?.original;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getSelectedRowModel().rows]);

  return (
    <>
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
          {getSelectedBooking?.status === "Requested" ||
          getSelectedBooking?.status === "Change Requested" ||
          getSelectedBooking?.status === "Accepted" ? (
            <>
              <MdTextButton>Edit</MdTextButton>
              <MdTextButton>Cancel</MdTextButton>
            </>
          ) : null}
          {getSelectedBooking?.status === "Accepted" ? (
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
          <BasicTable table={table} />
        </OverlayScrollbarsComponent>
      </div>

      <MdTypography variant="body" size="small">
        If there is time difference between the changed departure time and the
        time previously notified, it will marked as below.
      </MdTypography>

      <Portal selector="#main-container">
        {selectedVesselInfo && (
          <VesselScheduleDialog
            open={isVesselScheduleDialogOpen}
            handleOpen={setIsVesselScheduleDialogOpen}
            vesselInfo={selectedVesselInfo}
            vesselSchedules={createDummaryVesselSchedules()}
          />
        )}
        {getSelectedBooking && (
          <VesselStatusNotesDialog
            open={isVesselStatusNotesDialogOpen}
            handleOpen={setIsVesselStatusNotesDialogOpen}
            bookingData={getSelectedBooking}
          />
        )}
      </Portal>
    </>
  );
}

const BookingStatusChip = ({ status }: { status: BookingStatus }) => {
  return (
    <MdTypography
      variant="label"
      size="medium"
      className={`px-2 py-1 rounded-lg whitespace-nowrap m-2 w-fit ${
        {
          Requested: "bg-surfaceContainerHigh text-onSurface",
          "Change Requested": "bg-surfaceContainerHigh text-onSurface",
          "Cancel Requested": "bg-surfaceContainerHigh text-onSurface",
          Cancelled: "bg-surfaceContainerHigh",
          Accepted: "bg-extendGoodContainer text-extendOnGoodContainer",
          Rejected: "bg-errorContainer text-onErrorContainer",
          Pending: "bg-extendPendingContainer text-extendOnPendingContainer",
        }[status]
      }`}
    >
      {status}
    </MdTypography>
  );
};
