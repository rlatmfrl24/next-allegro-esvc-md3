"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { useState } from "react";
import CargoTrackingSearchCondition from "./search-condition";
import TrackingDataList from "./result-list";
import classNames from "classnames";

export default function CargoTracking() {
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="Cargo Tracking"
        category="Tracking"
        href="/main/tracking/cargo"
      />
      <CargoTrackingSearchCondition
        onSearch={() => setPageState("search")}
        onReset={() => setPageState("unsearch")}
      />
      <div className={cx(styles.area, styles.table)}>
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
