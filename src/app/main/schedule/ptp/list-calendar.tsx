"use client";

import { MdIcon, MdIconButton, MdOutlinedCard } from "@/app/util/md3";

import { MdTypography } from "@/app/components/typography";
import { useCalendar } from "@h6s/calendar";
import { DateTime } from "luxon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const LabelChip = ({ label }: { label: string }) => {
  return (
    <MdTypography
      variant="label"
      size="large"
      className="py-1.5 px-4 h-fit min-h-fit bg-primaryContainer text-onPrimaryContainer rounded-lg inline-block overflow-hidden whitespace-nowrap text-ellipsis"
    >
      {label}
    </MdTypography>
  );
};

const ViewMoreButton = ({ cnt }: { cnt: number }) => {
  return (
    <MdTypography
      variant="label"
      size="medium"
      className="bg-surfaceContainerHigh px-2 py-0.5 rounded-lg"
    >
      {`View ${cnt} More >`}
    </MdTypography>
  );
};

export default function PointToPointCalendarResult() {
  const { headers, body, navigation, cursorDate } = useCalendar();

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
                      : "text-gray-400"
                  }`}
                >
                  {dayText}
                </MdTypography>
                {idx % 5 === 0 && (
                  <>
                    <LabelChip label="DONGJIN VOYAGER (DONGJIN VOYAGER)" />
                    <LabelChip label="DONGJIN VOYAGER (DONGJIN VOYAGER)" />
                    <ViewMoreButton cnt={2} />
                  </>
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
