"use client";

import TitleIndicator from "@/../public/title_indicator.svg";
import { MdTypography } from "@/app/components/typography";
import { MdOutlinedCard, MdPrimaryTab, MdTabs } from "@/app/util/md3";
import { useState } from "react";

export default function PointToPointSearchPanel() {
  const [tabItemId, setTabItemId] = useState("tab-list-search");
  function handleTabChange(newValue: string) {
    if (newValue !== tabItemId) {
      setTabItemId(newValue);
    }
  }

  return (
    <div className="flex-1  max-w-[1400px] mx-6">
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
              List
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
              Calendar
            </MdTypography>
          </MdPrimaryTab>
        </MdTabs>
        <div
          id="list-search-panel"
          hidden={tabItemId !== "tab-list-search"}
          role="tabpanel"
          aria-labelledby="tab-list-search"
          className="p-6"
        >
          List Search Panel
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
