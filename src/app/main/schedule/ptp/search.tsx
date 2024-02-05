"use client";

import TitleIndicator from "@/../public/title_indicator.svg";
import { SingleDatePicker } from "@/app/components/datepickers/single-picker";
import { MdTypography } from "@/app/components/typography";
import {
  MdOutlinedCard,
  MdOutlinedTextField,
  MdPrimaryTab,
  MdTabs,
} from "@/app/util/md3";
import { useState } from "react";

export default function PointToPointSearchPanel() {
  const [tabItemId, setTabItemId] = useState("tab-list-search");
  function handleTabChange(newValue: string) {
    if (newValue !== tabItemId) {
      setTabItemId(newValue);
    }
  }

  return (
    <div className="relative mx-6 z-10">
      <div className="flex py-6 gap-4 items-center text-primary">
        <TitleIndicator title="Point to Point Search" />
        <MdTypography variant="title" size="large">
          Point to Point
        </MdTypography>
      </div>
      <MdOutlinedCard className="p-px">
        <MdTabs className="rounded-t-xl">
          <MdPrimaryTab
            id="tab-list-search"
            aria-controls="list-search-panel"
            onClick={() => {
              handleTabChange("tab-list-search");
            }}
          >
            <MdTypography variant="title" size="small">
              Schedule List
            </MdTypography>
          </MdPrimaryTab>
          <MdPrimaryTab
            id="tab-calendar-search"
            aria-controls="calendar-search-panel"
            onClick={() => {
              handleTabChange("tab-calendar-search");
            }}
          >
            <MdTypography variant="title" size="small">
              Schedule Calendar
            </MdTypography>
          </MdPrimaryTab>
        </MdTabs>
        <div
          id="list-search-panel"
          role="tabpanel"
          aria-labelledby="tab-list-search"
          className={`p-6 flex flex-col gap-4 ${
            tabItemId === "tab-list-search" ? "flex" : "hidden"
          }`}
        >
          <SingleDatePicker />
          <MdOutlinedTextField></MdOutlinedTextField>
          <MdOutlinedTextField></MdOutlinedTextField>
        </div>
        <div
          id="calendar-search-panel"
          hidden={tabItemId !== "tab-calendar-search"}
          role="tabpanel"
          aria-labelledby="tab-calendar-search"
          className="p-6"
        >
          Calendar Search Panel
        </div>
      </MdOutlinedCard>
    </div>
  );
}
