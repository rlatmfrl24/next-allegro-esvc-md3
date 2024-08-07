import {
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import {
  createDummyVesselInformation,
  createDummyVesselSchedules,
} from "../../schedule/util";
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdCheckbox } from "@/app/util/md3";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import NaToggleButton from "@/app/components/na-toggle-button";
import { set } from "lodash";

interface BLIssueRequestTableProps {
  uuid: string;
  isFreight: boolean;
  status: "Requested" | "Confirmed" | "Pending" | "Rejected";
  blType: "Original B/L" | "eB/L" | "Switch B/L" | "SeaWaybill";
  bookingNumber: string;
  actualShipper: string;
  vvd: VesselInfoType;
  polEtb: DateTime;
  polEtd: DateTime;
  pol: string;
  pod: string;
  qty: string;
  demdet: boolean;
  requestBlType: "Surrender" | "Original" | "Switch" | "SeaWaybill";
  requestBlTypeDate: DateTime;
}

export function BLIssueRequestTable() {
  const router = useRouter();
  const tempData = useMemo(() => {
    return Array.from(
      { length: 900 },
      (_, i) =>
        ({
          uuid: faker.string.uuid(),
          isFreight: faker.datatype.boolean(),
          status: faker.helpers.arrayElement([
            "Requested",
            "Confirmed",
            "Pending",
            "Rejected",
          ]),
          blType: faker.helpers.arrayElement([
            "Original B/L",
            "eB/L",
            "Switch B/L",
            "SeaWaybill",
          ]),
          bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
          actualShipper: faker.company.name(),
          vvd: createDummyVesselInformation(),
          polEtb: DateTime.fromJSDate(faker.date.recent()),
          polEtd: DateTime.fromJSDate(faker.date.recent()),
          pol: faker.location.city(),
          pod: faker.location.city(),
          qty:
            faker.helpers.arrayElement(["Dry", "Reefer", "Open Top"]) +
            " * " +
            faker.number.int({
              min: 1,
              max: 10,
            }),
          demdet: faker.datatype.boolean(),
          requestBlType: faker.helpers.arrayElement([
            "Surrender",
            "Original",
            "Switch",
            "SeaWaybill",
          ]),
          requestBlTypeDate: DateTime.fromJSDate(faker.date.recent()),
        } as BLIssueRequestTableProps)
    );
  }, []);
  const [tableData, setTableData] = useState<BLIssueRequestTableProps[]>([]);

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columnHelper = createColumnHelper<BLIssueRequestTableProps>();
  const columns = [
    columnHelper.display({
      id: "checkbox",
      header: (info) => (
        <MdCheckbox
          className="ml-2"
          checked={info.table.getIsAllRowsSelected()}
          indeterminate={info.table.getIsSomeRowsSelected()}
          onchange={(e) => {
            info.table.toggleAllRowsSelected();
          }}
        />
      ),
      cell: (info) => (
        <MdCheckbox checked={info.row.getIsSelected()} className="ml-2" />
      ),
      size: 44,
      minSize: 44,
      maxSize: 44,
    }),
    columnHelper.accessor("isFreight", {
      id: "isFreight",
      header: "Freight",
      cell: (info) => (
        <NaToggleButton
          label="Include"
          state={info.getValue() ? "checked" : "unchecked"}
          onClick={() => {
            tableData.map((row, index) => {
              if (index === info.row.index) {
                return set(row, "isFreight", !info.getValue());
              }
              return row;
            });
          }}
        />
      ),
    }),
    columnHelper.accessor("blType", {
      id: "blType",
      header: "B/L Type",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("actualShipper", {
      id: "actualShipper",
      header: "Actual Shipper",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 300,
      minSize: 300,
    }),
    columnHelper.accessor("vvd", {
      id: "vvd",
      header: "VVD",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 200,
      minSize: 200,
    }),
    columnHelper.accessor("polEtb", {
      id: "polEtb",
      header: "POL ETB",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("polEtd", {
      id: "polEtd",
      header: "POL ETD",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pol", {
      id: "pol",
      header: "POL",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pod", {
      id: "pod",
      header: "POD",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("qty", {
      id: "qty",
      header: "Qty",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("demdet", {
      id: "demdet",
      header: "Dem/DET",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Y" : "N"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlType", {
      id: "requestBlType",
      header: "Request B/L Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlTypeDate", {
      id: "requestBlTypeDate",
      header: "Request B/L Type Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      <BasicTable
        ActionComponent={() => {
          return <div className="flex-1"></div>;
        }}
        columns={columns}
        data={tableData}
        ignoreSelectionColumns={["isFreight"]}
      />
    </>
  );
}
