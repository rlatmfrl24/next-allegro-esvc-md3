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
import { createDummyCargoTrackingData } from "./util";

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
          <div className="grid grid-cols-[56px_1fr] w-fit mt-2">
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline"
            >
              Seal No.
            </MdTypography>
            <MdTypography
              variant="label"
              size="medium"
              className="text-onSurfaceVariant"
            >
              {data.sealNumber}
            </MdTypography>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline"
            >
              Weight
            </MdTypography>
            <div className="flex gap-1">
              <MdTypography
                tag="span"
                variant="label"
                size="medium"
                className="text-onSurfaceVariant"
              >
                {data.weight.toFixed(3)}
              </MdTypography>
              <MdTypography
                tag="span"
                variant="label"
                size="medium"
                className="text-outline"
              >
                {data.weightUnit}
              </MdTypography>
            </div>
          </div>
          <MdTypography
            variant="label"
            size="medium"
            className="flex items-center mt-4 gap-1"
          >
            <Place className="text-primary" fontSize="small" />
            {data.lastPort.yardName}
          </MdTypography>
          <MdTypography
            variant="body"
            size="small"
            className="text-outline mt-1 "
          >
            {data.lastPortTime.toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        </div>
      </div>
      {isDetailOpen && (
        <div className="bg-surfaceContainerLow border border-outlineVariant rounded-lg p-4">
          <div className="border border-outlineVariant rounded-lg flex flex-col overflow-hidden">
            <div className="h-2 bg-secondaryContainer"></div>
            <div className="px-6 py-4 bg-surfaceContainerLowest flex">
              <div className="w-[460px] border-r border-dotted pr-4 mr-4">
                <DetailTitle title="Sailing Info" className="mb-4" />
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
