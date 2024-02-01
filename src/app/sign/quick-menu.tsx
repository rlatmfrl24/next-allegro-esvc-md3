import { MdTypography } from "../components/typography";
import {
  MdElevation,
  MdFilledButton,
  MdPrimaryTab,
  MdTabs,
  MdTextButton,
} from "../util/md3";
import { useState } from "react";
import styles from "@/app/components/components.module.css";
import QuickTracking from "@/app/components/quick/tracking";
import QuickSchedule from "@/app/components/quick/schedule";
import QuickNotice from "@/app/components/quick/notice";

export default function QuickMenu() {
  return (
    <div className="flex flex-col justify-center gap-6 h-full absolute z-10 right-0 p-16 w-[848px]">
      <QuickSearch />
      <div className={styles["sign-card"] + ` p-12`}>
        <MdElevation />
        <MdTypography variant="title" size="large" className="mb-4">
          Notice
        </MdTypography>
        <QuickNotice />
      </div>
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
    <div className={styles["sign-card"]}>
      <MdElevation />
      <MdTabs className="rounded-t-2xl">
        <MdPrimaryTab
          id="tab-schedule"
          aria-controls="schedule-panel"
          onClick={() => {
            handleTabChange("tab-schedule");
          }}
        >
          <MdTypography variant="title" size="small">
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
          <MdTypography variant="title" size="small">
            Quick Tracking
          </MdTypography>
        </MdPrimaryTab>
      </MdTabs>
      <div
        id="schedule-panel"
        className="px-12 py-6"
        role="tabpanel"
        aria-labelledby="tab-schedule"
        hidden={tabItemId !== "tab-schedule"}
      >
        <QuickSchedule />
      </div>
      <div
        id="quick-tracking-panel"
        className={`px-12 py-6 flex-col ${
          tabItemId === "tab-quick-tracking" ? "flex" : "hidden"
        }`}
        role="tabpanel"
        aria-labelledby="tab-quick-tracking"
      >
        <QuickTracking />
      </div>
      <div
        aria-label="quick-search-button"
        className="px-12 py-4 flex justify-end "
      >
        <MdTextButton>Clear</MdTextButton>
        <MdFilledButton>Search</MdFilledButton>
      </div>
    </div>
  );
};