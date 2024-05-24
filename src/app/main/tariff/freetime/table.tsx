import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

type FreetimeRequestTableProps = {
  blNumber: string;
  containerNumber: string;
  por: string;
  pol: string;
  pod: string;
  del: string;
  commodity: string;
  customerEmail: string;
  requestEmail: string;
  status: string;
  typeSize: string;
  basic: number;
  contractException: {
    add: number;
    total: number;
  };
  bySystem: {
    add: number;
    total: number;
  };
  byEsvcAdd: number;
  total: number;
};

function createDummyFreetimeRequest(): FreetimeRequestTableProps {
  return {
    blNumber: faker.string.alphanumeric(10).toUpperCase(),
    containerNumber: faker.string.alphanumeric(11).toUpperCase(),
    por: faker.location.city() + ", " + faker.location.country(),
    pol: faker.location.city() + ", " + faker.location.country(),
    pod: faker.location.city() + ", " + faker.location.country(),
    del: faker.location.city() + ", " + faker.location.country(),
    commodity: faker.commerce.productName(),
    customerEmail: faker.internet.email(),
    requestEmail: faker.internet.email(),
    status: "-",
    typeSize: "Dry 20",
    basic: faker.number.int({ max: 100 }),
    contractException: {
      add: faker.number.int({ max: 100 }),
      total: faker.number.int({ max: 100 }),
    },
    bySystem: {
      add: faker.number.int({ max: 100 }),
      total: faker.number.int({ max: 100 }),
    },
    byEsvcAdd: faker.number.int({ max: 100 }),
    total: faker.number.int({ max: 1000 }),
  };
}

export const FreetimeRequestTable = () => {
  const tempList = useMemo(
    () => Array.from({ length: 100 }, createDummyFreetimeRequest),
    []
  );
  const columnHelper = createColumnHelper<FreetimeRequestTableProps>();
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
    columnHelper.accessor("containerNumber", {
      id: "containerNumber",
      header: "Container No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("por", {
      id: "por",
      header: "POR",
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
    columnHelper.accessor("del", {
      id: "del",
      header: "DEL",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("commodity", {
      id: "commodity",
      header: "Commodity",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("customerEmail", {
      id: "customerEmail",
      header: "Customer Email",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestEmail", {
      id: "requestEmail",
      header: "Request Email",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("typeSize", {
      id: "typeSize",
      header: "Type/Size",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("basic", {
      id: "basic",
      header: "Basic",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("contractException", {
      id: "contractException",
      header: "Contract Exception (Add/Total)",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().add} / {info.getValue().total}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("bySystem", {
      id: "bySystem",
      header: "By System (Add/Total)",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().add} / {info.getValue().total}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("byEsvcAdd", {
      id: "byEsvcAdd",
      header: "By e-SVC",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("total", {
      id: "total",
      header: "Total",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
  ];

  return (
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
      data={tempList}
      columns={columnDefs}
      pinningColumns={["blNumber"]}
    />
  );
};
