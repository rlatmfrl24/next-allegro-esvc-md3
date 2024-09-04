import { useMemo, useState } from "react";

import Portal from "@/app/components/portal";
import { MdIconButton } from "@/app/util/md3";
import {
  PlaceInformationType,
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { CargoTrackingProps } from "@/app/util/typeDef/tracking";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import PlaceInformationDialog from "../../schedule/popup/place-information";
import VesselInformationDialog from "../../schedule/popup/vessel-information";
import VesselScheduleDialog from "../../schedule/popup/vessel-schedule";
import { BasicTrackingInfo } from "./components/basic-tracking-info";
import { CargoDetailInfo } from "./components/cargo-detail-info";
import { SailingInfo } from "./components/sailing-info";
import { TrackingProcessInfo } from "./components/tracking-process-info";
import { createDummyCargoTrackingData } from "./util";

export default function TrackingDataList() {
  const tempData: CargoTrackingProps[] = useMemo(() => {
    return Array.from({ length: 90 }, () => createDummyCargoTrackingData());
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {tempData.map((data, index) => (
        <TrackingDataCard key={index} data={data} />
      ))}
    </div>
  );
}

const TrackingDataCard = ({ data }: { data: CargoTrackingProps }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPlaceInformationDialogOpen, setIsPlaceInformationDialogOpen] =
    useState(false);
  const [isVesselInformationDialogOpen, setIsVesselInformationDialogOpen] =
    useState(false);
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);

  const [currentPlaceInformation, setCurrentPlaceInformation] =
    useState<PlaceInformationType>();
  const [currentVesselInformation, setCurrentVesselInformation] =
    useState<VesselInfoType>();
  const [currentVesselSchedule, setCurrentVesselSchedule] =
    useState<VesselScheduleType[]>();

  return (
    <div>
      <Portal selector="#main-container">
        {currentPlaceInformation && (
          <PlaceInformationDialog
            open={isPlaceInformationDialogOpen}
            handleOpen={setIsPlaceInformationDialogOpen}
            data={currentPlaceInformation}
          />
        )}
        {currentVesselInformation && (
          <VesselInformationDialog
            open={isVesselInformationDialogOpen}
            handleOpen={setIsVesselInformationDialogOpen}
            data={currentVesselInformation}
          />
        )}
        {currentVesselSchedule && currentVesselInformation && (
          <VesselScheduleDialog
            open={isVesselScheduleDialogOpen}
            handleOpen={setIsVesselScheduleDialogOpen}
            vesselInfo={currentVesselInformation}
            vesselSchedules={currentVesselSchedule}
          />
        )}
      </Portal>
      <div
        className="px-6 py-4 bg-surfaceContainerLowest border border-outlineVariant rounded-lg flex relative"
        onClick={() => {
          setIsDetailOpen(!isDetailOpen);
        }}
      >
        <MdIconButton
          className={`absolute right-4 top-4 rounded-full ${
            data.isFavorite
              ? "bg-secondaryContainer"
              : "bg-surfaceContainerHighest"
          }`}
        >
          {data.isFavorite ? (
            <Favorite className="text-onSurface" fontSize="small" />
          ) : (
            <FavoriteBorder className="text-onSurface" fontSize="small" />
          )}
        </MdIconButton>
        <BasicTrackingInfo data={data} />
        <TrackingProcessInfo data={data} />
      </div>
      {isDetailOpen && (
        <div className="bg-surfaceContainerLow border border-outlineVariant rounded-lg p-4">
          <div className="border border-outlineVariant rounded-lg flex flex-col overflow-hidden">
            <div className="h-2 bg-secondaryContainer"></div>
            <div className="px-6 py-4 bg-surfaceContainerLowest flex">
              <SailingInfo
                data={data}
                callOpenVesselInformationDialog={(vesselInfo) => {
                  setCurrentVesselInformation(vesselInfo);
                  setIsVesselInformationDialogOpen(true);
                }}
                callOpenVesselScheduleDialog={(vesselInfo, schedules) => {
                  setCurrentVesselInformation(vesselInfo);
                  setCurrentVesselSchedule(schedules);
                  setIsVesselScheduleDialogOpen(true);
                }}
              />
              <div className="flex-1 flex flex-col">
                <CargoDetailInfo
                  data={data}
                  callOpenPlaceInformationDialog={(data) => {
                    setCurrentPlaceInformation(data);
                    setIsPlaceInformationDialogOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
