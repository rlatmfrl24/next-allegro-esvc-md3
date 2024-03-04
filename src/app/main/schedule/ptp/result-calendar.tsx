"use client";

import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdRippleEffect,
} from "@/app/util/md3";

import { MdTypography } from "@/app/components/typography";
import { useCalendar } from "@h6s/calendar";
import { DateTime } from "luxon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PtPScheduleType } from "@/app/util/typeDef";
import Portal from "@/app/components/portal";
import { useState } from "react";
import PointToPointListResult from "./result-list";
import { Data } from "@dnd-kit/core";
import { dir } from "console";

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

function classifyByDate(list: PtPScheduleType[]) {
  const result: Record<string, PtPScheduleType[]> = {};
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

function exploreOtherDate(
  currentDate: DateTime,
  classifiedList: Record<string, PtPScheduleType[]>,
  direction: "prev" | "next"
) {
  const dateKey = currentDate.toISO()?.split("T")[0];
  if (!dateKey) {
    return null;
  }
  const keys = Object.keys(classifiedList).sort(
    (a, b) => DateTime.fromISO(a).toMillis() - DateTime.fromISO(b).toMillis()
  );

  const idx = keys.indexOf(dateKey);
  if (idx === -1) {
    return null;
  }
  if (direction === "prev") {
    if (idx === 0) {
      return null;
    }
    return {
      date: DateTime.fromISO(keys[idx - 1]),
      list: classifiedList[keys[idx - 1]],
    };
  } else {
    if (idx === keys.length - 1) {
      return null;
    }
    return {
      date: DateTime.fromISO(keys[idx + 1]),
      list: classifiedList[keys[idx + 1]],
    };
  }
}

export default function PointToPointCalendarResult({
  list,
}: {
  list: PtPScheduleType[];
}) {
  const { headers, body, navigation, cursorDate } = useCalendar();
  const classified = classifyByDate(list);
  const [isDetailListOpen, setIsDetailListOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<{
    date: DateTime;
    list: PtPScheduleType[];
  } | null>(null);

  return (
    <div>
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

            const dateKey = DateTime.fromJSDate(value).toISO()?.split("T")[0];
            const list = dateKey ? classified[dateKey] || [] : [];

            return (
              <div
                key={key}
                className={`relative flex flex-col gap-2 h-[152px] p-2 bg-surface cursor-pointer`}
                onClick={() => {
                  if (list.length > 0) {
                    setSelectedData({ date: DateTime.fromJSDate(value), list });
                    setIsDetailListOpen(true);
                  }
                }}
              >
                <MdRippleEffect />
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
      <Portal selector="#result-container">
        {isDetailListOpen && (
          <div className="absolute top-0 right-0 w-full min-h-full h-fit bg-surface rounded-2xl border border-outlineVariant">
            <div className="p-6 flex items-center justify-center relative">
              <MdOutlinedButton
                className="absolute left-6 top-6"
                onClick={() => {
                  setIsDetailListOpen(false);
                }}
              >
                <MdIcon slot="icon">
                  <ChevronLeftIcon fontSize="small" />
                </MdIcon>
                Back
              </MdOutlinedButton>
              <MdIconButton
                disabled={
                  !selectedData ||
                  !exploreOtherDate(selectedData?.date, classified, "prev")
                }
                onClick={() => {
                  const prevData =
                    selectedData &&
                    exploreOtherDate(selectedData?.date, classified, "prev");
                  setSelectedData(prevData);
                }}
              >
                <MdIcon>
                  <ChevronLeftIcon />
                </MdIcon>
              </MdIconButton>
              <MdTypography variant="title" size="large" className="mx-12">
                {selectedData?.date.toFormat("dd MMM yyyy")}
              </MdTypography>
              <MdIconButton
                disabled={
                  !selectedData ||
                  !exploreOtherDate(selectedData?.date, classified, "next")
                }
                onClick={() => {
                  const nextData =
                    selectedData &&
                    exploreOtherDate(selectedData?.date, classified, "next");
                  setSelectedData(nextData);
                }}
              >
                <MdIcon>
                  <ChevronRightIcon />
                </MdIcon>
              </MdIconButton>
            </div>
            {selectedData && (
              <PointToPointListResult list={selectedData?.list} />
            )}
          </div>
        )}
      </Portal>
    </div>
  );
}
