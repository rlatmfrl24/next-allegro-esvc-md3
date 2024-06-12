import LabelChip from "@/app/components/chips/label-chip";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

type DGRestrictionTableProps = {
  type: "POL" | "POD";
  port: string; // city, country
  status: "permit" | "prohibition" | "declare" | "unchecked";
  explanation: string; // city, country
};

function createDummyData(): DGRestrictionTableProps[] {
  return Array.from({ length: 100 }, (_, i) => {
    return {
      type: faker.helpers.arrayElement(["POL", "POD"]),
      port: faker.location.city() + ", " + faker.location.country(),
      status: faker.helpers.arrayElement([
        "permit",
        "prohibition",
        "declare",
        "unchecked",
      ]),
      explanation: faker.location.city() + ", " + faker.location.country(),
    };
  });
}

export const DGRestrictionTable = () => {
  const tempData = useMemo(() => createDummyData(), []);
  const [tableData, setTableData] =
    useState<DGRestrictionTableProps[]>(tempData);

  const columnHelper = createColumnHelper<DGRestrictionTableProps>();
  const columnDefs = [
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("port", {
      id: "port",
      header: "Port",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
      size: 300,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => {
        return (
          <LabelChip
            size="medium"
            label={
              info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)
            }
            className={
              info.getValue() === "permit"
                ? "bg-extendGoodContainer text-extendOnGoodContainer"
                : info.getValue() === "prohibition"
                ? "bg-errorContainer text-onErrorContainer"
                : "bg-surfaceContainerHigh text-onSurface"
            }
          />
        );
      },
    }),
    columnHelper.accessor("explanation", {
      id: "explanation",
      header: "Explanation",
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
    <>
      <BasicTable
        ActionComponent={() => {
          return (
            <div className="flex-1">
              <MdTextButton hasIcon>
                <MdIcon slot="icon">
                  <Download fontSize="small" />
                </MdIcon>
                Download
              </MdTextButton>
            </div>
          );
        }}
        columns={columnDefs}
        data={tableData}
      />
    </>
  );
};
