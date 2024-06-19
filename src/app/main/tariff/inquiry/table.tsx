import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { createDummyVesselInformation } from "../../schedule/util";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import LabelChip from "@/app/components/label-chip";
import { BasicTable } from "@/app/components/table/basic-table";
import {
  MdDialog,
  MdIcon,
  MdOutlinedButton,
  MdTextButton,
} from "@/app/util/md3";
import { Download, FmdGood, FmdGoodOutlined } from "@mui/icons-material";
import StatusFilterComponent from "@/app/components/status-filter";
import { useVesselInfoDialog } from "@/app/components/common-dialog-hooks";
import { DividerComponent } from "@/app/components/divider";

type TariffType = "Demurrage" | "Detention" | "Combined";

interface ChargeInquiryTableProps {
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
  vessel: string;
  placeOfReceipt: string;
  placeOfLoading: string;
  placeOfDischarging: string;
  placeOfDelivery: string;
  commodity: string;
}

function createDummyChargeInquiry(): ChargeInquiryTableProps {
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
    vessel: faker.lorem.sentence().toUpperCase(),
    placeOfReceipt: faker.location.city() + ", " + faker.location.country(),
    placeOfLoading: faker.location.city() + ", " + faker.location.country(),
    placeOfDischarging: faker.location.city() + ", " + faker.location.country(),
    placeOfDelivery: faker.location.city() + ", " + faker.location.country(),
    commodity: faker.commerce.productName(),
  } as ChargeInquiryTableProps;
}

export const ChargeInquiryTable = (props: {
  tableType: "simple" | "complex";
}) => {
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyChargeInquiry());
  }, []);
  const columnHelper = createColumnHelper<ChargeInquiryTableProps>();
  const [tableData, setTableData] = useState(tempData);
  const [isBookingInformationDialogOpen, openBookingInformationDialog] =
    useState(false);
  const [selectedBookingInfo, setSelectedBookingInfo] =
    useState<ChargeInquiryTableProps>();

  const columnDefs = [
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
          onClick={() => {
            setSelectedBookingInfo(info.row.original);
            openBookingInformationDialog(true);
          }}
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("tariffType", {
      id: "tariffType",
      header: "Tariff Type",
      filterFn: (row, id, filterValue) => {
        return (filterValue as string[]).includes(row.getValue(id));
      },
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
          {info.getValue().join(", ")}
        </MdTypography>
      ),
      size: 300,
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

  return (
    <>
      <BasicTable
        ActionComponent={(table) => (
          <div className="flex-1 flex gap-4 items-center">
            <StatusFilterComponent
              unit="Tariff Type"
              statusOptions={[
                "Demurrage",
                "Detention",
                "Demurrage & Detention (Combined Tariff)",
              ]}
              onChange={(selectedStatus) => {
                const modifiedSelections = selectedStatus.map((status) => {
                  if (status === "Demurrage") {
                    return "Demurrage";
                  } else if (status === "Detention") {
                    return "Detention";
                  } else {
                    return "Combined";
                  }
                });

                table.setColumnFilters([
                  {
                    id: "tariffType",
                    value: modifiedSelections,
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
        data={tableData}
        columns={columnDefs}
        pinningColumns={["blNumber", "bookingNumber", "tariffType"]}
      />
      <MdDialog
        open={isBookingInformationDialogOpen}
        closed={() => openBookingInformationDialog(false)}
        className="min-h-[680px]"
      >
        <div slot="headline">Booking Information</div>
        <div slot="content">
          <div className="grid grid-cols-[0fr_1fr] gap-2">
            <MdTypography variant="body" size="large" className="text-outline">
              Vessel
            </MdTypography>
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface ml-2"
            >
              {selectedBookingInfo?.vessel}
            </MdTypography>
            <MdTypography variant="body" size="large" className="text-outline">
              Commodity
            </MdTypography>
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface ml-2"
            >
              {selectedBookingInfo?.commodity}
            </MdTypography>
          </div>
          <div className="border border-outlineVariant rounded-lg mt-4 p-6">
            <PortItem
              title="Place of Receipt"
              port={selectedBookingInfo?.placeOfReceipt}
              fill
            />
            <DividerComponent
              orientation="vertical"
              className="border-dashed h-12 scale-y-125 mx-[11px]"
            />
            <PortItem
              title="Place of Loading"
              port={selectedBookingInfo?.placeOfLoading}
            />
            <DividerComponent
              orientation="vertical"
              className="border-dashed h-12 scale-y-125 mx-[11px]"
            />
            <PortItem
              title="Place of Discharging"
              port={selectedBookingInfo?.placeOfDischarging}
            />
            <DividerComponent
              orientation="vertical"
              className="border-dashed h-12 scale-y-125 mx-[11px]"
            />
            <PortItem
              title="Place of Delivery"
              port={selectedBookingInfo?.placeOfDelivery}
              fill
            />
          </div>
        </div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              openBookingInformationDialog(false);
            }}
          >
            Close
          </MdOutlinedButton>
        </div>
      </MdDialog>
    </>
  );
};

const PortItem = ({
  title,
  port,
  fill = false,
}: {
  title: string;
  port?: string;
  fill?: boolean;
}) => {
  return (
    <div className="flex items-center gap-4">
      {fill ? (
        <FmdGood className="text-primary" />
      ) : (
        <FmdGoodOutlined className="text-primary" />
      )}
      <div className="flex flex-col gap-1">
        <MdTypography variant="body" size="large">
          {title}
        </MdTypography>
        <MdTypography
          variant="body"
          size="large"
          prominent
          className="text-primary"
        >
          {port ?? "N/A"}
        </MdTypography>
      </div>
    </div>
  );
};
