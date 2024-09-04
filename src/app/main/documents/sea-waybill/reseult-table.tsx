import NaToggleButton from "@/app/components/na-toggle-button";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdTextButton,
} from "@/app/util/md3";
import { SeaWaybillTableProps } from "@/app/util/typeDef/documents";
import { faker } from "@faker-js/faker";
import { Print } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { set } from "lodash";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { BasicTable } from "@/app/components/table/basic-table";

export default function SeaWaybillResultTable() {
  const tempData = useMemo(() => {
    return Array.from(
      { length: 900 },
      (_, i) =>
        ({
          blNumber: faker.string.alphanumeric(10).toUpperCase(),
          origin: faker.location.city(),
          destination: faker.location.city(),
          vessel: createDummyVesselInformation(),
          onBoardDate: DateTime.fromJSDate(faker.date.recent()),
          issueDate: DateTime.fromJSDate(faker.date.recent()),
          freight: faker.helpers.maybe(() => true),
        } as SeaWaybillTableProps)
    );
  }, []);
  const [tableData, setTableData] = useState<SeaWaybillTableProps[]>([]);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columnHelper = createColumnHelper<SeaWaybillTableProps>();

  const columns = [
    columnHelper.display({
      id: "checkbox",
      enableSorting: false,
      header: (info) => (
        <MdCheckbox
          className="ml-2"
          checked={info.table.getIsAllRowsSelected()}
          onClick={() => {
            info.table.toggleAllRowsSelected();
          }}
        />
      ),
      cell: (info) => (
        <MdCheckbox className="ml-2" checked={info.row.getIsSelected()} />
      ),
      size: 36,
      minSize: 36,
      maxSize: 36,
    }),
    columnHelper.accessor("blNumber", {
      header: "B/L No.",
      id: "blNumber",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
      id: "origin",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
      id: "destination",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
      id: "vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentVessel(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("onBoardDate", {
      header: "On Board Date",
      id: "onBoardDate",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("issueDate", {
      header: "Issue Date",
      id: "issueDate",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("freight", {
      id: "freight",
      enableSorting: false,
      header: () => (
        <NaToggleButton
          label="Freight"
          state={
            tableData.every((row) => row.freight) ? "checked" : "unchecked"
          }
          onClick={() => {
            setTableData(
              tableData.map((row) => {
                return set(row, "freight", true);
              })
            );
          }}
        />
      ),
      cell: (info) => (
        <NaToggleButton
          label="Include"
          className="my-0 -translate-y-1.5"
          state={info.getValue() ? "checked" : "unchecked"}
          onClick={() => {
            setTableData(
              tableData.map((row, index) => {
                if (index === info.row.index) {
                  return set(row, "freight", !info.getValue());
                }
                return row;
              })
            );
          }}
        />
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BasicTable
        ActionComponent={() => {
          return (
            <div className="flex flex-1 items-center">
              <MdTextButton
                onClick={() => {
                  setPrintDialogOpen(true);
                }}
              >
                <div slot="icon">
                  <Print fontSize="small" />
                </div>
                Print
              </MdTextButton>
            </div>
          );
        }}
        columns={columns}
        data={tableData}
        controlColumns={["checkbox", "freight"]}
      />
      <Portal selector="#main-container">
        <BLPrintDialog
          open={printDialogOpen}
          onOpenChange={setPrintDialogOpen}
        />
      </Portal>
    </>
  );
}

const BLPrintDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
      }}
    >
      <div slot="headline">B/L Print</div>
      <div
        slot="content"
        className="bg-surfaceContainerHighest flex items-center justify-center w-96 h-96"
      >
        <MdTypography variant="headline" size="large">
          PDF Viewer
        </MdTypography>
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Close
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Print
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
