"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import SISearchCondition from "./search-condition";
import SITable from "./table";

export default function SISearch() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Shipping Instruction" />
      <SISearchCondition />
      <div className={styles.area}>
        <SITable />
      </div>
    </div>
  );
}
