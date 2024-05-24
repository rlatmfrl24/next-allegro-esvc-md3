import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { createDummyVesselInformation } from "../../schedule/util";
import { useMemo } from "react";
import { create } from "lodash";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { useVesselInfoDialog } from "@/app/components/common-dialog-hooks";
import { MdCheckbox, MdIcon, MdTextButton } from "@/app/util/md3";
import { Download } from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";
import { useRouter } from "next/navigation";

type InvoiceTableProps = {
  bookingNumber: string;
  actualShipper: string;
  vvd: VesselInfoType;
  pol: string;
  pod: string;
  quantity: string[];
};

function createDummyInvoice(): InvoiceTableProps {
  return {
    bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
    actualShipper: faker.company.name(),
    vvd: createDummyVesselInformation(),
    pol: faker.location.city() + ", " + faker.location.country(),
    pod: faker.location.city() + ", " + faker.location.country(),
    quantity: Array.from({ length: faker.number.int({ max: 5 }) }, () => {
      return (
        faker.helpers.arrayElement([
          "Dry",
          "Reefer",
          "Flat Rack",
          "Open Top",
          "Tank",
        ]) +
        " " +
        faker.helpers.arrayElement(["20", "40", "45", "40HC"]) +
        " x " +
        faker.number.int({ min: 1, max: 10 })
      );
    }),
  } as InvoiceTableProps;
}

export const InvoiceTable = () => {
  const tempInvoices = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyInvoice());
  }, []);
  const { renderDialog, setCurrentVessel, setIsVesselInfoDialogOpen } =
    useVesselInfoDialog();
  const columnHelper = createColumnHelper<InvoiceTableProps>();
  const router = useRouter();

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
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
          onClick={() => {
            router.push(
              "/main/booking/information/confirmation?bookingNumber=" +
                info.getValue()
            );
          }}
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("actualShipper", {
      id: "actualShipper",
      header: "Actual Shipper",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vvd", {
      id: "vvd",
      header: "VVD",
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
    columnHelper.accessor("quantity", {
      id: "quantity",
      header: "Quantity",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().map((q) => (
            <div key={faker.string.uuid()}>{q}</div>
          ))}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BasicTable
        ActionComponent={() => (
          <div className="flex gap-4 flex-1">
            <MdTextButton>
              <MdIcon slot="icon">
                <Download fontSize="small" />
              </MdIcon>
              Download
            </MdTextButton>
            <DividerComponent orientation="vertical" className="m y-2" />
            <MdTextButton>Invoice</MdTextButton>
            <MdTextButton>Draft B/L</MdTextButton>
          </div>
        )}
        columns={columnDefs}
        data={tempInvoices}
      />
    </>
  );
};
