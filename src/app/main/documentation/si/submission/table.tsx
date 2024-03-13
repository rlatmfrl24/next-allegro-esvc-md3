import { BasicTable } from "@/app/components/basic-table";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import { MdCheckbox, MdIcon, MdIconButton } from "@/app/util/md3";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useMemo, useState } from "react";
import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import { MdTypography } from "@/app/components/typography";
import SIStateChip from "./si-state-chip";

type SISearchTableProps = {
  requestNumber: string;
  bookingNumber: string;
  blState: SIState;
  blNumber: string;
  requestBlType: string;
  actualShipper: string;
  SiCutOffTime: DateTime;
  requestUpdateDate: DateTime;
  vessel: VesselInfoType;
  origin: string;
  destination: string;
  bookingVia: string;
  estimatedTimeofBerth: DateTime;
  estimatedTimeofDeparture: DateTime;
  estimatedTimeofArrival: DateTime;
  blType: string;
};

function createDummySITableData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    requestNumber: `R${faker.string.numeric(10)}`,
    bookingNumber: faker.string.alphanumeric(12).toUpperCase(),
    blState: faker.helpers.arrayElement(Object.values(SIState)),
    blNumber: faker.string.alphanumeric(12).toUpperCase(),
    requestBlType: faker.helpers.arrayElement([
      "O.BL",
      "SeaWaybill",
      "Surrender",
      "None",
    ]),
    actualShipper: faker.person.fullName(),
    SiCutOffTime: DateTime.local(),
    requestUpdateDate: DateTime.local(),
    vessel: createDummyVesselInformation(),
    origin: faker.location.city(),
    destination: faker.location.city(),
    bookingVia: faker.helpers.arrayElement(["web", "edi", "general"]),
    estimatedTimeofBerth: DateTime.local(),
    estimatedTimeofDeparture: DateTime.local(),
    estimatedTimeofArrival: DateTime.local(),
    blType: faker.helpers.arrayElement(["", "FCL", "LCL"]),
  }));
}

export default function SITable() {
  const tempTableData: SISearchTableProps[] = useMemo(
    () => createDummySITableData(30),
    []
  );
  const [tableData, setTableData] = useState<SISearchTableProps[]>([]);
  useEffect(() => {
    setTableData(tempTableData);
  }, [tempTableData]);

  const columnHelper = createColumnHelper<SISearchTableProps>();
  const columns = [
    columnHelper.display({
      id: "select",
      header: () => <MdCheckbox className="mx-2" />,
      cell: () => <MdCheckbox className="mx-2" />,
    }),
    columnHelper.accessor("requestNumber", {
      header: "Request No.",
      cell: (info) => {
        return (
          <span className="flex justify-between items-center gap-2">
            <MdTypography variant="body" size="medium" className="underline">
              {info.getValue()}
            </MdTypography>
            <MdIconButton>
              <MdIcon>
                <div className="flex items-center justify-center">
                  <RemarkIcon />
                </div>
              </MdIcon>
            </MdIconButton>
          </span>
        );
      },
    }),
    columnHelper.accessor("bookingNumber", {
      header: "Booking No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="underline">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("blState", {
      header: "B/L Status",
      cell: (info) => <SIStateChip state={info.getValue()} />,
    }),
    columnHelper.accessor("blNumber", {
      header: "B/L No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlType", {
      header: "Request B/L Type",
      cell: (info) => info.getValue(),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("actualShipper", {
      header: "Actual Shipper",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 150,
      minSize: 150,
    }),
    columnHelper.accessor("SiCutOffTime", {
      header: "S/I Cut Off Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("requestUpdateDate", {
      header: "Request (Update) Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="whitespace-nowrap underline"
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("bookingVia", {
      header: "Booking Via",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {
            {
              web: "Web",
              edi: "EDI",
              general: "General",
            }[info.getValue()]
          }
        </MdTypography>
      ),
    }),
    columnHelper.accessor("estimatedTimeofBerth", {
      header: "Estimated Time of Berth",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofDeparture", {
      header: "Estimated Time of Departure",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofArrival", {
      header: "Estimated Time of Arrival",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("blType", {
      header: "B/L Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 80,
      minSize: 80,
    }),
  ];

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="relative overflow-auto w-full max-w-full">
        <OverlayScrollbarsComponent>
          <BasicTable table={table} />
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
}
