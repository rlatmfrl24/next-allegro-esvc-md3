import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import { createDummaryVesselSchedules } from "@/app/main/schedule/util";
import { BookingStatusTableProps, VesselInfoType } from "@/app/util/typeDef";
import { useState } from "react";

const VesselInfoCell = (row: BookingStatusTableProps) => {
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);
  const cellValue = row.vessel;

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
        className="text-onSurfaceVariant underline cursor-pointer p-2 whitespace-nowrap"
      >
        {cellValue.vesselName}
      </MdTypography>
      <Portal selector="#main-container">
        <VesselScheduleDialog
          open={isVesselScheduleDialogOpen}
          handleOpen={setIsVesselScheduleDialogOpen}
          vesselInfo={cellValue as VesselInfoType}
          vesselSchedules={createDummaryVesselSchedules()}
        />
      </Portal>
    </div>
  );
};

export default VesselInfoCell;
