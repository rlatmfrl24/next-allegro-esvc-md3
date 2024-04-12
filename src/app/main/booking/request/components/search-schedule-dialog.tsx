import Portal from "@/app/components/portal";
import { createDummyPtPScheduleData } from "../../../schedule/util";
import {
  MdDialog,
  MdFilledButton,
  MdFilterChip,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BasicTable } from "@/app/components/unused/basic-table";
import { useEffect, useMemo, useState } from "react";
import {
  PtPScheduleType,
  PtPSearchConditionType,
} from "@/app/util/typeDef/schedule";
import { FilterChipMenu } from "@/app/components/filter-chip-menu";
import { faker } from "@faker-js/faker";
import VesselInfoCell from "@/app/components/vessel-info-cell";

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
    columnHelper.accessor("origin.yardName", {
      header: "Departure",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("departureDate", {
      header: "ETD",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd HH:mm"),
    }),
    columnHelper.accessor("destination", {
      header: "Arrival",
      cell: (info) => info.getValue().yardName,
    }),
    columnHelper.accessor("arrivalDate", {
      header: "ETA",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd HH:mm"),
    }),
    columnHelper.accessor("vesselInfo", {
      header: "Vessel",
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
    }),
    columnHelper.accessor("serviceLane", {
      header: "Lane",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      header: "Transshipment",
      id: "transshipment",
      cell: (info) => {
        const ts = faker.number.int({
          min: 0,
          max: 3,
        });
        return ts === 0 ? "Direct" : `${ts} T/S`;
      },
    }),
    columnHelper.accessor("transitTime", {
      header: "Transit Time",
      cell: (info) => info.getValue() + " Days",
    }),
    columnHelper.accessor("berthingDate", {
      header: "Cargo Closing Time",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd HH:mm"),
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
        <div slot="content" className="flex flex-col gap-4">
          <div className="flex items-center gap-4 relative">
            <FilterChipMenu
              initialValue="Earliest Departure"
              options={[
                "Earliest Departure",
                "Earliest Arrival",
                "Fatest Transit Time",
              ]}
            />
            <MdFilterChip label="Direct Only" />
          </div>
          <BasicTable
            table={table}
            onRowSelction={(row) => {
              if (row.getIsSelected()) {
                return;
              } else {
                row.toggleSelected();
              }
            }}
          />
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
