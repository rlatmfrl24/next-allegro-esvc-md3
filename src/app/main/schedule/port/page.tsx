"use client";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { faker } from "@faker-js/faker";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NaToggleButton from "@/app/components/na-toggle-button";
import PortIcon from "@/../public/icon_port.svg";
import styles from "@/app/styles/base.module.css";
import EmptyResultPlaceholder from "../empty-placeholder";
import ActualScheduleIcon from "@/../public/icon_actual_schedule.svg";
import EstimateScheduleIcon from "@/../public/icon_estimate_schedule.svg";
import DownloadIcon from "@mui/icons-material/Download";
import {
  PortScheduleSearchConditionType,
  PortScheduleType,
} from "@/app/util/typeDef";
import { DateTime } from "luxon";
import { createDummyPortSchedules } from "../util";
import PortResultTable from "./result-table";

export default function PortSchedule() {
  const scrollRef = useRef<any>();
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [portQuery, setPortQuery] = useState<PortScheduleSearchConditionType>({
    portName: "",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  });

  const [recentPorts, setRecentPorts] = useState<string[]>([]);
  const [initialize, instance] = useOverlayScrollbars();
  const [portName, setPortName] = useState("");
  const [portScheduls] = useState<PortScheduleType[]>(
    createDummyPortSchedules()
  );
  const [isOceanVesselOnly, setIsOceanVesselOnly] = useState(false);

  useEffect(() => {
    if (scrollRef.current) initialize(scrollRef.current);
  }, [initialize]);

  function resetPortQuery() {
    setPortName("");
    setPortQuery({
      portName: "",
      startDate: DateTime.now(),
      endDate: DateTime.now(),
    });
  }

  return (
    <div ref={scrollRef} className="flex-1">
      <div className="flex justify-center">
        <div
          aria-label="container"
          className="max-w-[1400px] w-full m-6 flex flex-col gap-4 "
        >
          <div
            aria-label="page-title"
            className="flex justify-start items-center gap-3"
          >
            <MdTypography variant="title" size="large">
              Port Schedule
            </MdTypography>
            <MdIconButton>
              <MdIcon>
                <FavoriteBorderIcon />
              </MdIcon>
            </MdIconButton>
          </div>
          <div aria-label="condition-container" className={styles.area}>
            <div className="flex gap-4 items-start">
              <NAOutlinedAutoComplete
                label="Port Name"
                className="w-full"
                value={portName}
                required
                recentItems={recentPorts}
                itemList={Array.from({ length: 60 }, (_, i) => {
                  return `${faker.location.city()}, ${faker.location.country()}`;
                })}
                icon={<PortIcon />}
                setValue={setPortName}
                onSelection={(value) => {
                  if (value !== "") {
                    setRecentPorts((previous) => {
                      if (previous.includes(value)) {
                        const index = previous.indexOf(value);
                        previous.splice(index, 1);
                        return [value, ...previous];
                      }
                      return [value, ...previous].slice(0, 5);
                    });
                    setPortQuery({ ...portQuery, portName: value });
                  }
                }}
              />
              <MdRangeDatePicker
                defaultStartDate={portQuery.startDate}
                defaultEndDate={portQuery.endDate}
                handleDateRangeSelected={([start, end]) => {
                  setPortQuery({
                    ...portQuery,
                    startDate: start,
                    endDate: end,
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
                }}
              >
                Search
              </MdFilledButton>
            </div>
          </div>
          {pageState === "unsearch" ? (
            <EmptyResultPlaceholder />
          ) : (
            <div className={styles.area}>
              <div className="flex justify-between">
                <NaToggleButton
                  label="Ocean Vessel Only"
                  state={isOceanVesselOnly ? "checked" : "unchecked"}
                  onClick={() => {
                    setIsOceanVesselOnly((prev) => !prev);
                  }}
                />
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <MdTypography
                      variant="label"
                      size="large"
                      className="text-outline"
                    >
                      Ports Total: {portScheduls.length}
                    </MdTypography>
                  </div>
                  <MdTextButton>
                    <MdIcon slot="icon">
                      <DownloadIcon fontSize="small" />
                    </MdIcon>
                    Download
                  </MdTextButton>
                </div>
              </div>
              <PortResultTable data={portScheduls} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
