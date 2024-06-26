import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { createDummyVesselInformation } from "../../schedule/util";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import LabelChip from "@/app/components/label-chip";
import StatusFilterComponent from "@/app/components/status-filter";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { Download } from "@mui/icons-material";

type DetentionStatusTableProps = {
  bookingNumber: string;
  containerNumber: string;
  typeSize: string;
  vessel: VesselInfoType;
  por: string;
  pol: string;
  pod: string;
  del: string;
  tariffType: string;
  lastFreeDate: DateTime;
  equipmentStatus: "Not Returned" | "Returned";
  freeDay: number;
  overDay: number;
  amount: string;
  gateOutDate: DateTime;
  geteInDate: DateTime;
  payer: string;
  invoiceNumber: string;
  paymentStatus: "Paid" | "Unpaid";
  issueDate: DateTime;
};

function createDummyDetention(): DetentionStatusTableProps {
  return {
    bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
    containerNumber: faker.string.alphanumeric(10).toUpperCase(),
    typeSize: faker.helpers.arrayElement([
      "20' Dry",
      "40' Dry",
      "20' Reefer",
      "40' Reefer",
    ]),
    vessel: createDummyVesselInformation(),
    por: faker.location.city() + ", " + faker.location.country(),
    pol: faker.location.city() + ", " + faker.location.country(),
    pod: faker.location.city() + ", " + faker.location.country(),
    del: faker.location.city() + ", " + faker.location.country(),
    tariffType: faker.lorem.words(4),
    lastFreeDate: DateTime.fromJSDate(faker.date.recent()),
    equipmentStatus: faker.helpers.arrayElement(["Not Returned", "Returned"]),
    freeDay: faker.number.int({ max: 20 }),
    overDay: faker.number.int({ min: -20, max: 20 }),
    amount: faker.finance.amount(),
    gateOutDate: DateTime.fromJSDate(faker.date.recent()),
    geteInDate: DateTime.fromJSDate(faker.date.recent()),
    payer: "-",
    invoiceNumber: faker.string.alphanumeric(10).toUpperCase(),
    paymentStatus: faker.helpers.arrayElement(["Paid", "Unpaid"]),
    issueDate: DateTime.fromJSDate(faker.date.recent()),
  } as DetentionStatusTableProps;
}

export const DetentionStatusTable = (pros: {
  type: "inbound" | "outbound";
}) => {
  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

  const tempDetentions = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => createDummyDetention());
  }, []);
  const [tableData, setTableData] =
    useState<DetentionStatusTableProps[]>(tempDetentions);
  const columnHelper = createColumnHelper<DetentionStatusTableProps>();
  const columnDefs = [
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
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
    columnHelper.accessor("typeSize", {
      id: "typeSize",
      header: "Type/Size",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vessel", {
      id: "vessel",
      header: "Vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
          onClick={() => {
            setCurrentVessel(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
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
    columnHelper.accessor("tariffType", {
      id: "tariffType",
      header: "Tariff Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("lastFreeDate", {
      id: "lastFreeDate",
      header: "Last Free Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("equipmentStatus", {
      id: "equipmentStatus",
      header: "Equipment Status",
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(row.getValue(id));
      },
      cell: (info) => (
        <LabelChip
          label={info.getValue()}
          size="medium"
          className="bg-surfaceContainerHigh"
        />
      ),
    }),
    columnHelper.accessor("freeDay", {
      id: "freeDay",
      header: "Free Day",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-center">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("overDay", {
      id: "overDay",
      header: "Over Day",
      cell: (info) => (
        <LabelChip
          label={info.getValue().toString()}
          size="medium"
          className="bg-errorContainer text-onErrorContainer"
        />
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: "Amount",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("gateOutDate", {
      id: "gateOutDate",
      header: "Gate Out Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("geteInDate", {
      id: "geteInDate",
      header: "Gate In Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("payer", {
      id: "payer",
      header: "Payer",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("invoiceNumber", {
      id: "invoiceNumber",
      header: "Invoice No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("paymentStatus", {
      id: "paymentStatus",
      header: "Payment Status",
      filterFn: (row, id, filterValue) => {
        const modifiedFilterValue = (filterValue as string[]).map((v) =>
          v === "Yes" ? "Paid" : "Unpaid"
        );

        return modifiedFilterValue.includes(row.getValue(id));
      },
      cell: (info) => (
        <LabelChip
          label={info.getValue() === "Paid" ? "Yes" : "No "}
          size="medium"
          className={
            info.getValue() === "Paid"
              ? "bg-extendGoodContainer text-extendOnGoodContainer"
              : "bg-surfaceContainerHigh"
          }
        />
      ),
    }),
    columnHelper.accessor("issueDate", {
      id: "issueDate",
      header: "Issue Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BasicTable
        ActionComponent={(table) => (
          <div className="flex-1 flex items-center gap-4">
            <StatusFilterComponent
              unit="Equipment Status"
              statusOptions={["Not Returned", "Returned"]}
              onChange={(status) => {
                table.setColumnFilters([
                  ...table.getState().columnFilters,
                  {
                    id: "equipmentStatus",
                    value: status,
                  },
                ]);
              }}
            />
            <StatusFilterComponent
              unit="Charge"
              statusOptions={["Incurred", "Not Incurred"]}
            />
            <StatusFilterComponent
              unit="Payment"
              statusOptions={["Yes", "No"]}
              onChange={(status) => {
                table.setColumnFilters([
                  ...table.getState().columnFilters,
                  {
                    id: "paymentStatus",
                    value: status,
                  },
                ]);
              }}
            />
            <MdTextButton>
              <MdIcon slot="icon">
                <Download fontSize="small" />
              </MdIcon>
              Download
            </MdTextButton>
          </div>
        )}
        hiddenColumns={
          pros.type === "outbound" ? ["pod", "del"] : ["por", "pol"]
        }
        columns={columnDefs}
        data={tableData}
        isSingleSelect
      />
    </>
  );
};
