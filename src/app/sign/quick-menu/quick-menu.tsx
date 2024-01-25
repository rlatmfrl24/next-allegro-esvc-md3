import Notice from "./notice";
import { MdTypography } from "../../components/typography";
import {
  MdElevation,
  MdFilledButton,
  MdIcon,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdPrimaryTab,
  MdSelectOption,
  MdTabs,
  MdTextButton,
} from "../../util/md3";
import { useState } from "react";
import {
  MdSegmentedButton,
  MdSegmentedButtons,
} from "@/app/components/segmented-button";
import styles from "@/app/components/components.module.css";

export default function QuickMenu() {
  return (
    <div className="flex flex-col justify-center gap-6 h-full absolute z-10 right-0 p-16 w-[848px]">
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
    <div className={styles.card}>
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
        className="px-12 py-6"
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
          <MdSegmentedButton id="segment-port">Port Schedule</MdSegmentedButton>
          <MdSegmentedButton id="segment-long-range">
            Long Range Schedule
          </MdSegmentedButton>
        </MdSegmentedButtons>
        <div className="grid grid-cols-2 my-6 gap-4">
          <MdOutlinedSelect label="Origin">
            <MdSelectOption value="north-us">North America</MdSelectOption>
            <MdSelectOption value="south-us">South America</MdSelectOption>
            <MdSelectOption value="europe">Europe</MdSelectOption>
            <MdSelectOption value="asia">Asia</MdSelectOption>
            <MdSelectOption value="africa">Africa</MdSelectOption>
            <MdSelectOption value="oceania">Oceania</MdSelectOption>
          </MdOutlinedSelect>
          <MdOutlinedSelect label="Destination">
            <MdSelectOption value="north-us">North America</MdSelectOption>
            <MdSelectOption value="south-us">South America</MdSelectOption>
            <MdSelectOption value="europe">Europe</MdSelectOption>
            <MdSelectOption value="asia">Asia</MdSelectOption>
            <MdSelectOption value="africa">Africa</MdSelectOption>
            <MdSelectOption value="oceania">Oceania</MdSelectOption>{" "}
          </MdOutlinedSelect>
          <MdOutlinedSelect label="Year">
            {Array.from({ length: 50 }, (_, i) => i + 1990).map((year) => (
              <MdSelectOption key={year} value={year.toString()}>
                {year}
              </MdSelectOption>
            ))}
          </MdOutlinedSelect>
          <MdOutlinedSelect label="Month">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MdSelectOption key={month} value={month.toString()}>
                {month}
              </MdSelectOption>
            ))}
          </MdOutlinedSelect>
        </div>
      </div>
      <div
        id="quick-tracking-panel"
        className={`px-12 py-6 flex-col ${
          tabItemId === "tab-quick-tracking" ? "flex" : "hidden"
        }`}
        role="tabpanel"
        aria-labelledby="tab-quick-tracking"
      >
        <MdTypography target="body" size="medium">
          {`It's fast and easy to track your shipment.`}
        </MdTypography>
        <MdOutlinedTextField
          label=""
          placeholder="B/Ls, Bookings and/or Container numbers"
          supportingText="Enter up to 10 numbers, separately by a space or comma."
          type="textarea"
          className="resize-none"
          rows={5}
        ></MdOutlinedTextField>
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
