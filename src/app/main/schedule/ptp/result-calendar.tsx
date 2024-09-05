"use client";

import { MdDialog, MdIcon, MdIconButton, MdRippleEffect } from "@/app/util/md3";

import { MdTypography } from "@/app/components/typography";
import { useCalendar } from "@h6s/calendar";
import { DateTime } from "luxon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Portal from "@/app/components/portal";
import { useMemo, useState } from "react";
import PointToPointListResult from "./result-list";
import LabelChip from "@/app/components/label-chip";
import { PtPScheduleType } from "@/app/util/typeDef/schedule";
import { ItemDetail } from "./components/listItem";
import { faker } from "@faker-js/faker";
import { createDummyVesselInformation } from "../util";
import VesselIcon from "@/../public/icon_vessel_outline.svg";

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
      className={`relative bg-surfaceContainerHigh px-2 h-5 rounded-lg flex items-center cursor-pointer ${
        !isCurrentMonth && "opacity-30"
      }`}
    >
      <MdRippleEffect />
      {`View ${cnt} More >`}
    </MdTypography>
  );
};

function classifyByDate(list: PtPScheduleType[]) {
  const result: Record<string, PtPScheduleType[]> = {};
  list.forEach((item) => {
    const date = item.departureDate;
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
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<{
    date: DateTime;
    list: PtPScheduleType[];
    index?: number;
  } | null>(null);

  const cutoffData = useMemo(() => {
    const item = selectedData?.list[0];

    return {
      documentation: item?.departureDate.minus({ days: 1 }) ?? DateTime.now(),
      EDI: item?.departureDate.minus({ hours: 3 }) ?? DateTime.now(),
      cargo: item?.departureDate.minus({ hours: 6 }) ?? DateTime.now(),
    };
  }, [selectedData]);

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

  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-2">
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
                className={`relative flex flex-col gap-2 h-[152px] p-2 bg-surface`}
                // onClick={() => {
                //   if (list.length > 0) {
                //     setSelectedData({ date: DateTime.fromJSDate(value), list });
                //     setIsDetailListOpen(true);
                //   }
                // }}
              >
                {/* <MdRippleEffect /> */}
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
                    label={list[0].vesselInfo.vesselName}
                    className={`bg-secondaryContainer text-onSurface  ${
                      isCurrentMonth ? "" : "opacity-30"
                    }`}
                    onClick={() => {
                      setSelectedData({
                        date: DateTime.fromJSDate(value),
                        list: [list[0]],
                      });
                      setIsDetailOpen(true);
                    }}
                  />
                )}
                {list[1] && (
                  <LabelChip
                    label={list[1].vesselInfo.vesselName}
                    className={`bg-secondaryContainer text-onSurface ${
                      isCurrentMonth ? "" : "opacity-30"
                    }`}
                    onClick={() => {
                      setSelectedData({
                        date: DateTime.fromJSDate(value),
                        list: [list[1]],
                      });
                      setIsDetailOpen(true);
                    }}
                  />
                )}
                {list.length > 2 && (
                  <div
                    onClick={() => {
                      setSelectedData({
                        date: DateTime.fromJSDate(value),
                        list,
                        index: 0,
                      });
                      setIsDetailOpen(true);
                    }}
                  >
                    <ViewMoreButton
                      cnt={list.length - 2}
                      isCurrentMonth={isCurrentMonth}
                    />
                  </div>
                )}
              </div>
            );
          });
        })}
      </div>
      {/* <Portal selector="#result-container">
        {isDetailOpen && (
          <div className="absolute top-0 right-0 w-full min-h-full h-fit bg-surface rounded-2xl border border-outlineVariant">
            <div className="p-4 pb-0 flex items-center justify-center relative">
              <MdOutlinedButton
                className="absolute left-4 top-4"
                onClick={() => {
                  setIsDetailOpen(false);
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
              <div className="p-4">
                <PointToPointListResult list={selectedData?.list} />
              </div>
            )}
          </div>
        )}
      </Portal> */}
      {selectedData && (
        <Portal selector="#main-container">
          <MdDialog
            open={isDetailOpen}
            closed={() => {
              setIsDetailOpen(false);
            }}
            className="w-fit min-w-fit h-[800px] min-h-[800px]"
          >
            <div slot="headline">
              {`Schedule Detail - ` +
                selectedData?.date.toFormat("dd MMM yyyy")}
            </div>
            <div slot="content" className="flex gap-2 max-w-[1240px] h-[720px]">
              {selectedData.list.length > 1 && (
                <div>
                  {selectedData.list.map((item) => (
                    <div
                      key={item.vesselInfo.vesselCode}
                      className={`relative flex gap-4 cursor-pointer px-4 py-3 rounded-lg ${
                        selectedData.index === selectedData.list.indexOf(item)
                          ? "bg-surfaceContainerHighest"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedData({
                          ...selectedData,
                          index: selectedData.list.indexOf(item),
                        });
                      }}
                    >
                      <MdRippleEffect />
                      <VesselIcon />
                      <MdTypography variant="body" size="large">
                        {item.vesselInfo.vesselName}
                      </MdTypography>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex-1 overflow-auto">
                <ItemDetail
                  item={selectedData.list[selectedData.index || 0]}
                  cutoffData={cutoffData}
                  detailInfo={detailInfo}
                  vesselInfo={
                    selectedData.list[selectedData.index || 0].vesselInfo
                  }
                />
              </div>
            </div>
          </MdDialog>
        </Portal>
      )}
    </div>
  );
}
