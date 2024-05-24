import LabelChip from "@/app/components/label-chip";
import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

type DemDetTableProps = {
  tariffType: "Demurrage" | "Detention" | "Combined";
  originType: string;
  destination: string;
  containerType: "Dry" | "Reefer" | "Flat Rack" | "Open Top" | "Tank";
  cargoType: "General" | "Dangerous" | "Awkward" | "Reefer";
  day: {
    min: number;
    max: number;
  };
  currency: string;
  tariff: {
    "20": number;
    "40": number;
    "45": number;
    HC: number;
  };
};

function createDummyDemDetTariff(): DemDetTableProps {
  return {
    tariffType: faker.helpers.arrayElement([
      "Demurrage",
      "Detention",
      "D&D Combined",
    ]),
    originType: faker.string.alpha(6).toUpperCase(),
    destination: faker.location.country(),
    containerType: faker.helpers.arrayElement([
      "Dry",
      "Reefer",
      "Flat Rack",
      "Open Top",
      "Tank",
    ]),
    cargoType: faker.helpers.arrayElement([
      "General",
      "Dangerous",
      "Awkward",
      "Reefer",
    ]),
    day: {
      min: faker.number.int({ min: 1, max: 10 }),
      max: faker.number.int({ min: 11, max: 20 }),
    },
    currency: faker.finance.currencyCode(),
    tariff: {
      20: faker.number.float({ min: 0, max: 100000 }),
      40: faker.number.float({ min: 0, max: 100000 }),
      45: faker.number.float({ min: 0, max: 100000 }),
      HC: faker.number.float({ min: 0, max: 100000 }),
    },
  } as DemDetTableProps;
}

export const DemDetTable = () => {
  const tempDemDetTariff = useMemo(() => {
    return Array.from({ length: 200 }, () => createDummyDemDetTariff());
  }, []);
  const [tableData, setTableData] =
    useState<DemDetTableProps[]>(tempDemDetTariff);
  const columnHelper = createColumnHelper<DemDetTableProps>();
  const columnDefs = [
    columnHelper.accessor("tariffType", {
      id: "tariffType",
      header: "Tariff Type",
      cell: (info) => (
        <LabelChip
          label={info.getValue()}
          size="medium"
          className="bg-surfaceContainerHigh"
        />
      ),
    }),
    columnHelper.accessor("originType", {
      id: "originType",
      header: "Origin Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("destination", {
      id: "destination",
      header: "Destination",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("containerType", {
      id: "containerType",
      header: "Container Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("cargoType", {
      id: "cargoType",
      header: "Cargo Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("day", {
      id: "day",
      header: "Day",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().min} - {info.getValue().max} Days
        </MdTypography>
      ),
    }),
    columnHelper.accessor("currency", {
      id: "currency",
      header: "Currency",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("tariff.20", {
      id: "20",
      header: "20'",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-right">
          {info
            .getValue()
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("tariff.40", {
      id: "40",
      header: "40'",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-right">
          {info
            .getValue()
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("tariff.45", {
      id: "45",
      header: "45'",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-right">
          {info
            .getValue()
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("tariff.HC", {
      id: "HC",
      header: "HC'",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-right">
          {info
            .getValue()
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      <div className="flex gap-2">
        <StatusFilterComponent
          statusOptions={["Demurrage", "Detention", "Combined"]}
          unit="Tariff Type"
          onChange={(selected) => {
            setTableData(
              tempDemDetTariff.filter((tariff) =>
                selected.includes(tariff.tariffType)
              )
            );
          }}
        />
        <StatusFilterComponent
          statusOptions={["Dry", "Reefer", "Flat Rack", "Open Top", "Tank"]}
          unit="Container Type"
          onChange={(selected) => {
            setTableData(
              tempDemDetTariff.filter((tariff) =>
                selected.includes(tariff.containerType)
              )
            );
          }}
        />
        <StatusFilterComponent
          statusOptions={["General", "Dangerous", "Awkward", "Reefer"]}
          unit="Cargo Type"
          onChange={(selected) => {
            setTableData(
              tempDemDetTariff.filter((tariff) =>
                selected.includes(tariff.cargoType)
              )
            );
          }}
        />
      </div>
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
        columns={columnDefs}
        data={tableData}
      />
    </>
  );
};
