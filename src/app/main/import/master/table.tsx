import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import {
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../schedule/util";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import ActualScheduleIcon from "@/../public/icon_schedule_actual.svg";
import ConfirmScheduleIcon from "@/../public/icon_schedule_confirm.svg";

type InboundMasterTableProps = {
  blNumber: string;
  containerNumber: string;
  pol: string;
  departureDate: DateTime;
  pod: string;
  arrivalDate: DateTime;
  vesselVoyage: VesselInfoType;
  terminal: PlaceInformationType;
  blType: string;
  demdetDue: DateTime;
  isDemmurage: boolean;
  isDetention: boolean;
  isCombined: boolean;
  vesselDelayNotice: DateTime | null;
};

function createDummyInboundMasterData() {
  return {
    blNumber: faker.string.alphanumeric(11).toUpperCase(),
    containerNumber: faker.string.alphanumeric(11).toUpperCase(),
    pol: faker.location.city() + ", " + faker.location.country(),
    departureDate: DateTime.fromJSDate(faker.date.recent()),
    pod: faker.location.city() + ", " + faker.location.country(),
    arrivalDate: DateTime.fromJSDate(faker.date.recent()),
    vesselVoyage: createDummyVesselInformation(),
    terminal: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    blType: faker.helpers.arrayElement([
      "Original B/L",
      "Surrender B/L",
      "Sea Waybill",
    ]),
    demdetDue: DateTime.fromJSDate(faker.date.recent()),
    isDemmurage: faker.datatype.boolean(),
    isDetention: faker.datatype.boolean(),
    isCombined: faker.datatype.boolean(),
    vesselDelayNotice: faker.datatype.boolean()
      ? DateTime.fromJSDate(faker.date.recent())
      : null,
  } as InboundMasterTableProps;
}

export const InboundMasterTable = () => {
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyInboundMasterData());
  }, []);
  const columnHelper = createColumnHelper<InboundMasterTableProps>();
  const columnDefs = [
    columnHelper.accessor("blNumber", {
      id: "blNumber",
      header: "B/L Number",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("containerNumber", {
      id: "containerNumber",
      header: "Container No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
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
      size: 300,
    }),
    columnHelper.accessor("departureDate", {
      id: "departureDate",
      header: "Departure Date",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="flex items-center gap-2"
        >
          <ActualScheduleIcon />
          {info.getValue().toFormat("yyyy-MM-dd")}
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
    columnHelper.accessor("arrivalDate", {
      id: "arrivalDate",
      header: "Arrival Date",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="flex items-center gap-2"
        >
          <ConfirmScheduleIcon />
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vesselVoyage", {
      id: "vesselVoyage",
      header: "Vessel/Voyage",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().vesselName} / {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 400,
    }),
    columnHelper.accessor("terminal", {
      id: "terminal",
      header: "Terminal",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().yardName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("blType", {
      id: "blType",
      header: "B/L Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("demdetDue", {
      id: "demdetDue",
      header: "Dem/ Det Due",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("isDemmurage", {
      id: "isDemmurage",
      header: "Demmurage",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Yes" : "No"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("isDetention", {
      id: "isDetention",
      header: "Detention",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Yes" : "No"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("isCombined", {
      id: "isCombined",
      header: "Combined",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Yes" : "No"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vesselDelayNotice", {
      id: "vesselDelayNotice",
      header: "Vessel Delay Notice",
      cell: (info) => {
        const value = info.getValue();
        return (
          <MdTypography variant="body" size="medium">
            {value ? value.toFormat("yyyy-MM-dd") : "N/A"}
          </MdTypography>
        );
      },
    }),
  ];

  return (
    <BasicTable
      ActionComponent={() => <div className="flex-1"></div>}
      data={tempData}
      columns={columnDefs}
      isSingleSelect
    />
  );
};
