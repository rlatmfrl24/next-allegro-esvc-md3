import Portal from "@/app/components/portal";
import { createDummyPtPScheduleData } from "../../../schedule/util";
import {
  MdDialog,
  MdFilledButton,
  MdFilterChip,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { createColumnHelper } from "@tanstack/react-table";
import { useSimpleTable } from "@/app/components/table/simple-table";
import { useMemo, useState } from "react";
import {
  PtPScheduleType,
  PtPSearchConditionType,
} from "@/app/util/typeDef/schedule";
import { FilterChipMenu } from "@/app/components/filter-chip-menu";
import { faker } from "@faker-js/faker";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { MdTypography } from "@/app/components/typography";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";

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
  const tempPorts = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) =>
      faker.location.city().toUpperCase()
    );
  }, []);
  const columnHelper = createColumnHelper<PtPScheduleType>();
  const [selectedSchedule, setSelectedSchedule] = useState<PtPScheduleType>(
    {} as PtPScheduleType
  );
  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

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
      size: 200,
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
      size: 200,
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

  const { renderTable } = useSimpleTable({
    data: tempSchedules,
    columns,
    getSelectionRows: (rows) => {
      rows.length > 0 && setSelectedSchedule(rows[0]);
    },
  });

  return (
    <Portal selector="#main-container">
      {renderDialog()}
      <MdDialog
        open={open}
        closed={() => {
          handleOpen(false);
        }}
        className="min-w-[1280px]"
      >
        <div slot="headline">Search Schedule</div>
        <div slot="content" className="flex flex-col gap-4">
          <div className="flex relative gap-4 items-center">
            <NAOutlinedAutoComplete
              className="flex-1"
              itemList={tempPorts}
              label="Origin"
            />
            <NAOutlinedAutoComplete
              className="flex-1"
              itemList={tempPorts}
              label="Destination"
            />
            <NAOutlinedListBox
              label="Search On"
              defaultValue={"All"}
              options={["All", "Departure", "Arrival"]}
            />
            <MdOutlinedButton autoFocus>Search</MdOutlinedButton>
          </div>
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
          {renderTable()}
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
            onClick={() => {
              onSelection(selectedSchedule);
              handleOpen(false);
            }}
          >
            Apply
          </MdFilledButton>
        </div>
      </MdDialog>
    </Portal>
  );
}
