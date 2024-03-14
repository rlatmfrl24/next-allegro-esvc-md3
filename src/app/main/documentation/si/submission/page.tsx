"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import SISearchCondition from "./condition";
import SITable from "./table";

export default function SISearch() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="SI Search" />
      <SISearchCondition />
      <div className={styles.area}>
        <SITable />
      </div>
    </div>
  );
}
