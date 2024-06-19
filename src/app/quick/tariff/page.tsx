"use client";

import { FilterChipMenu } from "@/app/components/filter-chip-menu";
import LabelChip from "@/app/components/label-chip";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { useSimpleTable } from "@/app/components/table/simple-table";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import { MdFilledButton, MdIcon, MdRadio, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";

type TariffProps = {
  type: "dem" | "det" | "both";
  originCoverage: string;
  destination: string;
  containerType: string;
  cargoType: string;
  day: string;
  currency: string;
  price: {
    "20": string;
    "40": string;
    HC: string;
    "45": string;
  };
};

function createDummyTariff(): TariffProps {
  return {
    type: faker.helpers.arrayElement(["dem", "det", "both"]),
    originCoverage: faker.string.alpha(7).toUpperCase(),
    destination: faker.location.country(),
    containerType: faker.helpers.arrayElement([
      "General",
      "Dry",
      "Reefer",
      "Dangerous",
    ]),
    cargoType: faker.helpers.arrayElement(["Textile", "Electronics", "Food"]),
    day: "1-7 days",
    currency: faker.finance.currencyCode(),
    price: {
      "20": faker.finance.amount({
        min: 1000,
        max: 9000000,
        autoFormat: true,
      }),
      "40": faker.finance.amount({
        min: 1000,
        max: 9000000,
        autoFormat: true,
      }),
      HC: faker.finance.amount({
        min: 1000,
        max: 9000000,
        autoFormat: true,
      }),
      "45": faker.finance.amount({
        min: 1000,
        max: 9000000,
        autoFormat: true,
      }),
    },
  };
}

export default function TariffPage() {
  const cx = classNames.bind(styles);

  const tempData = Array.from({ length: 300 }, () => createDummyTariff());
  const [originCoverage, setOriginCoverage] = useState<string>("");
  const [tableData, setTableData] = useState<TariffProps[]>(tempData);
  const [searchType, setSearchType] = useState<"outbound" | "inbound">(
    "outbound"
  );

  const columnHelper = createColumnHelper<TariffProps>();

  const columnDefs = [
    columnHelper.accessor("type", {
      id: "type",
      header: "Tariff Type",
      cell: (info) => {
        const label = {
          dem: "Demmurage",
          det: "Detention",
          both: "D&D Combined",
        }[info.getValue() as "dem" | "det" | "both"];
        return (
          <LabelChip
            label={label}
            size="medium"
            className="bg-surfaceContainerHigh"
          />
        );
      },
    }),
    columnHelper.accessor("originCoverage", {
      id: "originCoverage",
      header: "Origin Coverage",
      size: 170,
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("destination", {
      id: "destination",
      header: "Destination",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("containerType", {
      id: "containerType",
      header: "Container Type",
      size: 170,
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("cargoType", {
      id: "cargoType",
      header: "Cargo Type",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("day", {
      id: "day",
      header: "Day",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("currency", {
      id: "currency",
      header: "Currency",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("price.20", {
      id: "price.20",
      header: "20`",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("price.40", {
      id: "price.40",
      header: "40`",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("price.HC", {
      id: "price.HC",
      header: "H/C",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("price.45", {
      id: "price.45",
      header: "45`",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
  ];

  return (
    <OverlayScrollbarsComponent defer className="h-full overflow-auto m-2">
      <div className="h-full flex flex-col">
        <div aria-label="container" className={cx(styles.container)}>
          <PageTitle title="DEM/DET  Tariff" hasFavorite={false} />
          <div className={styles.area}>
            <div className="flex gap-4">
              <MdTypography
                tag="label"
                variant="label"
                size="large"
                className="flex items-center gap-2"
              >
                <MdRadio
                  name="type"
                  checked={searchType === "outbound"}
                  onClick={() => setSearchType("outbound")}
                />
                Outbound
              </MdTypography>
              <MdTypography
                tag="label"
                variant="label"
                size="large"
                className="flex items-center gap-2"
              >
                <MdRadio
                  name="type"
                  checked={searchType === "inbound"}
                  onClick={() => setSearchType("inbound")}
                />
                Inbound
              </MdTypography>
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Origin Coverage"
                value={originCoverage}
                handleValueChange={(valule) => {
                  setOriginCoverage(valule);
                }}
              />
              <NAOutlinedListBox
                label="Destination"
                initialValue="All"
                options={[
                  "All",
                  "ASIA",
                  "EUROPE",
                  "MIDDLE EAST",
                  "NORTH AMERICA",
                  "SOUTH AMERICA",
                  "AFRICA",
                  "OCEANIA",
                ]}
              />
            </div>
            <div className="flex justify-end gap-2">
              <MdTextButton>Reset</MdTextButton>
              <MdFilledButton>Search</MdFilledButton>
            </div>
          </div>
          <div className={cx(styles.area, styles.table)}>
            <div className="flex gap-4">
              <StatusFilterComponent
                statusOptions={["Demurrage", "Detention", "D&D Combined"]}
                unit="Tariff Type"
                onChange={(selected) => {
                  const selectedType = selected.map((type) => {
                    return {
                      Demurrage: "dem",
                      Detention: "det",
                      "D&D Combined": "both",
                    }[type];
                  });
                  setTableData(
                    tempData.filter((data) => selectedType.includes(data.type))
                  );
                }}
              />
              <StatusFilterComponent
                statusOptions={["General", "Dry", "Reefer", "Dangerous"]}
                unit="Container Type"
                onChange={(selected) => {
                  setTableData(
                    tempData.filter((data) =>
                      selected.includes(data.containerType)
                    )
                  );
                }}
              />
              <StatusFilterComponent
                statusOptions={tempData
                  .reduce((acc, curr) => {
                    if (!acc.includes(curr.cargoType)) {
                      acc.push(curr.cargoType);
                    }
                    return acc;
                  }, [] as string[])
                  .sort()}
                unit="Cargo Type"
                onChange={(selected) => {
                  setTableData(
                    tempData.filter((data) => selected.includes(data.cargoType))
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
              data={tableData}
              columns={columnDefs}
            />
          </div>
        </div>
      </div>
    </OverlayScrollbarsComponent>
  );
}
