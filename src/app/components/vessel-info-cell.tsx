import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import { createDummaryVesselSchedules } from "@/app/main/schedule/util";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { useState } from "react";

const VesselInfoCell = (vessel: VesselInfoType) => {
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsVesselScheduleDialogOpen(true);
      }}
    >
      <MdTypography
        variant="body"
        size="medium"
        className="text-onSurfaceVariant underline cursor-pointer whitespace-nowrap"
      >
        {vessel.vesselName}
      </MdTypography>
      <Portal selector="#main-container">
        <VesselScheduleDialog
          open={isVesselScheduleDialogOpen}
          handleOpen={setIsVesselScheduleDialogOpen}
          vesselInfo={vessel}
          vesselSchedules={createDummaryVesselSchedules()}
        />
      </Portal>
    </div>
  );
};

export default VesselInfoCell;
