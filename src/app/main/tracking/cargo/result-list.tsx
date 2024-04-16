import { useMemo, useState } from "react";

import VesselIcon from "@/../public/icon_vessel.svg";
import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import {
  PlaceInformationType,
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { CargoTrackingProps } from "@/app/util/typeDef/tracking";
import {
  ArrowDropDown,
  Favorite,
  FavoriteBorder,
  FmdGood,
  InfoOutlined,
} from "@mui/icons-material";

import { DividerComponent } from "../../booking/information/components/base";
import PlaceInformationDialog from "../../schedule/popup/place-information";
import { BasicTrackingInfo } from "./components/basic-tracking-info";
import { CargoDetailInfo } from "./components/cargo-detail-info";
import { TrackingProcessInfo } from "./components/tracking-process-info";
import { createDummyCargoTrackingData } from "./util";
import VesselInformationDialog from "../../schedule/popup/vessel-information";
import { createDummyVesselSchedules } from "../../schedule/util";
import VesselScheduleDialog from "../../schedule/popup/vessel-schedule";

export default function TrackingDataList() {
  const tempData: CargoTrackingProps[] = useMemo(() => {
    return Array.from({ length: 90 }, () => createDummyCargoTrackingData());
  }, []);

  return (
    <div className="flex flex-col gap-10">
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
        className="px-6 py-4 bg-surface border border-outlineVariant rounded-lg flex relative"
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
              <div className="w-[760px] border-r border-dotted pr-4 mr-4">
                <DetailTitle title="Sailing Info" className="mb-4" />
                <div className="flex flex-col">
                  {data.detailInfo.cargoSailingInfo.length < 2 ? (
                    <EmptySailingInfo />
                  ) : (
                    <>
                      {data.detailInfo.cargoSailingInfo.map(
                        (sailingInfo, index) => (
                          <div key={index}>
                            <div className="flex justify-between">
                              <div className="flex items-center gap-6">
                                <FmdGood className="text-primary" />
                                <MdTypography
                                  variant="body"
                                  size="large"
                                  className="text-primary"
                                  prominent
                                >
                                  {sailingInfo.port.yardName}
                                </MdTypography>
                              </div>
                              <MdTypography
                                variant="body"
                                size="medium"
                                className="text-outline"
                              >
                                {sailingInfo.time.toFormat("yyyy-MM-dd HH:mm")}
                              </MdTypography>
                            </div>
                            {index !==
                              data.detailInfo.cargoSailingInfo.length - 1 && (
                              <>
                                {data.detailInfo.cargoSailingVessel[index] && (
                                  <div className="flex">
                                    <div className="relative w-12 py-1">
                                      <ArrowDropDown className="absolute top-1/2 -translate-y-1/2 bg-surfaceContainerLowest text-primary" />
                                      <DividerComponent
                                        orientation="vertical"
                                        className="h-full ml-[11px] border-dotted"
                                      />
                                    </div>
                                    <div className="flex items-center bg-secondaryContainer w-full px-8 py-2 rounded-2xl my-12">
                                      <div className="w-10 h-10 flex items-center justify-center text-primary">
                                        <VesselIcon />
                                      </div>
                                      <MdTypography
                                        variant="body"
                                        size="large"
                                        className="text-onSurfaceVariant underline cursor-pointer"
                                        onClick={() => {
                                          setCurrentVesselSchedule(
                                            createDummyVesselSchedules()
                                          );
                                          setCurrentVesselInformation(
                                            data.detailInfo.cargoSailingVessel[
                                              index
                                            ]
                                          );
                                          setIsVesselScheduleDialogOpen(true);
                                        }}
                                      >
                                        {
                                          data.detailInfo.cargoSailingVessel[
                                            index
                                          ].vesselName
                                        }
                                      </MdTypography>
                                      <div className="flex-1"></div>
                                      <MdIconButton
                                        onClick={() => {
                                          setCurrentVesselInformation(
                                            data.detailInfo.cargoSailingVessel[
                                              index
                                            ]
                                          );
                                          setIsVesselInformationDialogOpen(
                                            true
                                          );
                                        }}
                                      >
                                        <MdIcon>
                                          <InfoOutlined />
                                        </MdIcon>
                                      </MdIconButton>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
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

const EmptySailingInfo = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <FmdGood className="text-primary" />
          <MdTypography
            variant="body"
            size="large"
            className="text-primary"
            prominent
          >
            Not Assigned
          </MdTypography>
        </div>
      </div>
      <div className="flex">
        <div className="relative w-12 py-1">
          <ArrowDropDown className="absolute top-1/2 -translate-y-1/2 bg-surfaceContainerLowest text-primary" />
          <DividerComponent
            orientation="vertical"
            className="h-full ml-[11px] border-dotted"
          />
        </div>
        <div className="flex items-center bg-secondaryContainer w-full px-8 py-2 rounded-2xl my-12">
          <div className="w-10 h-10 flex items-center justify-center text-primary">
            <VesselIcon />
          </div>
          <MdTypography
            variant="body"
            size="large"
            className="text-onSurfaceVariant flex-1"
          >
            Not Assigned
          </MdTypography>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <FmdGood className="text-primary" />
        <MdTypography
          variant="body"
          size="large"
          className="text-primary"
          prominent
        >
          Not Assigned
        </MdTypography>
      </div>
    </div>
  );
};
