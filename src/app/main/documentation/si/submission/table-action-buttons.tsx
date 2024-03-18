import { BasicTable } from "@/app/components/basic-table";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdCircularProgress,
  MdDialog,
  MdFilledButton,
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
import { useMemo, useState } from "react";

const ActionButtons = ({
  selectionList,
}: {
  selectionList: SISearchTableProps[];
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
              states.length === 1 && <MdTextButton>Edit</MdTextButton>}

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
          flag={faker.helpers.maybe(() => false)}
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
  flag = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flag?: boolean;
}) => {
  const [currentState, setCurrentState] = useState<
    "initial" | "loading" | "complete"
  >("initial");

  function dummy() {
    setCurrentState("loading");
    setTimeout(() => {
      setCurrentState("complete");
    }, 2000);
  }

  return flag ? (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
        setTimeout(() => {
          setCurrentState("initial");
        }, 500);
      }}
      className="min-w-fit"
    >
      <div slot="headline">
        {
          {
            initial: "Do you want to save the data?",
            loading: "Waiting for server response...",
            complete: "The data has been saved successfully.",
          }[currentState]
        }
      </div>
      <div slot="content">
        {
          {
            initial: "Confirm Message",
            loading: (
              <div className="w-full flex justify-center">
                <MdCircularProgress indeterminate />
              </div>
            ),
            complete: "Allegro Message",
          }[currentState]
        }
      </div>
      {currentState !== "loading" && (
        <div slot="actions">
          <MdTextButton
            onClick={() => {
              onOpenChange(false);
              setTimeout(() => {
                setCurrentState("initial");
              }, 500);
            }}
          >
            Close
          </MdTextButton>
          {currentState === "initial" && (
            <MdFilledButton onClick={() => dummy()}>Save</MdFilledButton>
          )}
        </div>
      )}
    </MdDialog>
  ) : (
    <MdDialog
      open={open}
      closed={() => onOpenChange(false)}
      className="min-w-fit"
    >
      <div slot="headline">
        You can’t submit S/I after expired cut-off time.
      </div>
      <div slot="content">Confirm Message</div>
      <div slot="actions">
        <MdTextButton onClick={() => onOpenChange(false)}>Close</MdTextButton>
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
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
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
