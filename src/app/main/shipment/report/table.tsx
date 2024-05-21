import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import {
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../schedule/util";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { usePlaceInfoDialog } from "@/app/components/common-dialog-hooks";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { Download } from "@mui/icons-material";
import { useMemo } from "react";

type ReportTableProps = {
  blNumber: string;
  customerRefNumber: string;
  trunkVessel: VesselInfoType;
  placeReceipt: string;
  pol: string;
  pod: string;
  del: PlaceInformationType;
  containerNumber: string;
  consignee: string;
  notifyParty: string;
};

function createDummyReport(): ReportTableProps {
  return {
    blNumber: faker.string.alphanumeric(10).toUpperCase(),
    customerRefNumber: faker.string.alphanumeric(10).toUpperCase(),
    trunkVessel: createDummyVesselInformation(),
    placeReceipt: faker.location.city(),
    pol: faker.location.city() + ", " + faker.location.country(),
    pod: faker.location.city() + ", " + faker.location.country(),
    del: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    containerNumber: faker.string.alphanumeric(10).toUpperCase(),
    consignee: faker.company.name(),
    notifyParty: faker.company.name(),
  } as ReportTableProps;
}

export const ReportTable = () => {
  const { renderDialog, setCurrentPlace, setIsPlaceInfoDialogOpen } =
    usePlaceInfoDialog();

  const tempReports = useMemo(
    () => Array.from({ length: 50 }, () => createDummyReport()),
    []
  );
  const columnHelper = createColumnHelper<ReportTableProps>();
  const columnDefs = [
    columnHelper.accessor("blNumber", {
      id: "blNumber",
      header: "B/L No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("customerRefNumber", {
      id: "customerRefNumber",
      header: "Customer Ref No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("trunkVessel", {
      id: "trunkVessel",
      header: "Trunk Vessel",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
    }),
    columnHelper.accessor("placeReceipt", {
      id: "placeReceipt",
      header: "Place of Receipt",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pol", {
      id: "pol",
      header: "Port of Loading",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pod", {
      id: "pod",
      header: "Port of Discharging",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("del", {
      id: "del",
      header: "Port of Delivery",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={() => {
            setCurrentPlace(info.getValue());
            setIsPlaceInfoDialogOpen(true);
          }}
        >
          {info.getValue().yardName}
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
    columnHelper.accessor("consignee", {
      id: "consignee",
      header: "Consignee Name",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("notifyParty", {
      id: "notifyParty",
      header: "Notify Party Name",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BasicTable
        ActionComponent={() => (
          <div className="flex-1">
            <MdTextButton>
              <MdIcon slot="icon">
                <Download fontSize="small" />
              </MdIcon>
              Download
            </MdTextButton>
          </div>
        )}
        isSingleSelect
        data={tempReports}
        columns={columnDefs}
        pinningColumns={["blNumber"]}
      />
    </>
  );
};
