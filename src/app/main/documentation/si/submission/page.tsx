"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import SISearchCondition from "./condition";
import { MdChipSet, MdFilterChip } from "@/app/util/md3";
import StatusFilterComponent from "@/app/components/status-filter";
import { SIState } from "@/app/util/typeDef/si";
import SITable from "./table";

export default function SISearch() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="SI Search" />
      <SISearchCondition />
      <div className={styles.area}>
        <MdChipSet>
          <StatusFilterComponent statusOptions={Object.values(SIState)} />
          <MdFilterChip label="My Booking" />
        </MdChipSet>
        <SITable />
      </div>
    </div>
  );
}
