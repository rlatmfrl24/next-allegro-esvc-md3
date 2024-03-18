"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import { useState } from "react";
import CargoTrackingSearchCondition from "./search-condition";
import TrackingDataList from "./result-list";

export default function CargoTracking() {
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Cargo Tracking" />
      <CargoTrackingSearchCondition
        onSearch={() => setPageState("search")}
        onReset={() => setPageState("unsearch")}
      />
      <div className={styles.area}>
        {
          {
            search: <TrackingDataList />,
            unsearch: (
              <EmptyResultPlaceholder text={"Please search for the cargo."} />
            ),
          }[pageState]
        }
      </div>
    </div>
  );
}
