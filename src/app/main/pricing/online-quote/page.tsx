"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { useMemo, useState } from "react";
import { createDummyPlaceInformation } from "../../schedule/util";
import { faker } from "@faker-js/faker";
import Condition from "./condition";
import QuotationList from "./list";

export default function OnlineQuote() {
  const [pageState, setPageState] = useState<
    "condition" | "list" | "selection"
  >("condition");

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Online Quote" />
      {
        {
          condition: (
            <Condition
              onSearch={() => setPageState("list")}
              onReset={() => setPageState("condition")}
            />
          ),
          list: <QuotationList onResearch={() => setPageState("condition")} />,
          selection: <div>selection</div>,
        }[pageState]
      }
    </div>
  );
}
