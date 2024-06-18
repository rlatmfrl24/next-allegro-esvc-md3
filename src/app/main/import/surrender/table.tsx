import LabelChip from "@/app/components/label-chip";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { MdCheckbox, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";

type SurrenderTableProps = {
  blNumber: string;
  blType: "Original B/L" | "Sea Waybill" | "B/L Surrender";
  isSurrendered: boolean;
  blIssueDate: DateTime;
  blIssueOffice: string;
  surrenderDate: DateTime;
  surrenderOffice: string;
};

function createDummySurrenderData(): SurrenderTableProps {
  return {
    blNumber: (faker.string.alpha(3) + faker.string.numeric(7)).toUpperCase(),
    blType: faker.helpers.arrayElement([
      "Original B/L",
      "Sea Waybill",
      "B/L Surrender",
    ]),
    isSurrendered: faker.datatype.boolean(),
    blIssueDate: DateTime.fromJSDate(faker.date.past()),
    blIssueOffice: faker.location.city() + ", " + faker.location.country(),
    surrenderDate: DateTime.fromJSDate(faker.date.past()),
    surrenderOffice: faker.location.city() + ", " + faker.location.country(),
  } as SurrenderTableProps;
}

export const SurrenderTable = () => {
  const [selectedRows, setSelectedRows] = useState<SurrenderTableProps[]>([]);
  const tempSurrenderList = useMemo(() => {
    return Array.from({ length: 100 }, createDummySurrenderData);
  }, []);
  const columnHelper = createColumnHelper<SurrenderTableProps>();
  const columnDefs = [
    columnHelper.display({
      id: "checkbox",
      header: "",
      cell: (info) => (
        <div className="flex justify-center">
          <MdCheckbox checked={info.row.getIsSelected()} />
        </div>
      ),
      size: 50,
    }),
    columnHelper.accessor("blNumber", {
      id: "blNumber",
      header: "B/L No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
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
    columnHelper.accessor("isSurrendered", {
      id: "isSurrendered",
      header: "Surrender",
      cell: (info) => (
        <LabelChip
          size="medium"
          label={info.getValue() ? "Yes" : "No"}
          className={
            info.getValue()
              ? "bg-extendGoodContainer"
              : "bg-surfaceContainerHigh text-onSurface"
          }
        />
      ),
      size: 100,
    }),
    columnHelper.accessor("blIssueDate", {
      id: "blIssueDate",
      header: "B/L Issue Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("blIssueOffice", {
      id: "blIssueOffice",
      header: "B/L Issue Office",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 300,
    }),
    columnHelper.accessor("surrenderDate", {
      id: "surrenderDate",
      header: "Surrender Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("surrenderOffice", {
      id: "surrenderOffice",
      header: "Surrender Office",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 300,
    }),
  ];

  return (
    <BasicTable
      ActionComponent={() => {
        return (
          <div className="flex flex-1 gap-4">
            {selectedRows.length === 1 && (
              <MdTextButton>B/L Preview</MdTextButton>
            )}
            {selectedRows.length > 0 && (
              <MdTextButton>Arrival Notice</MdTextButton>
            )}
            {selectedRows.length === 1 && selectedRows[0].isSurrendered && (
              <MdTextButton>Surrender Notice</MdTextButton>
            )}
          </div>
        );
      }}
      data={tempSurrenderList}
      columns={columnDefs}
      getSelectionRows={(rows) => {
        setSelectedRows(rows);
      }}
    />
  );
};
