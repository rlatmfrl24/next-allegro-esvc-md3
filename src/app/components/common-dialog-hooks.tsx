import { useState } from "react";

import Portal from "@/app/components/portal";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import { createDummyVesselSchedules } from "@/app/main/schedule/util";
import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";

import PlaceInformationDialog from "../main/schedule/popup/place-information";
import VesselInformationDialog from "../main/schedule/popup/vessel-information";

export const usePlaceInfoDialog = () => {
  const [isPlaceInfoDialogOpen, setIsPlaceInfoDialogOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState({} as PlaceInformationType);

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <PlaceInformationDialog
          open={isPlaceInfoDialogOpen}
          handleOpen={setIsPlaceInfoDialogOpen}
          data={currentPlace}
        />
      </Portal>
    );
  }

  return {
    renderDialog,
    setCurrentPlace,
    setIsPlaceInfoDialogOpen,
  };
};

export const useVesselInfoDialog = () => {
  const [isVesselInfoDialogOpen, setIsVesselInfoDialogOpen] = useState(false);
  const [currentVessel, setCurrentVessel] = useState<VesselInfoType>(
    {} as VesselInfoType
  );

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <VesselInformationDialog
          open={isVesselInfoDialogOpen}
          handleOpen={setIsVesselInfoDialogOpen}
          data={currentVessel}
        />
      </Portal>
    );
  }

  return {
    renderDialog,
    setCurrentVessel,
    setIsVesselInfoDialogOpen,
  };
};

export const useVesselScheduleDialog = () => {
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
