import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo } from "react";

type SurchargeSearchTableProps = {
  charge: string;
  paid: "Prepaid" | "Ocean Freight" | "Collect";
  code: string;
  per: string;
  currency: string;
  rateOfpercentage: number;
  cargoType: "Dangerous" | "Awkward" | "Reefer";
  effectiveDate: DateTime;
  expiryDate: DateTime;
};

function createDummySurcharge(): SurchargeSearchTableProps {
  return {
    charge: faker.lorem.sentence(),
    paid: faker.helpers.arrayElement(["Prepaid", "Ocean Freight", "Collect"]),
    code: faker.string.alpha(3).toUpperCase(),
    per: faker.string.alpha(1).toUpperCase() + faker.string.numeric(1),
    currency: faker.finance.currencyCode(),
    rateOfpercentage: faker.number.float({ min: 0, max: 100000 }),
    cargoType: faker.helpers.arrayElement(["Dangerous", "Awkward", "Reefer"]),
    effectiveDate: DateTime.fromJSDate(faker.date.recent()),
    expiryDate: DateTime.fromJSDate(faker.date.future()),
  } as SurchargeSearchTableProps;
}

export const SurchargeSearchTable = () => {
  const tempSurcharges = useMemo(() => {
    return Array.from({ length: 200 }, () => createDummySurcharge());
  }, []);
  const columnHelper = createColumnHelper<SurchargeSearchTableProps>();
  const columnDefs = [
    columnHelper.accessor("charge", {
      id: "charge",
      header: "Charge",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 350,
    }),
    columnHelper.accessor("paid", {
      id: "paid",
      header: "Paid",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("code", {
      id: "code",
      header: "Code",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("per", {
      id: "per",
      header: "Per",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
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
    columnHelper.accessor("rateOfpercentage", {
      id: "rateOfpercentage",
      header: "Rate of Percentage",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFixed(3)}
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
    columnHelper.accessor("effectiveDate", {
      id: "effectiveDate",
      header: "Effective Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("dd/MM/yyyy")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("expiryDate", {
      id: "expiryDate",
      header: "Expiry Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("dd/MM/yyyy")}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
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
        data={tempSurcharges}
        columns={columnDefs}
        isSingleSelect
      />
    </>
  );
};
