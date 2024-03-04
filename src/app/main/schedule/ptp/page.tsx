"use client";

import { DateTime } from 'luxon';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { MdTypography } from '@/app/components/typography';
import { ScrollState } from '@/app/store/global.store';
import styles from '@/app/styles/base.module.css';
import {
    MdIcon, MdIconButton, MdOutlinedSegmentedButton, MdOutlinedSegmentedButtonSet
} from '@/app/util/md3';
import { PtPScheduleType, PtPSearchConditionType } from '@/app/util/typeDef';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import EmptyResultPlaceholder from '../empty-placeholder';
import { createDummyPtPScheduleData } from '../util';
import ConditionSummary from './condition-summary';
import PointToPointCalendarResult from './result-calendar';
import PointToPointListResult from './result-list';
import SearchCondition from './search-condition';

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
  const scrollState = useRecoilValue(ScrollState);

  useEffect(() => {
    if (scrollState.yPosition > 150) {
      setIsSearchConditionSummaryOpen(true);
    } else {
      setIsSearchConditionSummaryOpen(false);
    }
  }, [scrollState]);

  function ScrollToTop() {
    scrollState.viewPort?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
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
      <ConditionSummary
        open={isSearchConditionSummaryOpen && resultList.length > 0}
        condition={searchCondition}
        scrollTop={ScrollToTop}
      />
    </div>
  );
}
