import Portal from "@/app/components/portal";
import { createDummyPtPScheduleData } from "../../../schedule/util";
import {
  MdDialog,
  MdFilledButton,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BasicTable } from "@/app/components/basic-table";
import { useEffect, useMemo, useState } from "react";
import {
  PtPScheduleType,
  PtPSearchConditionType,
} from "@/app/util/typeDef/schedule";

export default function SearchScheduleDialog({
  open,
  handleOpen,
  condition,
  onSelection,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  condition: PtPSearchConditionType;
  onSelection: (schedule: PtPScheduleType) => void;
}) {
  const tempSchedules = useMemo(() => {
    return createDummyPtPScheduleData(condition);
  }, [condition]);
  const columnHelper = createColumnHelper<PtPScheduleType>();
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState({});

  const columns = [
    columnHelper.display({
      id: "select",
      header: "",
      cell: (info) => {
        return (
          <MdRadio
            name="schedule"
            className="ml-2"
            checked={info.row.getIsSelected()}
          />
        );
      },
      size: 48,
    }),
    columnHelper.accessor("berthingDate", {
      header: () => (
        <span className="whitespace-nowrap">Cargo Closing Time</span>
      ),
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd"),
    }),
    columnHelper.accessor("origin", {
      header: "Loading Port",
      cell: (info) => info.getValue().code,
    }),
    columnHelper.accessor("departureDate", {
      header: "Departure Date",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd"),
    }),
    columnHelper.accessor("destination", {
      header: "Discharge Port",
      cell: (info) => info.getValue().code,
    }),
    columnHelper.accessor("arrivalDate", {
      header: "Arrival Date",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd"),
    }),
    columnHelper.accessor("serviceLane", {
      header: "Lane",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("vesselInfo", {
      header: "Vessel",
      cell: (info) => (
        <span className="whitespace-nowrap">{info.getValue().vesselName}</span>
      ),
    }),
    columnHelper.display({
      header: "Oceans",
      id: "oceans",
      cell: (info) => 0,
    }),
    columnHelper.accessor("transitTime", {
      header: "T/T",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    columns,
    data: tempSchedules,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setSelectedScheduleIndex,
    state: {
      rowSelection: selectedScheduleIndex,
    },
    enableMultiRowSelection: false,
  });

  useEffect(() => {
    if (!open) {
      table.setRowSelection({});
    }
  }, [open, table]);

  return (
    <Portal selector="#main-container">
      <MdDialog
        open={open}
        closed={() => {
          handleOpen(false);
        }}
        className="min-w-[1280px]"
      >
        <div slot="headline">Search Schedule</div>
        <div slot="content">
          <BasicTable table={table} />
        </div>
        <div slot="actions">
          <MdTextButton
            onClick={(e) => {
              const DialogElement =
                e.currentTarget.parentElement?.parentElement;
              (DialogElement as any).close();
            }}
          >
            Close
          </MdTextButton>
          <MdFilledButton
            disabled={!table.getSelectedRowModel().rows.length}
            onClick={() => {
              const selection = table.getSelectedRowModel().rows[0].original;
              handleOpen(false);
              onSelection(selection);
            }}
          >
            Apply
          </MdFilledButton>
        </div>
      </MdDialog>
    </Portal>
  );
}
