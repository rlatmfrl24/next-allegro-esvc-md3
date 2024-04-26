import { MdTypography } from "../components/typography";
import {
  MdElevatedCard,
  MdElevation,
  MdFilledButton,
  MdPrimaryTab,
  MdTabs,
  MdTextButton,
} from "../util/md3";
import { useState } from "react";
import QuickTracking from "@/app/components/quick/tracking";
import QuickSchedule from "@/app/components/quick/schedule";
import QuickNotice from "@/app/components/quick/notice";
import Link from "next/link";

export default function QuickMenu() {
  return (
    <div className="flex flex-col justify-center gap-6 h-full absolute z-10 right-16 w-[848px] px-16">
      <QuickSearch />
      <MdElevatedCard>
        <div className="px-6 py-2 flex items-center justify-between border-b border-b-outlineVariant">
          <MdTypography variant="title" size="large" className="">
            Notice
          </MdTypography>
          <Link href="/main/import/notice">
            <MdTextButton>More</MdTextButton>
          </Link>
        </div>
        <div className="px-6 pt-4 pb-6 flex flex-col gap-4">
          <QuickNotice />
        </div>
      </MdElevatedCard>
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
    <MdElevatedCard className="z-10 h-[26rem]">
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
      {tabItemId === "tab-schedule" && (
        <div
          id="schedule-panel"
          className="flex flex-col flex-1 px-6 py-4"
          role="tabpanel"
          aria-labelledby="tab-schedule"
        >
          <QuickSchedule />
        </div>
      )}
      {tabItemId === "tab-quick-tracking" && (
        <div
          id="quick-tracking-panel"
          className={`flex-1 flex px-6 py-4 gap-4 flex-col`}
          role="tabpanel"
          aria-labelledby="tab-quick-tracking"
        >
          <QuickTracking />
        </div>
      )}
    </MdElevatedCard>
  );
};
