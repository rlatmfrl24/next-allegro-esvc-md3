import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import { createDummyVesselSchedules } from "@/app/main/schedule/util";
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
          vesselSchedules={createDummyVesselSchedules()}
        />
      </Portal>
    </div>
  );
};

export const useVesselInfoCell = ({
  initialVessel,
}: {
  initialVessel?: VesselInfoType;
}) => {
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);
  const [currentVessel, setCurrentVessel] = useState<VesselInfoType>(
    initialVessel || ({} as VesselInfoType)
  );

  function renderDialog() {
    return (
      <VesselScheduleDialog
        open={isVesselScheduleDialogOpen}
        handleOpen={setIsVesselScheduleDialogOpen}
        vesselInfo={currentVessel}
        vesselSchedules={createDummyVesselSchedules()}
      />
      // <Portal selector="#main-container">
      // </Portal>
    );
  }

  return {
    renderDialog,
    currentVessel,
    setCurrentVessel,
    setIsVesselScheduleDialogOpen,
  };
};

export default VesselInfoCell;
