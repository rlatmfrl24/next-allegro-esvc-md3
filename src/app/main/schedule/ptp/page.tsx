"use client";

import {
  MdIcon,
  MdIconButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
} from "@/app/util/md3";
import { useState } from "react";
import { MdTypography } from "@/app/components/typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchCondition from "./search-condition";
import PointToPointCalendarResult from "./list-calendar";
import PointToPointListResult from "./list-result";

export default function PointToPointSchedule() {
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
        <SearchCondition
          searchAction={(condition) => {
            console.log(condition);
            setPageState("list");
          }}
        />
        <div
          aria-label="result-panel"
          className="bg-surface rounded-2xl flex flex-col"
        >
          <MdOutlinedSegmentedButtonSet className="p-6 pb-0">
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
          {
            {
              unsearch: (
                <div
                  aria-label="empty-container"
                  className="h-96 border-outlineVariant border rounded-xl"
                ></div>
              ),
              list: <PointToPointListResult />,
              calendar: <PointToPointCalendarResult />,
            }[pageState]
          }
        </div>
      </div>
    </div>
  );
}
