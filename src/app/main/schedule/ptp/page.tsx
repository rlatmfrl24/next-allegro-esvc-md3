"use client";

import {
  MdIcon,
  MdIconButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
} from "@/app/util/md3";
import { useEffect, useRef, useState } from "react";
import { MdTypography } from "@/app/components/typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchCondition from "./search-condition";
import PointToPointCalendarResult from "./result-calendar";
import PointToPointListResult from "./result-list";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import ConditionSummary from "./condition-summary";
import { DateTime } from "luxon";
import { PtPScheduleType, PtPSearchConditionType } from "@/app/util/typeDef";
import styles from "@/app/styles/base.module.css";
import EmptyResultPlaceholder from "../empty-placeholder";
import { createDummyPtPScheduleData } from "../util";

export default function PointToPointSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "list" | "calendar">(
    "unsearch"
  );
  const [searchCondition, setSearchCondition] =
    useState<PtPSearchConditionType>({
      origins: [],
      destinations: [],
      directOnly: true,
      startDate: DateTime.now(),
      endDate: DateTime.now(),
      searchOn: "departure",
    });
  const [resultList, setResultList] = useState<PtPScheduleType[]>([]);
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);

  const scrollRef = useRef<any>();
  const [initialize, instance] = useOverlayScrollbars({
    events: {
      scroll: (instance) => {
        const viewport = instance.elements().viewport;
        if (viewport.scrollTop > 150) {
          setIsSearchConditionSummaryOpen(true);
        } else {
          setIsSearchConditionSummaryOpen(false);
        }
      },
    },
  });

  useEffect(() => {
    if (scrollRef.current) initialize(scrollRef.current);
  }, [initialize]);

  function ScrollToTop() {
    instance()?.elements().viewport.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div ref={scrollRef} className="flex-1">
      <div className="flex justify-center">
        <div
          aria-label="container"
          className="max-w-[1400px] w-full m-6 flex flex-col gap-4 "
        >
          <ConditionSummary
            open={isSearchConditionSummaryOpen && resultList.length > 0}
            condition={searchCondition}
            scrollTop={ScrollToTop}
          />
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
              setSearchCondition(condition);
              const list = createDummyPtPScheduleData(condition);
              setResultList(list);
              setPageState("list");
            }}
          />
          <div aria-label="result-panel" className={styles.area}>
            {resultList.length > 0 && (
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
            )}

            {
              {
                unsearch: <EmptyResultPlaceholder />,
                list: <PointToPointListResult list={resultList} />,
                calendar: <PointToPointCalendarResult list={resultList} />,
              }[pageState]
            }
          </div>
        </div>
      </div>
    </div>
  );
}
