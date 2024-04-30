import { BasicTable } from "@/app/components/table/simple-table";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdCircularProgress,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { SISearchTableProps, SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { SimpleItem } from "../../booking/request/components/base";
import { FmdGood } from "@mui/icons-material";
import SIStateChip from "./si-state-chip";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";

const ActionButtons = ({
  selectionList,
  setTableData,
}: {
  selectionList: SISearchTableProps[];
  setTableData: Dispatch<SetStateAction<SISearchTableProps[]>>;
}) => {
  const states = selectionList.map((item) => item.blState);

  const [isBLPreviewOpen, setIsBLPreviewOpen] = useState(false);
  const [isBLCombineOpen, setIsBLCombineOpen] = useState(false);
  const [isBLIssueRequestOpen, setIsBLIssueRequestOpen] = useState(false);

  return (
    <>
      {states.length > 0 && (
        <>
          <DividerComponent orientation="vertical" className="h-8" />
          <div className="flex gap-2">
            {(states.includes(SIState.None) ||
              states.includes(SIState.TemporarySaved) ||
              states.includes(SIState.ChangeRequested) ||
              states.includes(SIState.ChangeRequestedRejected) ||
              states.includes(SIState.Confirmed) ||
              states.includes(SIState.Rejected) ||
              states.includes(SIState.Submit)) &&
              states.length === 1 && (
                <Link href={`/main/documents/si/edit`}>
                  <MdTextButton>Edit</MdTextButton>
                </Link>
              )}

            {(states.includes(SIState.ChangeRequested) ||
              states.includes(SIState.ChangeRequestedRejected) ||
              states.includes(SIState.BLIssueRequest) ||
              states.includes(SIState.BLIssueRejected) ||
              states.includes(SIState.BLIssuePending) ||
              states.includes(SIState.BLIssueConfirm) ||
              states.includes(SIState.BLIssueClosed) ||
              states.includes(SIState.Confirmed)) &&
              states.length === 1 && (
                <MdTextButton
                  onClick={() => {
                    setIsBLPreviewOpen(true);
                  }}
                >
                  Draft B/L
                </MdTextButton>
              )}

            {(states.includes(SIState.None) ||
              states.includes(SIState.TemporarySaved) ||
              states.includes(SIState.Submit) ||
              states.includes(SIState.ChangeRequested) ||
              states.includes(SIState.ChangeRequestedRejected) ||
              states.includes(SIState.Rejected) ||
              states.includes(SIState.Confirmed)) &&
              states.length === 1 && (
                <MdTextButton
                  onClick={() => {
                    setIsBLCombineOpen(true);
                  }}
                >
                  Combine
                </MdTextButton>
              )}

            {!(
              states.includes(SIState.Rejected) ||
              states.includes(SIState.Pending) ||
              states.includes(SIState.BLIssuePending) ||
              states.includes(SIState.BLIssueClosed)
            ) && (
              <MdTextButton
                onClick={() => {
                  setIsBLIssueRequestOpen(true);
                }}
              >
                B/L Issue Request
              </MdTextButton>
            )}
          </div>
        </>
      )}
      <Portal selector="#main-container">
        <BLPreview open={isBLPreviewOpen} onOpenChange={setIsBLPreviewOpen} />
        <BLIssueRequest
          open={isBLIssueRequestOpen}
          onOpenChange={setIsBLIssueRequestOpen}
          rows={selectionList}
          onConfirm={(rows) => {
            setTableData((prev) =>
              prev.map((item) =>
                rows.some((row) => row.requestNumber === item.requestNumber)
                  ? {
                      ...item,
                      // blState: SIState.BLIssueRequest,
                      requestBlType:
                        rows.find(
                          (row) => row.requestNumber === item.requestNumber
                        )?.requestBlType || "None",
                    }
                  : item
              )
            );
          }}
        />
        {selectionList.length === 1 && (
          <BLCombine
            open={isBLCombineOpen}
            onOpenChange={setIsBLCombineOpen}
            rowData={selectionList[0]}
          />
        )}
      </Portal>
    </>
  );
};

const BLPreview = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <MdDialog
      open={open}
      closed={() => onOpenChange(false)}
      className="min-w-fit"
    >
      <div slot="headline">B/L Preview</div>
      <div
        slot="content"
        className="w-96 h-96 flex items-center justify-center bg-surfaceContainerHighest"
      >
        PDF Viewer
      </div>
      <div slot="actions">
        <MdTextButton onClick={() => onOpenChange(false)}>Close</MdTextButton>
      </div>
    </MdDialog>
  );
};

