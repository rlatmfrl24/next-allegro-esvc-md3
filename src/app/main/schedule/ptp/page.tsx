"use client";

import { MdTypography } from "@/app/components/typography";
import {
  MdIcon,
  MdIconButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedSelect,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import { useState } from "react";
import NaToggleButton from "@/app/components/na-toggle-button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import ListItem from "./listItem";
import { DateTime } from "luxon";
import SearchCondition from "./search-condition";
import PointToPointCalendarResult from "./calendar";

export default function PointToPointSchedule() {
  const [listSort, setListSort] = useState<
    | "earliest_departure"
    | "latest_departure"
    | "earliest_arrival"
    | "latest_arrival"
  >("earliest_departure");
  const [pageState, setPageState] = useState<"unsearch" | "list" | "calendar">(
    "unsearch"
  );

  return (
    <div className="relative flex-1 flex justify-center">
      <div
        aria-label="container"
        className="max-w-[1400px] w-full p-6 flex flex-col gap-4"
      >
        <div
          aria-label="page-title"
          className="flex justify-start items-center gap-3"
        >
          <MdTypography variant="title" size="large">
            Point to Point Schedule
          </MdTypography>
          <MdIconButton>
            <MdIcon>
              <FavoriteBorderIcon />
            </MdIcon>
          </MdIconButton>
        </div>
        <SearchCondition />
        <div
          aria-label="result-panel"
          className="bg-surface rounded-2xl p-6 flex flex-col gap-4"
        >
          <MdOutlinedSegmentedButtonSet>
            <MdOutlinedSegmentedButton
              label="List"
              selected={pageState === "list"}
              onClick={() => setPageState("list")}
            ></MdOutlinedSegmentedButton>
            <MdOutlinedSegmentedButton
              label="Calendar"
              selected={pageState === "calendar"}
              onClick={() => setPageState("calendar")}
            ></MdOutlinedSegmentedButton>
          </MdOutlinedSegmentedButtonSet>
          <div className="flex items-center gap-4">
            <MdOutlinedSelect
              label="Sort By"
              value={listSort}
              onClick={(e) => setListSort((e.target as any).value)}
            >
              <MdSelectOption value="earliest_departure">
                Earliest Departure
              </MdSelectOption>
              <MdSelectOption value="latest_departure">
                Latest Departure
              </MdSelectOption>
              <MdSelectOption value="earliest_arrival">
                Earliest Arrival
              </MdSelectOption>
              <MdSelectOption value="latest_arrival">
                Latest Arrival
              </MdSelectOption>
            </MdOutlinedSelect>
            <NaToggleButton label="Direct Only" state="checked" />

            <div className="flex-1"></div>
            <MdTextButton>
              <div slot="icon">
                <DownloadIcon className="w-5 h-5" />
              </div>
              Download
            </MdTextButton>
          </div>
          {
            {
              unsearch: (
                <div
                  aria-label="empty-container"
                  className="h-96 border-outlineVariant border rounded-xl"
                ></div>
              ),
              list: (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <ListItem
                      key={index}
                      item={{
                        origin: "Bangkok, Thailand",
                        destination: "Busan, South Korea",
                        departure: DateTime.fromFormat(
                          "2024-02-01",
                          "yyyy-MM-dd"
                        ),
                        arrival: DateTime.fromFormat(
                          "2024-02-01",
                          "yyyy-MM-dd"
                        ),
                        vesselName: "Sawasdee thailand 2204S",
                        transitTime: 12,
                        serviceLane: "EC1",
                      }}
                    />
                  ))}
                </div>
              ),
              calendar: <PointToPointCalendarResult />,
            }[pageState]
          }
        </div>
      </div>
    </div>
  );
}
