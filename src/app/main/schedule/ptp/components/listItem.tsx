import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

import VesselIcon from "@/../public/icon_vessel.svg";
import Portal from "@/app/components/portal";
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

import PlaceInformationDialog from "../../popup/place-information";
import VesselInformationDialog from "../../popup/vessel-information";
import VesselScheduleDialog from "../../popup/vessel-schedule";
import {
  createDummaryVesselSchedules,
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../util";
import CutOffTooltip from "./cut-off-tooltip";
import {
  PtPScheduleType,
  PlaceInformationType,
  CutOffDataType,
} from "@/app/util/typeDef/schedule";
import { DetailTitle } from "@/app/components/title-components";

export default function ListItem({ item }: { item: PtPScheduleType }) {
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);
  const [isVesselInformationOpen, setIsVesselInformationOpen] = useState(false);
  const [isVesselScheduleOpen, setIsVesselScheduleOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceInformationType>();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const VesselPortComponent = ({
    item,
    time,
    portState = "middle",
  }: {
    item: PlaceInformationType;
    time: DateTime;
    cutOff?: CutOffDataType;
    portState?: "origin" | "middle" | "destination";
  }) => {
    return (
      <div className="flex items-center w-full">
        {portState === "origin" || portState === "destination" ? (
          <FmdGood className="text-primary" />
        ) : (
          <FmdGoodOutlined className="text-primary" />
        )}
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
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                {time.toFormat("yyyy-MM-dd HH:mm")}
              </MdTypography>
            </div>
          </div>
          <div
            className="w-fit"
            onClick={() => {
              setSelectedPlace(item);
              setIsPlaceInformationOpen(!isPlaceInformationOpen);
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
        </div>
        {portState === "origin" && (
          <div className="h-12 border-l border-l-outlineVariant flex items-center text-primary">
            <AccessTime className="ml-4 mr-2" fontSize="small" />
            <MdTypography variant="label" size="large" className="mr-8">
              Cut Off
            </MdTypography>
            <div className="flex gap-6 mr-6">
              <BasicDetailItem
                title="Documentation"
                value={cutoffData.documentation.toFormat("yyyy-MM-dd HH:mm")}
              />
              <BasicDetailItem
                title="EDI"
                value={cutoffData.EDI.toFormat("yyyy-MM-dd HH:mm")}
              />
              <BasicDetailItem
                title="Cargo"
                value={cutoffData.cargo.toFormat("yyyy-MM-dd HH:mm")}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const VesselRouteComponent = () => {
    const data = useMemo(() => {
      return {
        vesselLine: faker.airline.airplane().name,
        serviceLane: faker.string.alphanumeric(4).toUpperCase(),
        transitTime: faker.number.int({
          max: 10,
        }),
      };
    }, []);

    return (
      <div className="flex items-center relative">
        <div className="mr-6 bg-surfaceContainerLowest z-10 text-primary">
          <ArrowDropDown />
        </div>
        <div className="border-r-2 border-r-outlineVariant border-dotted h-28 absolute left-3 -translate-x-px"></div>
        <div className="bg-secondaryContainer rounded-2xl flex flex-1 px-8 py-2 gap-2 items-center">
          <MdIcon className="text-primary">
            <VesselIcon />
          </MdIcon>
          <div
            onClick={() => {
              setIsVesselScheduleOpen(true);
            }}
          >
            <MdTypography
              variant="body"
              size="large"
              className="underline text-onSurfaceVariant cursor-pointer"
            >
              {data.vesselLine}
            </MdTypography>
          </div>
          <MdIconButton
            onClick={() => {
              setIsVesselInformationOpen(true);
            }}
          >
            <MdIcon>
              <InfoOutlined />
            </MdIcon>
          </MdIconButton>
          <div className="bg-onSecondary px-4 py-1 rounded-full ml-6">
            <MdTypography variant="label" size="small">
              {data.serviceLane}
            </MdTypography>
          </div>
          <div className="w-px h-10 bg-outlineVariant mx-6"></div>
          <MdTypography variant="label" size="medium" className="text-outline">
            T/Time
          </MdTypography>
          <MdTypography variant="label" size="medium" prominent>
            {data.transitTime} Hours
          </MdTypography>
        </div>
      </div>
    );
  };

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

  const middleRoutes = useMemo(() => {
    const portCount = faker.number.int({ min: 1, max: 3 });
    return (
      <>
        {Array.from({ length: portCount }).map(() => {
          return (
            <>
              <VesselRouteComponent />
              <VesselPortComponent
                item={createDummyPlaceInformation(faker.location.city())}
                time={DateTime.fromJSDate(
                  faker.date.between(
                    item.departureDate.toJSDate(),
                    item.arrivalDate.toJSDate()
                  )
                )}
              />
            </>
          );
        })}
        <VesselRouteComponent />
      </>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.arrivalDate, item.departureDate]);

  const tempVesselInfo = useMemo(() => {
    return createDummyVesselInformation();
  }, []);

  const tempVesselSchedules = useMemo(() => {
    return createDummaryVesselSchedules();
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
                    setSelectedPlace(item.origin);
                    setIsPlaceInformationOpen(!isPlaceInformationOpen);
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
                    setIsVesselScheduleOpen(true);
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
                    setSelectedPlace(item.destination);
                    setIsPlaceInformationOpen(!isPlaceInformationOpen);
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
      <Portal selector="#main-container">
        {selectedPlace && (
          <PlaceInformationDialog
            open={isPlaceInformationOpen}
            handleOpen={setIsPlaceInformationOpen}
            data={selectedPlace}
          />
        )}
        <VesselInformationDialog
          open={isVesselInformationOpen}
          handleOpen={setIsVesselInformationOpen}
          data={tempVesselInfo}
        />
        <VesselScheduleDialog
          open={isVesselScheduleOpen}
          handleOpen={setIsVesselScheduleOpen}
          vesselInfo={tempVesselInfo}
          vesselSchedules={tempVesselSchedules}
        />
      </Portal>
      <>
        {isDetailOpen && (
          <div className="rounded-lg border border-outlineVariant py-6 px-4 bg-surfaceContainerLow">
            <div className="border border-outlineVariant bg-surfaceContainerLowest rounded-2xl overflow-hidden">
              <div className="h-2 bg-secondaryContainer"></div>
              <div className="py-4 px-6 flex flex-col relative">
                <div className="absolute top-4 right-6 flex gap-2 px-4 py-2 bg-background rounded-2xl">
                  <MdTypography
                    variant="label"
                    size="medium"
                    className="text-outline"
                  >
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
                    time={item.departureDate}
                    cutOff={cutoffData}
                    portState="origin"
                  />
                  {middleRoutes}
                  <VesselPortComponent
                    item={item.destination}
                    time={item.arrivalDate}
                    portState="destination"
                  />
                </div>
                <div className="h-px bg-outlineVariant my-10"></div>
                <DetailTitle title="Container Yard Information" />
                <div className="grid grid-cols-5 mt-6 gap-8">
                  <BasicDetailItem
                    title="Loading Terminal"
                    value={detailInfo.cyInfo.loadingTerminal}
                  />
                  <BasicDetailItem
                    title="Custom No."
                    value={detailInfo.cyInfo.customNo}
                  />
                  <BasicDetailItem
                    title="Import"
                    value={detailInfo.cyInfo.import}
                  />
                </div>
                <div className="h-px bg-outlineVariant my-10"></div>
                <DetailTitle title="CSF Information" />
                <div className="grid grid-cols-5 mt-6 gap-8">
                  <BasicDetailItem
                    title="Company Name"
                    value={detailInfo.csfInfo.companyName}
                  />
                  <BasicDetailItem
                    title="Title"
                    value={detailInfo.csfInfo.title}
                  />
                  <BasicDetailItem
                    title="Import"
                    value={detailInfo.csfInfo.phone}
                  />
                </div>
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
