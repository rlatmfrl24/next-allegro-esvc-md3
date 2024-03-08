"use client";

import { DateTime } from "luxon";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";

import PortIcon from "@/../public/icon_port.svg";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/app/util/md3";
import {
  PortScheduleSearchConditionType,
  PortScheduleType,
} from "@/app/util/typeDef";
import { faker } from "@faker-js/faker";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import EmptyResultPlaceholder from "../empty-placeholder";
import { createDummyPortSchedules } from "../util";
import PortResultTable from "./result-table";
import PageTitle from "@/app/components/page-title";

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
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Port Schedule" />
      <div aria-label="condition-container" className={styles.area}>
        <div className="flex gap-4 items-start">
          <NAOutlinedAutoComplete
            label="Port Name"
            className="w-full"
            required
            recentItems={recentPorts}
            itemList={Array.from({ length: 60 }, (_, i) => {
              return `${faker.location.city()}, ${faker.location.country()}`;
            })}
            icon={<PortIcon />}
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
  );
}
