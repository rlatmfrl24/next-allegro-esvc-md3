import { VesselInfoType, VesselScheduleType } from "@/app/util/typeDef";
import { SimpleFaker, de, faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {
  createDummaryVesselSchedules,
  createDummyVesselInformation,
} from "../util";
import { useEffect, useMemo } from "react";
import { MdTypography } from "@/app/components/typography";
import WestIcon from "@/../public/icon_direction_west.svg";
import EastIcon from "@/../public/icon_direction_east.svg";
import NorthIcon from "@/../public/icon_direction_north.svg";
import SouthIcon from "@/../public/icon_direction_south.svg";
import { max } from "lodash";
import ActualDateIcon from "@/../public/icon_actual_schedule.svg";
import LongRangeDateIcon from "@/../public/icon_long_range_schedule.svg";
import { MdIcon } from "@/app/util/md3";

type LongRangePortType = {
  name: string;
  direction: "north" | "south" | "east" | "west";
};

type LongRangeDateType = {
  port: LongRangePortType;
  arrival: DateTime;
  departure: DateTime;
};

type LongRangeScheduleType = {
  vesselInfo: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
  remarkInfo: string;
  longRangeDates: LongRangeDateType[];
};

function createDummyPortList(): LongRangePortType[] {
  return Array.from(
    {
      length: faker.number.int({
        min: 20,
        max: 30,
      }),
    },
    (_, i) => {
      return {
        name: faker.location.city(),
        direction: faker.helpers.arrayElement([
          "north",
          "south",
          "east",
          "west",
        ]),
      };
    }
  );
}

function createDummyLongRangeSchedule(
  portList: LongRangePortType[]
): LongRangeScheduleType {
  return {
    vesselInfo: createDummyVesselInformation(),
    vesselSchedules: createDummaryVesselSchedules(),
    remarkInfo: faker.lorem.sentence(),
    longRangeDates: portList.map((port) => {
      return {
        port,
        arrival: DateTime.fromJSDate(faker.date.future()),
        departure: DateTime.fromJSDate(faker.date.future()),
      } as LongRangeDateType;
    }),
  };
}

function createDummyLongRangeSchedules() {
  const portList = createDummyPortList();
  const schedules = Array.from({ length: 30 }, () =>
    createDummyLongRangeSchedule(portList)
  );
  return {
    schedules,
    portList,
  };
}

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

export default function LongRangeTable() {
  const { schedules, portList } = useMemo(
    () => createDummyLongRangeSchedules(),
    []
  );

  useEffect(() => {
    console.log(schedules);
    console.log(portList);
  }, [schedules, portList]);

  return (
    <div className="flex">
      <div className="w-72 flex flex-col border-r border-r-onSurfaceVariant">
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
            className="flex items-center justify-center h-24 pb-px bg-surface border-b border-b-outlineVariant"
          >
            {schedule.vesselInfo.vesselName}
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
                    className="col-span-1 border-b border-b-outlineVariant w-[200px] h-24 bg-surface flex flex-col"
                  >
                    <div className="flex p-2 items-center justify-start flex-1">
                      <div className="w-8 h-8 flex justify-center items-center">
                        <ActualDateIcon />
                      </div>
                      <MdTypography variant="body" size="medium">
                        {date.arrival.toFormat("yyyy-MM-dd HH:mm:ss")}
                      </MdTypography>
                    </div>
                    <div className="flex p-2 items-center justify-start flex-1">
                      <div className="w-8 h-8 flex justify-center items-center">
                        <LongRangeDateIcon />
                      </div>
                      <MdTypography variant="body" size="medium">
                        {date.departure.toFormat("yyyy-MM-dd HH:mm:ss")}
                      </MdTypography>
                    </div>
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
