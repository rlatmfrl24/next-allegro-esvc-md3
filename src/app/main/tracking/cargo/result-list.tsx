import { DateTime } from "luxon";
import { useMemo, useState } from "react";

import ActualDateIcon from "@/../public/icon_actual_schedule.svg";
import EstimatedDateIcon from "@/../public/icon_estimate_schedule.svg";
import TransitPortIcon from "@/../public/icon_transit_port.svg";
import TransitShipIcon from "@/../public/icon_transit_ship.svg";
import TransitTrainIcon from "@/../public/icon_transit_train.svg";
import TransitTruckIcon from "@/../public/icon_transit_truck.svg";
import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { MdIconButton } from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import {
  CargoTrackingProps,
  TrackingStatus,
  TransitType,
} from "@/app/util/typeDef/tracking";
import {
  Favorite,
  FavoriteBorder,
  InfoOutlined,
  Place,
} from "@mui/icons-material";

import { DividerComponent } from "../../booking/information/components/base";
import PlaceInformationDialog from "../../schedule/popup/place-information";
import {
  createDummyCargoTrackingData,
  getLastLocation,
  getLastLocationTime,
  getStatusText,
  getWeightText,
} from "./util";

export default function TrackingDataList() {
  const tempData: CargoTrackingProps[] = useMemo(() => {
    return Array.from({ length: 10 }, () => createDummyCargoTrackingData());
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
  const [currentPlaceInformation, setCurrentPlaceInformation] =
    useState<PlaceInformationType>();

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
      </Portal>
      <div
        className="px-6 py-4 bg-surface border border-outlineVariant rounded-lg flex relative"
        onClick={() => {
          setIsDetailOpen(!isDetailOpen);
        }}
      >
        <MdIconButton
          className={`absolute right-4 top-4  rounded-full ${
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
        <div className="flex flex-col pr-4 mr-4 border-r border-dotted border-outlineVariant w-60">
          <MdTypography variant="label" size="small" className="text-outline">
            BKG No.
          </MdTypography>
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-onSurface"
          >
            {data.bookingNumber}
          </MdTypography>
        </div>
        <div className="flex flex-col border-r border-dotted border-outlineVariant mr-4 w-80">
          <MdTypography variant="label" size="small" className="text-outline">
            Container No.
          </MdTypography>
          <div className="flex items-center gap-2">
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-onSurface"
            >
              {data.contaienrNumber}
            </MdTypography>
            <DividerComponent orientation="vertical" className="h-4" />
            <MdTypography
              variant="label"
              size="medium"
              className="text-onSurface"
            >
              {data.containerSize + `'` + data.containerType}
            </MdTypography>
          </div>
          <MdTypography variant="label" size="medium" className="text-outline">
            {getStatusText(data.trackingStatus)}
          </MdTypography>
          <MdTypography
            variant="label"
            size="medium"
            className="flex items-center mt-4"
          >
            <Place className="text-primary" fontSize="small" />
            {getLastLocation(data).yardName}
          </MdTypography>
          <MdTypography variant="body" size="small" className="text-outline">
            {getLastLocationTime(data).toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        </div>
        <div className="flex-1 grid grid-cols-4">
          <div aria-label="place-status"></div>
          <div aria-label="place-status" className="pl-2 flex items-end h-6">
            {data.trackingStatus === TrackingStatus.ArrivedAtPOL && (
              <TransitPortIcon />
            )}
          </div>
          <div aria-label="place-status" className="pl-2 flex items-end h-6">
            {data.trackingStatus === TrackingStatus.ArrivedAtPOD && (
              <TransitPortIcon />
            )}
          </div>
          <div aria-label="place-status" className="pl-2 flex items-end h-6">
            {data.trackingStatus === TrackingStatus.ArrivedAtDEL && (
              <TransitPortIcon />
            )}
          </div>
          <div className="flex-1 flex justify-end items-end h-6">
            <MdTypography
              variant="label"
              size="medium"
              className={`text-white bg-primary w-fit px-2 py-0.5 rounded-lg`}
            >
              POR
            </MdTypography>
            <LineBetween
              startPosition="por"
              trackingStatus={data.trackingStatus}
              transitType={data.transitType}
            />
          </div>
          <div className="flex-1 flex justify-end items-end h-6">
            <MdTypography
              variant="label"
              size="medium"
              className={`w-fit px-2 py-0.5 rounded-lg ${
                data.trackingStatus === TrackingStatus.Departed
                  ? "bg-surfaceContainerHigh text-onSurface"
                  : "bg-primary text-white"
              }`}
            >
              POL
            </MdTypography>
            <LineBetween
              startPosition="pol"
              trackingStatus={data.trackingStatus}
              transitType={data.transitType}
            />
          </div>
          <div className="flex-1 flex justify-end items-end h-6">
            <MdTypography
              variant="label"
              size="medium"
              className={`w-fit px-2 py-0.5 rounded-lg ${
                data.trackingStatus === TrackingStatus.Departed ||
                data.trackingStatus === TrackingStatus.ArrivedAtPOL ||
                data.trackingStatus === TrackingStatus.TransitToPOD
                  ? "bg-surfaceContainerHigh text-onSurface"
                  : "bg-primary text-white"
              }`}
            >
              POD
            </MdTypography>
            <LineBetween
              startPosition="pod"
              trackingStatus={data.trackingStatus}
              transitType={data.transitType}
            />
          </div>
          <div className="flex-1 flex items-end h-6">
            <MdTypography
              variant="label"
              size="medium"
              className={`w-fit px-2 py-0.5 rounded-lg ${
                data.trackingStatus !== TrackingStatus.ArrivedAtDEL
                  ? "bg-surfaceContainerHigh text-onSurface"
                  : "bg-primary text-white"
              }`}
            >
              DEL
            </MdTypography>
          </div>
          <div className="pt-4">
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-balance pr-2 self-start"
            >
              {data.por.yardName}
            </MdTypography>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline"
            >
              {data.porTime.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
          </div>
          <div className="pt-4">
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-balance pr-2 self-start"
            >
              {data.pol.yardName}
            </MdTypography>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline"
            >
              {data.polTime.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
          </div>
          <div className="pt-4">
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-balance pr-2 self-start"
            >
              {data.pod.yardName}
            </MdTypography>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline"
            >
              {data.podTime.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
          </div>
          <div className="pt-4">
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-balance pr-2 self-start"
            >
              {data.del.yardName}
            </MdTypography>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline"
            >
              {data.delTime.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
          </div>
        </div>
      </div>
      {isDetailOpen && (
        <div className="bg-surfaceContainerLow border border-outlineVariant rounded-lg p-4">
          <div className="border border-outlineVariant rounded-lg flex flex-col overflow-hidden">
            <div className="h-2 bg-secondaryContainer"></div>
            <div className="px-6 py-4 bg-surfaceContainerLowest flex">
              <div className="w-[460px] border-r border-dotted pr-4 mr-4">
                <DetailTitle title="Sailing Info" className="mb-4" />
                <div className="flex bg-surfaceContainerLow rounded-lg justify-center gap-6 py-14">
                  <div className="text-right flex-1">
                    <MdTypography
                      variant="headline"
                      size="small"
                      className="text-primary"
                    >
                      {data.pol.code}
                    </MdTypography>
                    <MdTypography
                      variant="body"
                      size="small"
                      className="text-outline"
                    >
                      {data.pol.yardName}
                    </MdTypography>
                  </div>
                  <div className="flex w-fit h-fit items-center gap-4 pt-1">
                    <DividerComponent className="w-8 min-w-8 border-b border-b-primary border-dotted" />
                    <div>
                      <TransitShipIcon />
                    </div>
                    <DividerComponent className="w-8 min-w-8 border-b border-b-primary border-dotted" />
                  </div>
                  <div className="flex-1">
                    <MdTypography
                      variant="headline"
                      size="small"
                      className="text-primary"
                    >
                      {data.pod.code}
                    </MdTypography>
                    <MdTypography
                      variant="body"
                      size="small"
                      className="text-outline"
                    >
                      {data.pod.yardName}
                    </MdTypography>
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 mt-4">
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline"
                  >
                    Seal No.
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-onSurface"
                  >
                    {data.detailInfo.cargoSailingInfo.sealNumber}
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline"
                  >
                    Weight
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-onSurface"
                  >
                    {getWeightText(data.detailInfo.cargoSailingInfo.weight)}{" "}
                    <span className="text-outline">
                      {data.detailInfo.cargoSailingInfo.weightUnit}
                    </span>
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline"
                  >
                    Vessel
                  </MdTypography>
                  <div className="flex flex-col gap-4">
                    {data.detailInfo.cargoSailingInfo.vessels.map(
                      (vessel, index) => (
                        <VesselInfoCell key={index} {...vessel} />
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <DetailTitle title="Cargo Detail" />
                  <InfoOutlined
                    sx={{
                      fontSize: "16px",
                    }}
                    className="text-outline"
                  />
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr]">
                  {data.detailInfo.cargoDetail.map((detail, index) => (
                    <>
                      <MdTypography
                        variant="body"
                        size="medium"
                        className={`text-onSurface flex h-full gap-2 p-2 ${
                          index === data.detailInfo.cargoDetail.length - 1
                            ? ""
                            : "border-b border-b-outlineVariant"
                        }`}
                      >
                        {detail.description}
                      </MdTypography>
                      <MdTypography
                        variant="body"
                        size="medium"
                        className={`text-onSurface flex h-full gap-2 p-2  ${
                          index === data.detailInfo.cargoDetail.length - 1
                            ? ""
                            : "border-b border-b-outlineVariant"
                        }`}
                      >
                        <span className="pt-0.5">
                          {detail.date > DateTime.now() ? (
                            <EstimatedDateIcon />
                          ) : (
                            <ActualDateIcon />
                          )}
                        </span>
                        {detail.date.toFormat("yyyy-MM-dd HH:mm")}
                      </MdTypography>
                      <MdTypography
                        variant="body"
                        size="medium"
                        className={`text-onSurface flex h-full gap-2 p-2 underline cursor-pointer ${
                          index === data.detailInfo.cargoDetail.length - 1
                            ? ""
                            : "border-b border-b-outlineVariant"
                        }`}
                        onClick={() => {
                          setCurrentPlaceInformation(detail.location);
                          setIsPlaceInformationDialogOpen(true);
                        }}
                      >
                        {detail.location.yardName}
                      </MdTypography>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LineBetween = ({
  startPosition,
  trackingStatus,
  transitType,
}: {
  startPosition: "por" | "pol" | "pod";
  trackingStatus: TrackingStatus;
  transitType: TransitType;
}) => {
  switch (startPosition) {
    case "por":
      switch (trackingStatus) {
        case TrackingStatus.Departed:
          return (
            <div className="flex flex-1 relative">
              <div className="flex-1 border-t-4 border-primary mb-2"></div>
              <div className="flex-1 border-t-4 border-dashed border-outlineVariant mb-2"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 bg-surface px-1 py-1">
                {
                  {
                    [TransitType.Truck]: <TransitTruckIcon />,
                    [TransitType.Train]: <TransitTrainIcon />,
                    [TransitType.Ship]: <TransitShipIcon />,
                  }[transitType]
                }
              </div>
            </div>
          );
        default:
          return <div className="flex-1 border-t-4 border-primary mb-2"></div>;
      }
    case "pol":
      switch (trackingStatus) {
        case TrackingStatus.Departed:
        case TrackingStatus.ArrivedAtPOL:
          return (
            <div className="flex-1 mb-2 border-t-4 border-dashed border-outlineVariant"></div>
          );
        case TrackingStatus.TransitToPOD:
          return (
            <div className="flex flex-1 relative">
              <div className="flex-1 border-t-4 border-primary mb-2"></div>
              <div className="flex-1 border-t-4 border-dashed border-outlineVariant mb-2"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 bg-surface px-1 py-1">
                {
                  {
                    [TransitType.Truck]: <TransitTruckIcon />,
                    [TransitType.Train]: <TransitTrainIcon />,
                    [TransitType.Ship]: <TransitShipIcon />,
                  }[transitType]
                }
              </div>
            </div>
          );
        default:
          return <div className="flex-1 border-t-4 border-primary mb-2"></div>;
      }
    case "pod":
      switch (trackingStatus) {
        case TrackingStatus.Departed:
        case TrackingStatus.ArrivedAtPOL:
        case TrackingStatus.TransitToPOD:
        case TrackingStatus.ArrivedAtPOD:
          return (
            <div className="flex-1 mb-2 border-t-4 border-dashed border-outlineVariant"></div>
          );
        case TrackingStatus.TransitToDEL:
          return (
            <div className="flex flex-1 relative">
              <div className="flex-1 border-t-4 border-primary mb-2"></div>
              <div className="flex-1 border-t-4 border-dashed border-outlineVariant mb-2"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 bg-surface px-1 py-1">
                {
                  {
                    [TransitType.Truck]: <TransitTruckIcon />,
                    [TransitType.Train]: <TransitTrainIcon />,
                    [TransitType.Ship]: <TransitShipIcon />,
                  }[transitType]
                }
              </div>
            </div>
          );
        case TrackingStatus.ArrivedAtDEL:
          return <div className="flex-1 border-t-4 border-primary mb-2"></div>;
      }
    default:
      return <div></div>;
  }
};
