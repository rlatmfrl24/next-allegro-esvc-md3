import Notice from "./notice";
import style from "../sign.module.css";
import { MdTypography } from "../../components/typography";
import { MdElevation, MdPrimaryTab, MdTabs } from "../../util/md3";
import { useState } from "react";
import {
  MdSegmentedButton,
  MdSegmentedButtons,
} from "@/app/components/segmented-button";

export default function QuickMenu() {
  return (
    <div className="flex flex-col gap-6 h-full absolute z-10 right-0 p-16 w-[848px]">
      <QuickSearch />
      <Notice />
    </div>
  );
}

const QuickSearch = () => {
  const [tabItemId, setTabItemId] = useState("tab-schedule");

  function handleTabChange(newValue: string) {
    if (newValue !== tabItemId) {
      setTabItemId(newValue);
    }
  }

  return (
    <div className={style.card}>
      <MdElevation />
      <MdTabs className="rounded-t-2xl">
        <MdPrimaryTab
          id="tab-schedule"
          aria-controls="schedule-panel"
          onClick={() => {
            handleTabChange("tab-schedule");
          }}
        >
          <MdTypography target="title" size="small">
            Schedule
          </MdTypography>
        </MdPrimaryTab>
        <MdPrimaryTab
          id="tab-quick-tracking"
          aria-controls="quick-tracking-panel"
          onClick={() => {
            handleTabChange("tab-quick-tracking");
          }}
        >
          <MdTypography target="title" size="small">
            Quick Tracking
          </MdTypography>
        </MdPrimaryTab>
      </MdTabs>
      <div
        id="schedule-panel"
        className="p-4"
        role="tabpanel"
        aria-labelledby="tab-schedule"
        hidden={tabItemId !== "tab-schedule"}
      >
        <MdSegmentedButtons
          value="segment-schedule"
          onChange={(value) => {
            console.log(value);
          }}
        >
          <MdSegmentedButton id="segment-schedule">Schedule</MdSegmentedButton>
          <MdSegmentedButton disabled id="segment-port">
            Port Schedule
          </MdSegmentedButton>
          <MdSegmentedButton id="segment-long-range">
            Long Range Schedule
          </MdSegmentedButton>
        </MdSegmentedButtons>
      </div>
      <div
        id="quick-tracking-panel"
        className="p-4"
        role="tabpanel"
        aria-labelledby="tab-quick-tracking"
        hidden={tabItemId !== "tab-quick-tracking"}
      >
        Quick Tracking panel
      </div>
    </div>
  );
};
