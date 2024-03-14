"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import BLCheckSearchCondition from "./search-condition";

export default function BLCheck() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="B/L Check" />
      <BLCheckSearchCondition />
    </div>
  );
}
