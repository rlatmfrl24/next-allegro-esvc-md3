import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

import VesselIcon from "@/../public/icon_vessel.svg";
import { MdTypography } from "@/app/components/typography";
import {
  MdElevationButton,
  MdFilledButton,
  MdIcon,
  MdIconButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
  AccessTime,
  ArrowDropDown,
  FmdGood,
  FmdGoodOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  createDummyVesselSchedules,
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../util";
import CutOffTooltip from "./cut-off-tooltip";
import {
  PtPScheduleType,
  PlaceInformationType,
  CutOffDataType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
import { DetailTitle } from "@/app/components/title-components";
import {
  usePlaceInfoDialog,
  useVesselInfoDialog,
  useVesselScheduleDialog,
} from "@/app/components/common-dialog-hooks";
import { DividerComponent } from "@/app/components/divider";

export default function ListItem({
  item,
  onVesselScheduleClick,
  onPlaceInformationClick,
  onVesselInformationClick,
}: {
  item: PtPScheduleType;
  onVesselScheduleClick?: (vessel: VesselInfoType) => void;
  onPlaceInformationClick?: (place: PlaceInformationType) => void;
  onVesselInformationClick?: (vessel: VesselInfoType) => void;
}) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const cutoffData = useMemo(() => {
    return {
      documentation: item.departureDate.minus({ days: 1 }),
      EDI: item.departureDate.minus({ hours: 3 }),
      cargo: item.departureDate.minus({ hours: 6 }),
    };
  }, [item.departureDate]);

  const detailInfo = useMemo(() => {
    return {
      cyInfo: {
        loadingTerminal: faker.airline.airport().name,
        customNo: faker.string.numeric(10),
        import: faker.phone.number(),
      },
      csfInfo: {
        companyName: faker.company.name(),
        title: faker.person.fullName(),
        phone: faker.phone.number(),
      },
    };
  }, []);

  const tempVesselInfo = useMemo(() => {
    return createDummyVesselInformation();
  }, []);

  useEffect(() => {
    setIsDetailOpen(false);
  }, [item]);

  return (
    <div>
      <div className="relative border-outlineVariant border rounded-xl p-6 flex gap-12">
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-primary flex items-center relative gap-4">
            <LocationOnIcon />
            <div className="flex-1 border-dashed h-px border border-outlineVariant"></div>
            <VesselIcon />
            <div className="flex-1 border-dashed h-px border border-outlineVariant"></div>
            <LocationOnIcon />
            <ArrowForwardIosIcon
              sx={{
                fontSize: "16px",
              }}
              className="absolute right-7 text-outlineVariant"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-1 flex-col items-start gap-1">
              <MdTypography variant="title" size="medium">
                <span
                  className="border-b border-onSurface uppercase cursor-pointer"
                  onClick={() => {
                    onPlaceInformationClick?.(item.origin);
                  }}
                >
                  {item.origin.yardName}
                </span>
              </MdTypography>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline w-fit"
              >
                {item.departureDate.toFormat("yyyy-MM-dd")}
              </MdTypography>
              <CutOffTooltip data={cutoffData} />
            </div>
            <div className="flex flex-1 flex-col items-center gap-1">
              <MdTypography variant="title" size="medium">
                <span
                  className="border-b border-onSurface cursor-pointer"
                  onClick={() => {
                    onVesselScheduleClick?.(tempVesselInfo);
                  }}
                >
                  {item.vesselInfo.vesselName}
                </span>
              </MdTypography>
              <MdTypography variant="body" size="medium" className="flex">
                <span className="text-secondary font-semibold mr-2">
                  {item.serviceLane}
                </span>
                <span className="text-outline mr-1">Transit Time</span>
                <span className="text-secondary font-semibold mr-2">
                  {item.transitTime} Days
                </span>
                <MdTypography
                  variant="label"
                  size="medium"
                  className="px-2 py-0.5 bg-secondaryContainer rounded-lg"
                >
                  Direct
                </MdTypography>
              </MdTypography>
            </div>
            <div className="flex flex-1 flex-col items-end gap-1">
              <MdTypography variant="title" size="medium">
                <span
                  className="border-b border-onSurface uppercase cursor-pointer"
                  onClick={() => {
                    onPlaceInformationClick?.(item.destination);
                  }}
                >
                  {item.destination.yardName}
                </span>
              </MdTypography>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline w-fit"
              >
                {item.arrivalDate.toFormat("yyyy-MM-dd")}
              </MdTypography>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <MdFilledButton>Booking</MdFilledButton>
          <MdElevationButton
            onClick={() => {
              setIsDetailOpen(!isDetailOpen);
            }}
          >
            <div slot="icon">
              <ExpandMoreOutlinedIcon
                fontSize="small"
                className={
                  isDetailOpen
                    ? "transform rotate-180 transition-transform duration-300"
                    : "transform rotate-0 transition-transform duration-300"
                }
              />
            </div>
            Details
          </MdElevationButton>
        </div>
      </div>

      <>
        {isDetailOpen && (
          <div className="rounded-lg border border-outlineVariant py-6 px-4 bg-surfaceContainerLow">
            <div className="border border-outlineVariant bg-surfaceContainerLowest rounded-2xl overflow-hidden">
              <div className="h-2 bg-secondaryContainer"></div>
              <div className="px-6 py-4">
                <ItemDetail
                  item={item}
                  cutoffData={cutoffData}
                  detailInfo={detailInfo}
                  vesselInfo={tempVesselInfo}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

const BasicDetailItem = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div>
      <MdTypography variant="label" size="medium" className="text-outline">
        {title}
      </MdTypography>
      <MdTypography variant="title" size="medium" className="text-onSurface">
        {value}
      </MdTypography>
    </div>
  );
};

const VesselPortComponent = ({
  item,
  // time,
  eta,
  etd,
  cutOff,
  portState = "middle",
}: {
  item: PlaceInformationType;
  eta?: DateTime;
  etd?: DateTime;
  cutOff?: CutOffDataType;
  portState?: "origin" | "middle" | "destination";
}) => {
  const {
    renderDialog: renderPlaceDialog,
    setCurrentPlace,
    setIsPlaceInfoDialogOpen,
  } = usePlaceInfoDialog("#main-container");

  return (
    <div className="flex w-full">
      <div className="flex h-full items-start">
        {portState === "origin" || portState === "destination" ? (
          <FmdGood className="text-primary" />
        ) : (
          <FmdGoodOutlined className="text-primary" />
        )}
      </div>
      <div className="ml-6 flex-1">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-2 items-center">
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="text-primary"
            >
              {item.yardName.toUpperCase()}
            </MdTypography>
            <DividerComponent orientation="vertical" className="h-4" />
            {eta && (
              <>
                <MdTypography
                  variant="label"
                  size="medium"
                  className="bg-surfaceContainerHigh px-2 py-0.5 rounded-lg"
                >
                  ETD
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  {eta.toFormat("yyyy-MM-dd HH:mm") ?? ""}
                </MdTypography>
              </>
            )}
            {etd && (
              <>
                <MdTypography
                  variant="label"
                  size="medium"
                  className="bg-surfaceContainerHigh px-2 py-0.5 rounded-lg"
                >
                  ETA
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  {etd.toFormat("yyyy-MM-dd HH:mm")}
                </MdTypography>
              </>
            )}
          </div>
        </div>
        <div
          className="w-fit"
          onClick={() => {
            setCurrentPlace(item);
            setIsPlaceInfoDialogOpen(true);
          }}
        >
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurfaceVariant underline cursor-pointer"
          >
            {item.address}
          </MdTypography>
        </div>
        {portState === "origin" && (
          <div className="flex items-center text-primary mt-2">
            <AccessTime
              className="mr-0.5"
              sx={{
                fontSize: "16px",
              }}
            />
            <MdTypography
              variant="label"
              size="medium"
              prominent
              className="mr-4"
            >
              Cut Off
            </MdTypography>
            <div className="flex gap-6 mr-6">
              <div className="flex gap-2 items-center">
                <MdTypography
                  variant="label"
                  size="medium"
                  className="text-outline"
                >
                  Documentation
                </MdTypography>
                <MdTypography
                  variant="title"
                  size="small"
                  className="text-onSurface"
                >
                  {cutOff?.documentation.toFormat("yyyy-MM-dd HH:mm") ?? ""}
                </MdTypography>
              </div>
              <div className="flex gap-2 items-center">
                <MdTypography
                  variant="label"
                  size="medium"
                  className="text-outline"
                >
                  EDI
                </MdTypography>
                <MdTypography
                  variant="title"
                  size="small"
                  className="text-onSurface"
                >
                  {cutOff?.EDI.toFormat("yyyy-MM-dd HH:mm") ?? ""}
                </MdTypography>
              </div>
              <div className="flex gap-2 items-center">
                <MdTypography
                  variant="label"
                  size="medium"
                  className="text-outline"
                >
                  Cargo
                </MdTypography>
                <MdTypography
                  variant="title"
                  size="small"
                  className="text-onSurface"
                >
                  {cutOff?.cargo.toFormat("yyyy-MM-dd HH:mm") ?? ""}
                </MdTypography>
              </div>
            </div>
          </div>
        )}
      </div>
      {renderPlaceDialog()}
    </div>
  );
};

const VesselRouteComponent = ({
  tempVesselInfo,
  isFirst = false,
}: {
  tempVesselInfo: VesselInfoType;
  isFirst?: boolean;
}) => {
  const data = useMemo(() => {
    return {
      vesselLine: faker.airline.airplane().name,
      serviceLane: faker.string.alphanumeric(4).toUpperCase(),
      transitTime: faker.number.int({
        max: 10,
      }),
    };
  }, []);

  const {
    renderDialog,
    setCurrentVessel: setVesselForScheduleDialog,
    setIsVesselScheduleDialogOpen,
  } = useVesselScheduleDialog();
  const {
    renderDialog: renderVesselDialog,
    setCurrentVessel,
    setIsVesselInfoDialogOpen,
  } = useVesselInfoDialog();

  return (
    <div className="bg-inherit flex items-center relative">
      <div className="mr-6 bg-inherit z-10 text-primary">
        <ArrowDropDown />
      </div>
      <div
        className={`border-r-2 border-r-outlineVariant border-dotted absolute left-3  -translate-x-px ${
          isFirst ? "h-20 -translate-y-12" : "h-12 -translate-y-9"
        }`}
      ></div>
      <div className="border-r-2 border-r-outlineVariant border-dotted h-7 absolute left-3 translate-y-7 -translate-x-px"></div>
      <div className="bg-secondaryContainer rounded-2xl flex flex-1 px-4 py-1 gap-2 items-center">
        <MdIcon className="text-primary">
          <VesselIcon />
        </MdIcon>
        <div
          onClick={() => {
            setVesselForScheduleDialog(tempVesselInfo);
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-onSurfaceVariant cursor-pointer hover:underline"
          >
            {data.vesselLine}
          </MdTypography>
        </div>
        <MdIconButton
          onClick={() => {
            setCurrentVessel(tempVesselInfo);
            setIsVesselInfoDialogOpen(true);
          }}
        >
          <MdIcon>
            <InfoOutlined />
          </MdIcon>
        </MdIconButton>
        <div className="bg-onSecondary px-2 py-1 rounded-full ml-2">
          <MdTypography variant="label" size="small">
            {data.serviceLane}
          </MdTypography>
        </div>
        <DividerComponent orientation="vertical" className="h-4 mx-2" />
        <MdTypography variant="label" size="medium" className="text-outline">
          T/Time
        </MdTypography>
        <MdTypography variant="label" size="medium" prominent>
          {data.transitTime} Hours
        </MdTypography>
      </div>
      {renderDialog()}
      {renderVesselDialog()}
    </div>
  );
};

export const ItemDetail = ({
  item,
  cutoffData,
  detailInfo,
  vesselInfo,
}: {
  vesselInfo: VesselInfoType | undefined;
  item: PtPScheduleType;
  cutoffData: CutOffDataType;
  detailInfo: {
    cyInfo: {
      loadingTerminal: string;
      customNo: string;
      import: string;
    };
    csfInfo: {
      companyName: string;
      title: string;
      phone: string;
    };
  };
}) => {
  const middleRoutes = useMemo(() => {
    const portCount = faker.number.int({ min: 1, max: 3 });
    return (
      <>
        {Array.from({ length: portCount }).map((_, index) => {
          return (
            <>
              {vesselInfo && (
                <VesselRouteComponent
                  tempVesselInfo={vesselInfo}
                  isFirst={index === 0}
                />
              )}
              <VesselPortComponent
                item={createDummyPlaceInformation(faker.location.city())}
                eta={item.arrivalDate}
                etd={item.departureDate}
              />
            </>
          );
        })}
        {vesselInfo && <VesselRouteComponent tempVesselInfo={vesselInfo} />}
      </>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.arrivalDate, item.departureDate]);

  return (
    <div className="flex flex-col relative">
      <div className="absolute top-4 right-6 flex gap-2 px-4 py-2 bg-background rounded-2xl">
        <MdTypography variant="label" size="medium" className="text-outline">
          Total
        </MdTypography>
        <MdTypography variant="label" size="medium" prominent>
          {item.transitTime} Days
        </MdTypography>
        <MdTypography variant="label" size="medium" prominent>
          {`(Ocean: 7 Days, Land: 3 Days)`}
        </MdTypography>
      </div>
      <DetailTitle title="Route" />
      <div className="flex flex-col gap-6 mt-6">
        <VesselPortComponent
          item={item.origin}
          etd={item.departureDate}
          cutOff={cutoffData}
          portState="origin"
        />
        {middleRoutes}
        <VesselPortComponent
          item={item.destination}
          eta={item.arrivalDate}
          portState="destination"
        />
      </div>
      <div className="h-px bg-outlineVariant my-4"></div>
      <DetailTitle title="Container Yard Information" />
      <div className="grid grid-cols-5 mt-4 gap-8">
        <BasicDetailItem
          title="Loading Terminal"
          value={detailInfo.cyInfo.loadingTerminal}
        />
        <BasicDetailItem
          title="Custom No."
          value={detailInfo.cyInfo.customNo}
        />
        <BasicDetailItem title="Import" value={detailInfo.cyInfo.import} />
      </div>
      <div className="h-px bg-outlineVariant my-4"></div>
      <DetailTitle title="CSF Information" />
      <div className="grid grid-cols-5 mt-4 gap-8">
        <BasicDetailItem
          title="Company Name"
          value={detailInfo.csfInfo.companyName}
        />
        <BasicDetailItem title="Title" value={detailInfo.csfInfo.title} />
        <BasicDetailItem title="Import" value={detailInfo.csfInfo.phone} />
      </div>
    </div>
  );
};
