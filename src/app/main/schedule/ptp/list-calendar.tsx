"use client";

import { MdIcon, MdIconButton, MdOutlinedCard } from "@/app/util/md3";

import { MdTypography } from "@/app/components/typography";
import { useCalendar } from "@h6s/calendar";
import { DateTime } from "luxon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItemProps } from "./typeDef";
import { useEffect } from "react";

const LabelChip = ({
  label,
  isCurrentMonth = true,
}: {
  label: string;
  isCurrentMonth?: boolean;
}) => {
  return (
    <MdTypography
      variant="label"
      size="large"
      className={`py-1.5 px-4 h-fit min-h-fit bg-primaryContainer text-onPrimaryContainer rounded-lg inline-block overflow-hidden whitespace-nowrap text-ellipsis ${
        !isCurrentMonth && "opacity-30"
      }`}
    >
      {label}
    </MdTypography>
  );
};

const ViewMoreButton = ({
  cnt,
  isCurrentMonth = true,
}: {
  cnt: number;
  isCurrentMonth?: boolean;
}) => {
  return (
    <MdTypography
      variant="label"
      size="medium"
      className={`bg-surfaceContainerHigh px-2 h-5 rounded-lg flex items-center ${
        !isCurrentMonth && "opacity-30"
      }`}
    >
      {`View ${cnt} More >`}
    </MdTypography>
  );
};

function classifyByDate(list: ListItemProps[]) {
  const result: Record<string, ListItemProps[]> = {};
  list.forEach((item) => {
    const date = item.departure;
    const key = date.toISO()?.split("T")[0];
    if (key) {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
  });
  return result;
}

export default function PointToPointCalendarResult({
  list,
}: {
  list: ListItemProps[];
}) {
  const { headers, body, navigation, cursorDate } = useCalendar();
  const classified = classifyByDate(list);

  return (
    <div className="">
      <div className="flex p-6 justify-center items-center gap-2">
        <MdIconButton
          onClick={() => {
            navigation.toPrev();
          }}
        >
          <MdIcon>
            <ChevronLeftIcon />
          </MdIcon>
        </MdIconButton>
        <MdTypography variant="title" size="large">
          {DateTime.fromJSDate(cursorDate).toFormat("MMM yyyy")}
        </MdTypography>
        <MdIconButton
          onClick={() => {
            navigation.toNext();
          }}
        >
          <MdIcon>
            <ChevronRightIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <div className="grid grid-cols-7 p-px rounded-b-xl overflow-hidden">
        {headers.weekDays.map(({ key, value }) => {
          const weekHead = DateTime.fromJSDate(value).toFormat("EEE");
          return (
            <div
              key={key}
              className="flex justify-center border-t border-white py-2 bg-surface"
            >
              <MdTypography
                variant="body"
                size="medium"
                className={
                  weekHead === "Sun"
                    ? "text-red-500"
                    : weekHead === "Sat"
                    ? "text-blue-500"
                    : "text-black"
                }
              >
                {weekHead.toUpperCase()}
              </MdTypography>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 mt-0 m-px pt-px bg-surfaceContainerHighest gap-px overflow-hidden rounded-b-xl">
        {body.value.map((week) => {
          return week.value.map((day, idx) => {
            const { key, date, isCurrentDate, isCurrentMonth, value } = day;

            const dayText = DateTime.fromISO(value.toISOString()).toFormat(
              "dd"
            );

            const dateKey = value.toISOString().split("T")[0];
            const list = classified[dateKey] || [];

            return (
              <div
                key={key}
                className={`flex flex-col gap-2 h-[152px] p-2 bg-surface `}
              >
                <MdTypography
                  variant="title"
                  size="small"
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isCurrentDate ? "bg-primary text-white" : ""
                  } ${
                    isCurrentMonth
                      ? {
                          Sun: "text-red-500",
                          Sat: "text-blue-500",
                          else: "text-black",
                        }[DateTime.fromJSDate(value).toFormat("EEE")]
                      : "opacity-30"
                  }`}
                >
                  {dayText}
                </MdTypography>
                {list[0] && (
                  <LabelChip
                    label={list[0].vesselName}
                    isCurrentMonth={isCurrentMonth}
                  />
                )}
                {list[1] && (
                  <LabelChip
                    label={list[1].vesselName}
                    isCurrentMonth={isCurrentMonth}
                  />
                )}
                {list.length > 2 && (
                  <ViewMoreButton
                    cnt={list.length - 2}
                    isCurrentMonth={isCurrentMonth}
                  />
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
