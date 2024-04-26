import Portal from "@/app/components/portal";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import { createDummyVesselSchedules } from "@/app/main/schedule/util";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { useState } from "react";

export const useVesselInfoCell = () => {
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);
  const [currentVessel, setCurrentVessel] = useState<VesselInfoType>(
    {} as VesselInfoType
  );

  function renderDialog() {
    return (
      currentVessel && (
        <Portal selector="#main-container">
          <VesselScheduleDialog
            open={isVesselScheduleDialogOpen}
            handleOpen={setIsVesselScheduleDialogOpen}
            vesselInfo={currentVessel}
            vesselSchedules={createDummyVesselSchedules()}
          />
        </Portal>
      )
    );
  }

  return {
    renderDialog,
    currentVessel,
    setCurrentVessel,
    setIsVesselScheduleDialogOpen,
  };
};
