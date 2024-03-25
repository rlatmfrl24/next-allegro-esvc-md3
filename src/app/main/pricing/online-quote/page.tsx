"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { useMemo, useState } from "react";
import { createDummyPlaceInformation } from "../../schedule/util";
import { faker } from "@faker-js/faker";
import Condition from "./condition";
import QuotationList from "./list";
import QuotationSelection from "./[contract]/page";
import { DateTime } from "luxon";

export default function OnlineQuote() {
  const [pageState, setPageState] = useState<"condition" | "list">("condition");

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
        }[pageState]
      }
    </div>
  );
}
