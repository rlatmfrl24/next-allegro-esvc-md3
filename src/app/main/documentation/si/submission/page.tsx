"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import SISearchCondition from "./condition";
import { MdChipSet, MdFilterChip } from "@/app/util/md3";
import StatusFilterComponent from "@/app/components/status-filter";

const statusOptions = [
  "Temporary Saved",
  "Submit",
  "Change Requested",
  "Change Requested Rejected",
  "Confirmed",
  "Rejected",
  "Pending",
  "B/L Issue Request",
  "B/L Issue Confirm",
  "B/L Issue Rejected",
  "B/L Issue Pending",
  "B/L Issue Closed",
];

export default function SISearch() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="SI Search" />
      <SISearchCondition />
      <div className={styles.area}>
        <MdChipSet>
          <StatusFilterComponent statusOptions={statusOptions} />
          <MdFilterChip label="My Booking" />
        </MdChipSet>
      </div>
    </div>
  );
}
