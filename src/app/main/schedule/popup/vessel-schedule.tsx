import { MdDialog, MdTextButton } from "@/app/util/md3";
import { VesselInfoType, VesselScheduleType } from "@/app/util/typeDef";
import { VesselScheduleResult } from "../vessel/search-result";

export default function VesselScheduleDialog({
  open,
  handleOpen,
  vesselInfo,
  vesselSchedules,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  vesselInfo: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
}) {
  return (
    <div className="z-50">
      <MdDialog
        open={open}
        closed={() => {
          handleOpen(false);
        }}
        className="min-w-[1280px]"
      >
        <div slot="headline">Vessel Schedule</div>
        <div slot="content">
          <VesselScheduleResult
            vesselData={vesselInfo}
            vesselSchedules={vesselSchedules}
          />
        </div>
        <div slot="actions">
          <MdTextButton
            onClick={() => {
              handleOpen(false);
            }}
          >
            Close
          </MdTextButton>
        </div>
      </MdDialog>
    </div>
  );
}
