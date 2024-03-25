import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import PlaceInformationDialog from "@/app/main/schedule/popup/place-information";
import VesselInformationDialog from "@/app/main/schedule/popup/vessel-information";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import {
  createDummyVesselInformation,
  createDummaryVesselSchedules,
  createDummyPlaceInformation,
} from "@/app/main/schedule/util";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import {
  ArrowDropDown,
  InfoOutlined,
  FmdGood,
  FmdGoodOutlined,
} from "@mui/icons-material";
import { DateTime } from "luxon";
import { useState, useMemo } from "react";
import VesselIcon from "@/../public/icon_vessel.svg";

export const RoutePanel = ({
  eta,
  etd,
  origin,
  destination,
}: {
  etd: DateTime;
  eta: DateTime;
  origin: PlaceInformationType;
  destination: PlaceInformationType;
}) => {
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);
  const [isVesselInformationOpen, setIsVesselInformationOpen] = useState(false);
  const [isVesselScheduleOpen, setIsVesselScheduleOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceInformationType>();

  const tempVesselInfo = useMemo(() => {
    return createDummyVesselInformation();
  }, []);

  const tempVesselSchedules = useMemo(() => {
    return createDummaryVesselSchedules();
  }, []);

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
      <>
        <div className="flex items-center relative">
          <div className="mr-6 bg-surfaceContainerLowest z-10 text-primary">
            <ArrowDropDown />
          </div>
          <div className="border-r-2 border-r-outlineVariant border-dotted h-48 absolute left-3 -translate-x-px"></div>
          <div className="bg-surfaceContainerLow rounded-2xl flex flex-col flex-1 px-4 pt-2 pb-4 items-center">
            <div className="flex items-center w-full">
              <MdIcon className="text-primary mr-2">
                <VesselIcon />
              </MdIcon>
              <div
                onClick={() => {
                  setIsVesselScheduleOpen(true);
                }}
                className="flex-1 text-left"
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
            </div>
            <div className="flex justify-start items-center w-full">
              <div className="bg-onSecondary px-4 py-1 rounded-full">
                <MdTypography variant="label" size="small">
                  {data.serviceLane}
                </MdTypography>
              </div>
              <div className="w-px h-6 bg-outlineVariant mx-4"></div>
              <MdTypography
                variant="label"
                size="medium"
                className="text-outline mr-2"
              >
                T/Time
              </MdTypography>
              <MdTypography variant="label" size="medium" prominent>
                {data.transitTime} Hours
              </MdTypography>
            </div>
          </div>
        </div>
      </>
    );
  };

  const VesselPortComponent = ({
    item,
    time,
    portState = "middle",
  }: {
    item: PlaceInformationType;
    time: DateTime;
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
            <div className="flex flex-1 gap-2 items-center w-fit">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="text-primary text-left flex-1"
              >
                {item.yardName.toUpperCase()}
              </MdTypography>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline text-left"
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
      </div>
    );
  };

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
                  faker.date.between(etd.toJSDate(), eta.toJSDate())
                )}
              />
            </>
          );
        })}
        <VesselRouteComponent />
      </>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etd, eta]);

  return (
    <>
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
      <div
        aria-label="route-panel"
        className="w-[480px] flex flex-col gap-12 mt-6"
      >
        <VesselPortComponent item={origin} time={etd} portState="origin" />
        {middleRoutes}
        <VesselPortComponent item={destination} time={eta} portState="origin" />
      </div>
    </>
  );
};
