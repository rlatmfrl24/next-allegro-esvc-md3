"use client";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdFilledButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";
import { DetentionStatusTable } from "./table";

export default function DetentionStatusPage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [currentTab, setCurrentTab] = useState<"outbound" | "inbound">(
    "outbound"
  );
  const [searchType, setSearchType] = useState<"gate" | "number">("gate");
  const tempContracts = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Detention Status" />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="Outbound (Export)"
            selected={currentTab === "outbound"}
            onClick={() => setCurrentTab("outbound")}
          />
          <MdOutlinedSegmentedButton
            label="Inbound (Import)"
            selected={currentTab === "inbound"}
            onClick={() => setCurrentTab("inbound")}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4">
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="cursor-pointer"
          >
            <MdRadio
              className="mr-2"
              checked={searchType === "gate"}
              onClick={() => setSearchType("gate")}
            />
            Discharging/Out Gate
          </MdTypography>
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="cursor-pointer"
          >
            <MdRadio
              className="mr-2"
              checked={searchType === "number"}
              onClick={() => setSearchType("number")}
            />
            Booking No. or B/L No.
          </MdTypography>
        </div>
        {searchType === "gate" ? (
          <div className="flex gap-4">
            <DateRangePicker label="Date" />
            <NAOutlinedListBox options={tempContracts} label="Contract No." />
          </div>
        ) : (
          <div className="flex gap-4">
            <NAOutlinedTextField label="Booking No. or B/L No." value="" />
          </div>
        )}
        <div className="flex gap-4 justify-end">
          <MdTextButton
            onClick={() => {
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
      <div className={styles.area}>
        {pageState === "search" ? (
          <DetentionStatusTable />
        ) : (
          <EmptyResultPlaceholder
            text="Please select the search criteria and click the search button."
            className="my-12"
          />
        )}
      </div>
    </div>
  );
}
