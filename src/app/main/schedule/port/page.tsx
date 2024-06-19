"use client";

import { DateTime } from "luxon";
import { useMemo, useRef, useState } from "react";

import PortIcon from "@/../public/icon_port.svg";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import styles from "@/app/styles/base.module.css";
import { MdFilledButton, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";

import EmptyResultPlaceholder from "../../../components/empty-placeholder";
import { createDummyPortSchedules } from "../util";
import PortResultTable from "./result-table";
import PageTitle from "@/app/components/title-components";
import {
  PortScheduleSearchConditionType,
  PortScheduleType,
} from "@/app/util/typeDef/schedule";
import { useRecoilValue } from "recoil";
import { ScrollState } from "@/app/store/global.store";
import { FocusOnResult } from "../../util";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import classNames from "classnames";

export default function PortSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [portQuery, setPortQuery] = useState<PortScheduleSearchConditionType>({
    portName: "",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  });

  const tempPortSchedules = useMemo(() => {
    return createDummyPortSchedules(5);
  }, []);

  function resetPortQuery() {
    setPortQuery({
      portName: "",
      startDate: DateTime.now(),
      endDate: DateTime.now(),
    });
  }

  const cx = classNames.bind(styles);
  const areaRef = useRef<HTMLDivElement>(null);
  const scrollState = useRecoilValue(ScrollState);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle
        title="Port Schedule"
        category="Schedule"
        href="/main/schedule/port"
      />
      <div
        ref={areaRef}
        aria-label="condition-container"
        className={styles.area}
      >
        <div className="flex gap-4 items-end">
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
            className="w-96"
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
      </div>
      {pageState === "unsearch" ? (
        <EmptyResultPlaceholder text={"Please search for the schedule"} />
      ) : (
        <div className={cx(styles.area, styles.table)}>
          <PortResultTable data={tempPortSchedules} />
        </div>
      )}
    </div>
  );
}
