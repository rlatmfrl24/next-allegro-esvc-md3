import {
  LongRangePortType,
  LongRangeScheduleType,
  VesselInfoType,
} from "@/app/util/typeDef";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { MdTypography } from "@/app/components/typography";
import WestIcon from "@/../public/icon_direction_west.svg";
import EastIcon from "@/../public/icon_direction_east.svg";
import NorthIcon from "@/../public/icon_direction_north.svg";
import SouthIcon from "@/../public/icon_direction_south.svg";
import { max } from "lodash";
import ActualDateIcon from "@/../public/icon_actual_schedule.svg";
import LongRangeDateIcon from "@/../public/icon_long_range_schedule.svg";
import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import VesselScheduleDialog from "../popup/vessel-schedule";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { createDummaryVesselSchedules } from "../util";

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
          vesselSchedules={createDummaryVesselSchedules()}
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
            } flex justify-between pb-px bg-surface border-b border-b-outlineVariant`}
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

              <MdIconButton>
                <MdIcon>
                  <div className="flex items-center justify-center">
                    <RemarkIcon />
                  </div>
                </MdIcon>
              </MdIconButton>
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
                  <div className="flex items-center p-2 h-12 bg-surfaceVariant">
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-onSurfaceVariant flex items-center "
                    >
                      <div className="w-8 h-8 flex justify-center items-center">
                        <DirectionIcon direction={port.direction} />
                      </div>

                      {port.name}
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
                    } col-span-1 border-b border-b-outlineVariant w-[200px] bg-surface flex flex-col`}
                  >
                    <div className="flex p-2 items-center justify-start flex-1">
                      <div className="w-8 h-8 flex justify-center items-center">
                        <ActualDateIcon />
                      </div>
                      <MdTypography variant="body" size="medium">
                        {date.arrival.toFormat("yyyy-MM-dd HH:mm:ss")}
                      </MdTypography>
                    </div>
                    {date.departure && (
                      <div className="flex p-2 items-center justify-start flex-1">
                        <div className="w-8 h-8 flex justify-center items-center">
                          <LongRangeDateIcon />
                        </div>
                        <MdTypography variant="body" size="medium">
                          {date.departure.toFormat("yyyy-MM-dd HH:mm:ss")}
                        </MdTypography>
                      </div>
                    )}
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
