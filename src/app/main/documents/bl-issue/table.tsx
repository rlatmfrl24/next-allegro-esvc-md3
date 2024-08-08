import {
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import {
  createDummyVesselInformation,
  createDummyVesselSchedules,
} from "../../schedule/util";
import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdIconButton,
  MdOutlinedButton,
  MdTextButton,
} from "@/app/util/md3";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import NaToggleButton from "@/app/components/na-toggle-button";
import { set } from "lodash";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { BLStateCell } from "./components/bl-state";
import { ManageSearch } from "@mui/icons-material";
import { BLPrintDialog } from "./components/bl-print-dialog";
import { InvoiceDialog } from "./components/invoice-dialog";
import { BLIssueRequestTableProps } from "@/app/util/typeDef/documents";
import { ReasonDialog } from "./components/reason-dialog";
import { HandlingInstructionDialog } from "./components/handling-instruction-dialog";

export function BLIssueRequestTable() {
  const router = useRouter();
  const tempData = useMemo(() => {
    return Array.from(
      { length: 900 },
      (_, i) =>
        ({
          uuid: faker.string.uuid(),
          isFreight: faker.datatype.boolean(),
          status: faker.helpers.arrayElement([
            "Requested",
            "Confirmed",
            "Pending",
            "Rejected",
          ]),
          blType: faker.helpers.arrayElement([
            "Original B/L",
            "eB/L",
            "Switch B/L",
            "SeaWaybill",
          ]),
          bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
          actualShipper: faker.company.name(),
          vvd: createDummyVesselInformation(),
          polEtb: DateTime.fromJSDate(faker.date.recent()),
          polEtd: DateTime.fromJSDate(faker.date.recent()),
          pol: faker.location.city(),
          pod: faker.location.city(),
          qty:
            faker.helpers.arrayElement(["Dry", "Reefer", "Open Top"]) +
            " * " +
            faker.number.int({
              min: 1,
              max: 10,
            }),
          demdet: faker.datatype.boolean(),
          requestBlType: faker.helpers.arrayElement([
            "Surrender",
            "Original",
            "Switch",
            "SeaWaybill",
          ]),
          requestBlTypeDate: DateTime.fromJSDate(faker.date.recent()),
        } as BLIssueRequestTableProps)
    );
  }, []);
  const [tableData, setTableData] = useState<BLIssueRequestTableProps[]>([]);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [
    blHandlingInstructionsDialogOpen,
    setBlHandlingInstructionsDialogOpen,
  ] = useState(false);
  const [targetReasonData, setTargetReasonData] =
    useState<BLIssueRequestTableProps>();
  const [currentHandlingData, setCurrentHandlingData] = useState<
    BLIssueRequestTableProps[]
  >([]);

  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columnHelper = createColumnHelper<BLIssueRequestTableProps>();
  const columns = [
    columnHelper.display({
      id: "checkbox",
      header: (info) => (
        <MdCheckbox
          className="ml-2"
          checked={info.table.getIsAllRowsSelected()}
          indeterminate={info.table.getIsSomeRowsSelected()}
          onchange={(e) => {
            info.table.toggleAllRowsSelected();
          }}
        />
      ),
      cell: (info) => (
        <MdCheckbox checked={info.row.getIsSelected()} className="ml-2" />
      ),
      size: 48,
      minSize: 48,
      maxSize: 48,
    }),
    columnHelper.accessor("isFreight", {
      id: "isFreight",
      header: () => {
        return (
          <NaToggleButton
            label="Freight"
            state={
              tableData.every((row) => row.isFreight) ? "checked" : "unchecked"
            }
            onClick={() => {
              setTableData(
                tableData.map((row) => {
                  return set(row, "isFreight", true);
                })
              );
            }}
          />
        );
      },
      cell: (info) => (
        <NaToggleButton
          label="Include"
          state={info.getValue() ? "checked" : "unchecked"}
          onClick={() => {
            setTableData(
              tableData.map((row, index) => {
                if (index === info.row.index) {
                  return set(row, "isFreight", !info.getValue());
                }
                return row;
              })
            );
          }}
        />
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => (
        <div className="flex gap-2">
          <BLStateCell state={info.getValue()} />
          {(info.getValue() === "Rejected" ||
            info.getValue() === "Pending") && (
            <MdIconButton
              onClick={(e) => {
                e.stopPropagation();
                setTargetReasonData(info.row.original);
                setReasonDialogOpen(true);
              }}
            >
              <ManageSearch />
            </MdIconButton>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("blType", {
      id: "blType",
      header: "B/L Type",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={() => {
            setPrintDialogOpen(true);
          }}
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={() => {
            router.push(`/main/booking/information/confirmation/`);
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
      size: 150,
      minSize: 150,
    }),
    columnHelper.accessor("vvd", {
      id: "vvd",
      header: "VVD",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={() => {
            setCurrentVessel(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
      minSize: 300,
    }),
    columnHelper.accessor("polEtb", {
      id: "polEtb",
      header: "POL ETB",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("polEtd", {
      id: "polEtd",
      header: "POL ETD",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
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
    columnHelper.accessor("qty", {
      id: "qty",
      header: "Qty",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("demdet", {
      id: "demdet",
      header: "Dem/DET",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Y" : "N"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlType", {
      id: "requestBlType",
      header: "Request B/L Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlTypeDate", {
      id: "requestBlTypeDate",
      header: "Request B/L Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BLPrintDialog open={printDialogOpen} onOpenChange={setPrintDialogOpen} />
      <InvoiceDialog
        open={invoiceDialogOpen}
        onOpenChange={setInvoiceDialogOpen}
      />
      {targetReasonData && (
        <ReasonDialog
          open={reasonDialogOpen}
          onOpenChange={setReasonDialogOpen}
          data={targetReasonData}
        />
      )}
      {currentHandlingData.length > 0 && (
        <HandlingInstructionDialog
          open={blHandlingInstructionsDialogOpen}
          onOpenChange={setBlHandlingInstructionsDialogOpen}
          data={currentHandlingData}
        />
      )}

      <BasicTable
        ActionComponent={() => {
          return (
            <div className="flex-1 flex gap-2">
              <MdTextButton
                onClick={() => {
                  setBlHandlingInstructionsDialogOpen(true);
                }}
              >
                B/L Issue Request
              </MdTextButton>
              <MdTextButton
                onClick={() => {
                  setPrintDialogOpen(true);
                }}
              >
                Draft B/L
              </MdTextButton>
              <MdTextButton
                onClick={() => {
                  setInvoiceDialogOpen(true);
                }}
              >
                Invoice
              </MdTextButton>
            </div>
          );
        }}
        columns={columns}
        data={tableData}
        ignoreSelectionColumns={["isFreight"]}
        controlColumns={["isFreight", "checkbox"]}
        getSelectionRows={(rows) => {
          setCurrentHandlingData(rows);
        }}
      />
    </>
  );
}
