import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdOutlinedButton,
  MdRadio,
} from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { fa, faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PricePanel } from "./components/price-panel";
import { QuotationContainerType } from "@/app/util/typeDef/pricing";

interface AgreementTableProps {
  uuid: string;
  agreementNumber: string;
  vvd: string;
  originalPort: string;
  destinationPort: string;
  etd: DateTime;
  eta: DateTime;
  commodity: string;
  typeSize: string;
  createdDate: DateTime;
  bookingRequestNumber: string | undefined;
}

export const AgreementTable = () => {
  const router = useRouter();
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [dialogAgreementNumber, setDialogAgreementNumber] = useState("");
  const tempData = useMemo(() => {
    return Array.from(
      { length: 900 },
      (_, i) =>
        ({
          uuid: faker.string.uuid(),
          agreementNumber: faker.string.alphanumeric(10).toUpperCase(),
          vvd: faker.string.alphanumeric(10).toUpperCase(),
          originalPort: faker.location.city() + ", " + faker.location.country(),
          destinationPort:
            faker.location.city() + ", " + faker.location.country(),
          etd: DateTime.fromJSDate(faker.date.recent()),
          eta: DateTime.fromJSDate(faker.date.recent()),
          commodity: faker.commerce.productName(),
          typeSize:
            faker.helpers.arrayElement(["Dry", "Reefer", "Open Top"]) +
            " * " +
            faker.number.int({
              min: 1,
              max: 10,
            }),
          createdDate: DateTime.fromJSDate(faker.date.past()),
          bookingRequestNumber: faker.helpers.maybe(() =>
            faker.string.alphanumeric(10).toUpperCase()
          ),
        } as AgreementTableProps)
    );
  }, []);
  const [tableData, setTableData] = useState<AgreementTableProps[]>([]);

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columnHelper = createColumnHelper<AgreementTableProps>();
  const columns = [
    // columnHelper.display({
    //   id: "radio",
    //   cell: (info) => (
    //     <MdRadio className="ml-2" checked={info.row.getIsSelected()} />
    //   ),
    //   size: 40,
    //   minSize: 40,
    //   maxSize: 40,
    // }),
    columnHelper.accessor("agreementNumber", {
      header: "Agreement No.",
      id: "agreementNumber",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline w-fit cursor-pointer"
          onClick={() => {
            setDialogAgreementNumber(info.getValue());
            setIsPriceDialogOpen(true);
          }}
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vvd", {
      header: "VVD",
      id: "vvd",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("originalPort", {
      header: "Original Port",
      id: "originalPort",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("destinationPort", {
      header: "Destination Port",
      id: "destinationPort",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("etd", {
      header: "ETD",
      id: "etd",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("eta", {
      header: "ETA",
      id: "eta",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("commodity", {
      header: "Commodity",
      id: "commodity",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("typeSize", {
      header: "Type/Size",
      id: "typeSize",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("createdDate", {
      header: "Created Date",
      id: "createdDate",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("bookingRequestNumber", {
      header: "Booking Request No.",
      id: "bookingRequestNumber",
      cell: (info) => {
        return info.getValue() !== undefined ? (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        ) : (
          <MdOutlinedButton
            onClick={() => {
              router.push(`/main/booking/request`);
            }}
          >
            Booking Request
          </MdOutlinedButton>
        );
      },
      minSize: 150,
    }),
  ];

  return (
    <>
      <BasicTable
        ActionComponent={() => {
          return <div className="flex-1"></div>;
        }}
        columns={columns}
        data={tableData}
        isSingleSelect
      />
      <MdDialog
        open={isPriceDialogOpen}
        closed={() => {
          setIsPriceDialogOpen(false);
        }}
        className="min-w-fit"
      >
        <div slot="headline">Agreement Price</div>
        <div slot="content">
          <MdTypography variant="body" size="medium">
            {dialogAgreementNumber}
          </MdTypography>
          <PricePanel
            containers={[
              {
                containerType: QuotationContainerType.Dry20,
                quantity: 2,
              },
              {
                containerType: QuotationContainerType.Dry40,
                quantity: 4,
              },
            ]}
          />
        </div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              setIsPriceDialogOpen(false);
            }}
          >
            Close
          </MdOutlinedButton>
        </div>
      </MdDialog>
    </>
  );
};