const BLIssueRequest = ({
  open,
  onOpenChange,
  rows,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows: SISearchTableProps[];
  onConfirm?: (rows: SISearchTableProps[]) => void;
}) => {
  const [requestedBLs, setRequestedBLs] = useState<SISearchTableProps[]>(rows);
  const validateConfirm = !requestedBLs.every(
    (item) => item.requestBlType !== "None"
  );

  useEffect(() => {
    setRequestedBLs(rows);
  }, [rows, open]);

  return (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
      }}
      className="min-w-fit"
    >
      <div slot="headline">B/L Issue Request</div>
      <div slot="content" className="flex flex-col gap-6">
        <MdTypography variant="body" size="medium">
          Do you want to save the data?
          <input autoFocus className="h-0" />
        </MdTypography>
        {requestedBLs.map((row, index) => (
          <div
            key={row.requestNumber}
            className="px-6 py-4 flex flex-col gap-2 border border-outlineVariant rounded-2xl"
          >
            <div>
              <SIStateChip state={row.blState} />
            </div>
            <div className="flex items-center gap-2">
              <FmdGood className="text-primary" />
              <MdTypography variant="body" size="large" prominent>
                {row.origin}
              </MdTypography>
              <DividerComponent className="max-w-8 border-dotted border-b-2 mx-4" />
              <FmdGood className="text-primary" />
              <MdTypography variant="body" size="large" prominent>
                {row.destination}
              </MdTypography>
            </div>
            <div className="flex">
              <SimpleItem
                title="Request No."
                value={row.requestNumber}
                noWrap
                className="min-w-fit flex-none"
              />
              <DividerComponent orientation="vertical" className="h-12 mx-4" />
              <SimpleItem
                title="Booking No."
                value={row.bookingNumber}
                noWrap
                className="min-w-fit flex-none"
              />
              <DividerComponent orientation="vertical" className="h-12 mx-4" />
              <SimpleItem title="Vessel" value={row.vessel.vesselName} noWrap />
              <NAOutlinedListBox
                className="w-40 ml-4"
                label="Request B/L Type"
                initialValue={row.requestBlType}
                options={["Original B/L", "B/L Surrender", "Sea Waybill"]}
                onSelection={(value) => {
                  setRequestedBLs((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, requestBlType: value } : item
                    )
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          disabled={validateConfirm}
          onClick={() => {
            onOpenChange(false);
            onConfirm?.(requestedBLs);
          }}
        >
          Confirm
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

const BLCombine = ({
  open,
  onOpenChange,
  rowData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rowData: SISearchTableProps;
}) => {
  type TableProps = {
    bkgNumber: string;
    vessel: VesselInfoType;
    origin: string;
    destination: string;
    typeSize: string;
  };

  const tempTableData: TableProps[] = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => ({
      bkgNumber: faker.string.alphanumeric(12).toUpperCase(),
      vessel: createDummyVesselInformation(),
      origin: faker.location.city(),
      destination: faker.location.city(),
      typeSize: "General",
    }));
  }, []);
  const columnHelper = createColumnHelper<TableProps>();
  const [rowSelection, setRowSelection] = useState({});
  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

  const columns = [
    columnHelper.display({
      id: "checkbox",
      header: "",
      cell: (info) => (
        <MdCheckbox checked={info.row.getIsSelected()} className="ml-2" />
      ),
      size: 48,
    }),
    columnHelper.accessor("bkgNumber", {
      header: "Booking No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline whitespace-nowrap"
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
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
    columnHelper.accessor("origin", {
      header: "Origin",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("typeSize", {
      header: "Type/Size",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: tempTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection: rowSelection,
    },
  });

  return (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
        table.resetRowSelection();
      }}
      className="min-w-fit"
    >
      {renderDialog()}
      <div slot="headline">B/L Combine</div>
      <div slot="content" className="flex flex-col">
        <div className="flex items-center">
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking No.
          </MdTypography>
          <MdTypography variant="body" size="large" prominent className="ml-2">
            {rowData.bookingNumber}
          </MdTypography>
        </div>
        <MdTypography
          variant="body"
          size="large"
          className="border-t border-dashed border-outlineVariant my-4 pt-4"
        >
          Please check booking which you want to combine with your booking.
        </MdTypography>
        <BasicTable
          table={table}
          onRowSelction={(row) => {
            row.toggleSelected();
          }}
        />
      </div>
      <div slot="actions">
        <MdTextButton onClick={() => onOpenChange(false)}>Close</MdTextButton>
        <MdFilledButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Combine
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export default ActionButtons;
