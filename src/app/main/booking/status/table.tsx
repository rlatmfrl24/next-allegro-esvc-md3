"use client";

import { VesselInfoType } from "@/app/util/typeDef";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import {
  createDummaryVesselSchedules,
  createDummyVesselInformation,
} from "../../schedule/util";
import { BasicTable } from "@/app/components/basic-table";
import { faker } from "@faker-js/faker";
import { MdTypography } from "@/app/components/typography";
import Portal from "@/app/components/portal";
import VesselScheduleDialog from "../../schedule/popup/vessel-schedule";
import { MdRadio } from "@/app/util/md3";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

enum BookingStatus {
  Requested = "Requested",
  ChangeRequested = "Change Requested",
  CancelRequested = "Cancel Requested",
  Cancelled = "Cancelled",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
}

type BookingStatusTableProps = {
  requestNo: string;
  status: BookingStatus;
  bookingNo: string;
  requestDate: DateTime;
  actualShipper: string;
  vessel: VesselInfoType;
  requestDepartureTime: {
    date: DateTime;
    status: "normal" | "delayed" | "early";
  };
  estimatedTimeofDeparture: {
    date: DateTime;
    status: "normal" | "delayed" | "early";
  };
  origin: string;
  destination: string;
  cargoClosingTime: DateTime;
  docClosingTime: DateTime;
  vgmCutOffTime: DateTime;
  via: "web" | "general" | "edi";
  qty: string;
};

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
      requestDepartureTime: {
        date: DateTime.fromJSDate(faker.date.past()),
        status: faker.helpers.arrayElement(["normal", "delayed", "early"]) as
          | "normal"
          | "delayed"
          | "early",
      },
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
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
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
          {info.getValue().date.toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofDeparture", {
      header: "Estimated Time of Departure",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="text-onSurfaceVariant p-2"
        >
          {info.getValue().date.toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
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
    initialState: {
      columnPinning: {
        left: ["requestNo", "status"],
      },
    },
    enableMultiRowSelection: false,
  });

  return (
    <>
      <div className="relative overflow-auto w-full max-w-full">
        <OverlayScrollbarsComponent>
          <BasicTable table={table} />
        </OverlayScrollbarsComponent>
      </div>
      <Portal selector="#main-container">
        {selectedVesselInfo && (
          <VesselScheduleDialog
            open={isVesselScheduleDialogOpen}
            handleOpen={setIsVesselScheduleDialogOpen}
            vesselInfo={selectedVesselInfo}
            vesselSchedules={createDummaryVesselSchedules()}
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
