"use client";

import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import PageTitle from "@/app/components/title-components";
import { ScrollState } from "@/app/store/global.store";
import styles from "@/app/styles/base.module.css";
import {
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
} from "@/app/util/md3";
import {
  PtPScheduleType,
  PtPSearchConditionType,
} from "@/app/util/typeDef/schedule";

import EmptyResultPlaceholder from "../../../components/empty-placeholder";
import { createDummyPtPScheduleData } from "../util";
import ConditionSummary from "./components/condition-summary";
import PointToPointCalendarResult from "./result-calendar";
import PointToPointListResult from "./result-list";
import SearchCondition from "./search-condition";

export default function PointToPointSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "list" | "calendar">(
    "unsearch"
  );
  const [searchCondition, setSearchCondition] =
    useState<PtPSearchConditionType>({
      origins: [],
      destinations: [],
      startDate: DateTime.now(),
      endDate: DateTime.now(),
      searchOn: "departure",
    });
  const [resultList, setResultList] = useState<PtPScheduleType[]>([]);
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);
  const scrollState = useRecoilValue(ScrollState);

  useEffect(() => {
    if (scrollState.yPosition > 150) {
      setIsSearchConditionSummaryOpen(true);
    } else {
      setIsSearchConditionSummaryOpen(false);
    }
  }, [scrollState]);

  function ScrollToTop() {
    if (scrollState.instance) {
      scrollState.instance()?.elements().viewport?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Point to Point Schedule" />
      <SearchCondition
        searchAction={(condition) => {
          setSearchCondition(condition);
          setResultList(createDummyPtPScheduleData(condition));
          setPageState("list");
        }}
        resetAction={() => {
          setSearchCondition({
            origins: [],
            destinations: [],
            startDate: DateTime.now(),
            endDate: DateTime.now(),
            searchOn: "departure",
          });
          setResultList([]);
          setPageState("unsearch");
        }}
      />
      <div
        id="result-container"
        aria-label="result-panel"
        className={styles.area}
      >
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
            unsearch: (
              <EmptyResultPlaceholder text={"Please search for the schedule"} />
            ),
            list: <PointToPointListResult list={resultList} />,
            calendar: <PointToPointCalendarResult list={resultList} />,
          }[pageState]
        }
      </div>
      <ConditionSummary
        open={isSearchConditionSummaryOpen && resultList.length > 0}
        condition={searchCondition}
        scrollTop={ScrollToTop}
      />
    </div>
  );
}
