import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { createDummyVesselInformation } from "../../schedule/util";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import LabelChip from "@/app/components/chips/label-chip";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import { Download } from "@mui/icons-material";
import StatusFilterComponent from "@/app/components/status-filter";
import { useVesselInfoDialog } from "@/app/components/common-dialog-hooks";

type TariffType = "Demurrage" | "Detention" | "Combined";

interface SimpleTableProps {
  bookingNumber: string;
  tariffType: TariffType;
  containerNumber: string;
  typeSize: string[];
  freeDays: number;
  overDays: number;
  stayingPeriodFreeTime: {
    from: DateTime;
    to: DateTime;
  };
  freeTime: {
    start: DateTime;
    end: DateTime;
  };
  ratePerDay: {
    days: {
      from: number;
      to: number;
    };
    rate: number;
  };
  billingAmount: string;
}

interface ComplexTableProps extends SimpleTableProps {
  blNumber: string;
  vessel: VesselInfoType;
  placeOfReceipt: string;
  placeOfLoading: string;
  placeOfDischarging: string;
  placeOfDelivery: string;
  commodity: string;
}

function createDummySimpleCharge(): SimpleTableProps {
  return {
    bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
    tariffType: faker.helpers.arrayElement([
      "Demurrage",
      "Detention",
      "Combined",
    ]),
    containerNumber: faker.string.alphanumeric(11).toUpperCase(),
    typeSize: Array.from(
      { length: faker.number.int({ max: 5 }) },
      () =>
        faker.helpers.arrayElement(["Dry", "Reefer", "Dangerous"]) +
        " " +
        faker.helpers.arrayElement(["20", "40"])
    ),
    freeDays: faker.number.int({ min: 1, max: 10 }),
    overDays: faker.number.int({ min: -10, max: 50 }),
    stayingPeriodFreeTime: {
      from: DateTime.fromJSDate(faker.date.past()),
      to: DateTime.fromJSDate(faker.date.future()),
    },
    freeTime: {
      start: DateTime.fromJSDate(faker.date.past()),
      end: DateTime.fromJSDate(faker.date.future()),
    },
    ratePerDay: {
      days: {
        from: faker.number.int({ min: 1, max: 10 }),
        to: faker.number.int({ min: 11, max: 50 }),
      },
      rate: faker.number.int({ min: 10, max: 100 }),
    },
    billingAmount: faker.finance.amount(),
  } as SimpleTableProps;
}

function createDummyComplexCharge(): ComplexTableProps {
  return {
    ...createDummySimpleCharge(),
    blNumber: faker.string.alphanumeric(10).toUpperCase(),
    vessel: createDummyVesselInformation(),
    placeOfReceipt: faker.location.city() + ", " + faker.location.country(),
    placeOfLoading: faker.location.city() + ", " + faker.location.country(),
    placeOfDischarging: faker.location.city() + ", " + faker.location.country(),
    placeOfDelivery: faker.location.city() + ", " + faker.location.country(),
    commodity: faker.commerce.productName(),
  } as ComplexTableProps;
}

export const ChargeInquiryTable = (props: {
  tableType: "simple" | "complex";
}) => {
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyComplexCharge());
  }, []);
  const columnHelper = createColumnHelper<ComplexTableProps>();
  const [tableData, setTableData] = useState(tempData);
  const { renderDialog, setCurrentVessel, setIsVesselInfoDialogOpen } =
    useVesselInfoDialog();

  const simpleColumnDefs = [
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
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
        <LabelChip
          label={info.getValue()}
          size="medium"
          className="bg-surfaceContainerHigh"
        />
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
          {info.getValue().map((typeSize) => (
            <div key={typeSize}>{typeSize}</div>
          ))}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("freeDays", {
      id: "freeDays",
      header: "Free Days",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-center">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("overDays", {
      id: "overDays",
      header: "Over Days",
      cell: (info) => (
        <LabelChip
          label={info.getValue().toString()}
          size="medium"
          className="bg-errorContainer text-onErrorContainer"
        />
      ),
    }),
    columnHelper.accessor("stayingPeriodFreeTime", {
      id: "stayingPeriodFreeTime",
      header: "Staying Period Free Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().from.toFormat("yyyy-MM-dd")} -{" "}
          {info.getValue().to.toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("freeTime", {
      id: "freeTime",
      header: "Free Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().start.toFormat("yyyy-MM-dd")} -{" "}
          {info.getValue().end.toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("ratePerDay", {
      id: "ratePerDay.days",
      header: "Rate Per Day",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().days.from} - {info.getValue().days.to} days{" ("}
          {info.getValue().rate}
          {")"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("billingAmount", {
      id: "billingAmount",
      header: "Billing Amount",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
  ];

  const complexColumnDefs = [
    columnHelper.accessor("blNumber", {
      id: "blNumber",
      header: "BL Number",
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
        <LabelChip
          label={info.getValue()}
          size="medium"
          className="bg-surfaceContainerHigh"
        />
      ),
    }),
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
            setIsVesselInfoDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
    }),
    columnHelper.accessor("placeOfReceipt", {
      id: "placeOfReceipt",
      header: "Place of Receipt",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("placeOfLoading", {
      id: "placeOfLoading",
      header: "Place of Loading",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("placeOfDischarging", {
      id: "placeOfDischarging",
      header: "Place of Discharging",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("placeOfDelivery", {
      id: "placeOfDelivery",
      header: "Place of Delivery",
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
    columnHelper.accessor("typeSize", {
      id: "typeSize",
      header: "Type/Size",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().map((typeSize) => (
            <div key={typeSize}>{typeSize}</div>
          ))}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("freeDays", {
      id: "freeDays",
      header: "Free Days",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="text-center">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("overDays", {
      id: "overDays",
      header: "Over Days",
      cell: (info) => (
        <LabelChip
          label={info.getValue().toString()}
          size="medium"
          className="bg-errorContainer text-onErrorContainer"
        />
      ),
    }),
    columnHelper.accessor("stayingPeriodFreeTime", {
      id: "stayingPeriodFreeTime",
      header: "Staying Period Free Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().from.toFormat("yyyy-MM-dd")} -{" "}
          {info.getValue().to.toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("freeTime", {
      id: "freeTime",
      header: "Free Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().start.toFormat("yyyy-MM-dd")} -{" "}
          {info.getValue().end.toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("ratePerDay", {
      id: "ratePerDay",
      header: "Rate Per Day",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().days.from} - {info.getValue().days.to} days{" ("}
          {info.getValue().rate}
          {")"}
        </MdTypography>
      ),
      minSize: 200,
      size: 200,
    }),
    columnHelper.accessor("billingAmount", {
      id: "billingAmount",
      header: "Billing Amount",
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
      <div className="w-fit">
        <StatusFilterComponent
          unit="Tariff Type"
          statusOptions={["Demurrage", "Detention", "Combined"]}
          onChange={(selectedStatus) => {
            if (selectedStatus.length === 0) {
              setTableData(tempData);
              return;
            }
            setTableData(
              tempData.filter((data) =>
                selectedStatus.includes(data.tariffType)
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
        data={tableData}
        columns={
          props.tableType === "simple" ? simpleColumnDefs : complexColumnDefs
        }
        pinningColumns={["blNumber", "bookingNumber", "tariffType"]}
      />
    </>
  );
};
