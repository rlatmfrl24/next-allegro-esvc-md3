"use client";

import { DateTime } from "luxon";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";

import PortIcon from "@/../public/icon_port.svg";
import { MdRangeDatePicker } from "@/app/components/datepickers/old/range-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdFilledButton,
  MdFilterChip,
  MdIcon,
  MdTextButton,
} from "@/app/util/md3";
import { ar, faker } from "@faker-js/faker";
import DownloadIcon from "@mui/icons-material/Download";

import EmptyResultPlaceholder from "../../../components/empty-placeholder";
import { createDummyPortSchedules } from "../util";
import PortResultTable from "./result-table";
import PageTitle from "@/app/components/title-components";
import {
  PortScheduleSearchConditionType,
  PortScheduleType,
} from "@/app/util/typeDef/schedule";
import { DividerComponent } from "../../booking/information/components/base";
import { useRecoilValue } from "recoil";
import { ScrollState } from "@/app/store/global.store";
import { FocusOnResult } from "../../util";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";

export default function PortSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [portQuery, setPortQuery] = useState<PortScheduleSearchConditionType>({
    portName: "",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  });

  const [portScheduls] = useState<PortScheduleType[]>(
    createDummyPortSchedules()
  );

  function resetPortQuery() {
    setPortQuery({
      portName: "",
      startDate: DateTime.now(),
      endDate: DateTime.now(),
    });
  }

  const areaRef = useRef<HTMLDivElement>(null);
  const scrollState = useRecoilValue(ScrollState);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Port Schedule" />
      <div
        ref={areaRef}
        aria-label="condition-container"
        className={styles.area}
      >
        <div className="flex gap-4 items-start">
          <NAOutlinedAutoComplete
            label="Port Name"
            className="w-full"
            recentCookieKey="recent-port"
            required
            itemList={Array.from({ length: 60 }, (_, i) => {
              return `${faker.location.city()}, ${faker.location.country()}`.toUpperCase();
            })}
            icon={<PortIcon />}
            onItemSelection={(value) => {
              if (value !== "") {
                setPortQuery({ ...portQuery, portName: value });
              }
            }}
          />
          <DateRangePicker
            className="w-80"
            initial={{
              start: portQuery.startDate,
              end: portQuery.endDate,
            }}
            onDateChange={(range) => {
              if (range.start && range.end)
                setPortQuery({
                  ...portQuery,
                  startDate: range.start,
                  endDate: range.end,
                });
            }}
          />
        </div>
        <div
          aria-label="search-condition-actions"
          className="flex justify-end gap-2"
        >
          <MdTextButton
            onClick={() => {
              resetPortQuery();
              setPageState("unsearch");
            }}
          >
            Reset
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              setPageState("search");
              FocusOnResult(areaRef, scrollState.instance);
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
      {pageState === "unsearch" ? (
        <EmptyResultPlaceholder text={"Please search for the schedule"} />
      ) : (
        <div className={styles.area}>
          <PortResultTable data={portScheduls} />
        </div>
      )}
    </div>
  );
}
