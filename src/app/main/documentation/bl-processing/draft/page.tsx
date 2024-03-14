"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import BLCheckSearchCondition from "./search-condition";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { useState } from "react";
import BLCheckResultTable from "./reseult-table";

export default function BLCheck() {
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="B/L Check" />
      <BLCheckSearchCondition
        onReset={() => {
          setPageState("unsearch");
        }}
        onSearch={() => {
          setPageState("search");
        }}
      />
      <div className={styles.area}>
        {pageState === "search" ? (
          <BLCheckResultTable />
        ) : (
          <EmptyResultPlaceholder text={"Please search for the B/L."} />
        )}
      </div>
    </div>
  );
}
