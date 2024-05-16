import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

type TareTableProps = {
  containerNumber: string;
  containerType: string;
  tareWeight: number;
  payload: number;
};

function createDummyTareContainerData() {
  return {
    containerNumber: faker.string.alphanumeric(11).toUpperCase(),
    containerType: faker.lorem.words(5),
    tareWeight: faker.number.int({
      min: 10000,
      max: 30000,
    }),
    payload: faker.number.int({
      min: 10000,
      max: 30000,
    }),
  } as TareTableProps;
}

export const TareContainerTable = () => {
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyTareContainerData());
  }, []);
  const columnHelper = createColumnHelper<TareTableProps>();

  const columnDefs = [
    columnHelper.accessor("containerNumber", {
      id: "containerNumber",
      header: "Container Number",
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
    columnHelper.accessor("tareWeight", {
      id: "tareWeight",
      header: "Tare Weight",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info
            .getValue()
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("payload", {
      id: "payload",
      header: "Payload",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
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
    <BasicTable
      ActionComponent={() => <div className="flex-1"></div>}
      columns={columnDefs}
      data={tempData}
      isSingleSelect
    />
  );
};
