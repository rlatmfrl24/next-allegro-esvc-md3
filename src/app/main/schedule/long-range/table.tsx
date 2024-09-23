import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useMemo, useState } from "react";
import { max } from "lodash";

import ActualDateIcon from "@/../public/icon_schedule_actual.svg";
import EastIcon from "@/../public/icon_direction_east.svg";
import NorthIcon from "@/../public/icon_direction_north.svg";
import SouthIcon from "@/../public/icon_direction_south.svg";
import WestIcon from "@/../public/icon_direction_west.svg";
import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import LongRangeDateIcon from "@/../public/icon_schedule_long_range.svg";

import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton } from "@/app/util/md3";

import VesselScheduleDialog from "../popup/vessel-schedule";
import { createDummyVesselSchedules } from "../util";
import {
  autoUpdate,
  offset,
  shift,
  flip,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  FloatingDelayGroup,
  useDelayGroup,
  useDelayGroupContext,
} from "@floating-ui/react";
import { PlainTooltip } from "@/app/components/tooltip";
import {
  LongRangeScheduleType,
  LongRangePortType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";

const DirectionIcon = ({
  direction,
}: {
  direction: "north" | "south" | "east" | "west";
}) => {
  switch (direction) {
    case "north":
      return <NorthIcon />;
    case "south":
      return <SouthIcon />;
    case "east":
      return <EastIcon />;
    case "west":
      return <WestIcon />;
    default:
      return null;
  }
};

export default function LongRangeTable({
  schedules,
  portList,
  hasDeparture,
}: {
  schedules: LongRangeScheduleType[];
  portList: LongRangePortType[];
  hasDeparture: boolean;
}) {
  const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
    useState(false);
  const [selectedVesselInfo, setSelectedVesselInfo] =
    useState<VesselInfoType | null>(null);

  return (
    <div className="flex">
      {selectedVesselInfo && (
        <VesselScheduleDialog
          open={isVesselScheduleDialogOpen}
          handleOpen={setIsVesselScheduleDialogOpen}
          vesselInfo={selectedVesselInfo}
          vesselSchedules={createDummyVesselSchedules()}
        />
      )}
      <div className="w-fit flex flex-col border-r border-r-onSurfaceVariant">
        <div className="flex items-center h-12 p-2 bg-surfaceVariant">
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurfaceVariant"
          >
            Vessel
          </MdTypography>
        </div>
        {schedules.map((schedule, i) => (
          <div
            key={i}
            className={`${
              hasDeparture ? "h-24" : "h-12"
            } flex justify-between pb-px bg-surfaceContainerLowest border-b border-b-outlineVariant`}
          >
            <div className="flex p-2 flex-1 items-center">
              <div
                className="flex-1"
                onClick={() => {
                  setSelectedVesselInfo(schedule.vesselInfo);
                  setIsVesselScheduleDialogOpen(true);
                }}
              >
                <MdTypography
                  variant="body"
                  size="medium"
                  className="underline cursor-pointer py-1.5"
                >
                  {schedule.vesselInfo.vesselName}
                </MdTypography>
              </div>
              {schedule.remarkInfo && (
                <MdIconButton>
                  <MdIcon>
                    <div className="flex items-center justify-center">
                      <RemarkIcon />
                    </div>
                  </MdIcon>
                </MdIconButton>
              )}
            </div>
            <div className="flex flex-col w-fit border-l border-l-outlineVariant">
              <MdTypography
                variant="body"
                size="medium"
                className="flex-1 flex items-center p-2"
              >
                Arrival
              </MdTypography>
              {hasDeparture && (
                <MdTypography
                  variant="body"
                  size="medium"
                  className="flex-1 flex items-center p-2"
                >
                  Departure
                </MdTypography>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative overflow-x-auto">
        <OverlayScrollbarsComponent defer>
          <div className="min-w-max">
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${max([
                  portList.length,
                  1,
                ])}, 1fr)`,
              }}
            >
              {portList.map((port, i) => (
                <div key={i} className="col-span-1">
                  <div className="flex items-center p-2 h-12 bg-surfaceVariant whitespace-nowrap">
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-onSurfaceVariant flex items-center "
                    >
                      <div className="w-8 h-8 flex justify-center items-center">
                        <DirectionIcon direction={port.direction} />
                      </div>

                      {port.name.split(",")[0]}
                    </MdTypography>
                  </div>
                </div>
              ))}
            </div>
            {schedules.map((schedule, i) => (
              <div
                key={i}
                className="grid grid-cols-12"
                style={{
                  gridTemplateColumns: `repeat(${max([
                    portList.length,
                    1,
                  ])}, 1fr)`,
                }}
              >
                {schedule.longRangeDates.map((date, j) => (
                  <div
                    key={j}
                    className={`${
                      hasDeparture ? "h-24" : "h-12"
                    } col-span-1 border-b border-b-outlineVariant bg-surfaceContainerLowest flex flex-col`}
                  >
                    <FloatingDelayGroup
                      delay={{
                        open: 1000,
                        close: 200,
                      }}
                    >
                      <div className="flex p-2 items-center justify-start flex-1">
                        <DateIndicator
                          icon={<ActualDateIcon />}
                          text={"Actual Date"}
                        />
                        <MdTypography variant="body" size="medium">
                          {date.arrival.toFormat("yyyy-MM-dd HH:mm:ss")}
                        </MdTypography>
                      </div>
                      {date.departure && (
                        <div className="flex p-2 items-center justify-start flex-1">
                          <DateIndicator
                            icon={<LongRangeDateIcon />}
                            text={"Long Range Date"}
                          />
                          <MdTypography variant="body" size="medium">
                            {date.departure.toFormat("yyyy-MM-dd HH:mm:ss")}
                          </MdTypography>
                        </div>
                      )}
                    </FloatingDelayGroup>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}

const DateIndicator = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [
      offset({
        mainAxis: -3,
        crossAxis: 7,
      }),
      shift(),
      flip(),
    ],
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  useDelayGroup(context, { id: context.floatingId });
  const { delay } = useDelayGroupContext();

  const hover = useHover(context, { move: false, delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        className="w-8 h-8 flex justify-center items-center"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {icon}
      </div>
      {isTooltipOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <PlainTooltip label={text} />
        </div>
      )}
    </>
  );
};
