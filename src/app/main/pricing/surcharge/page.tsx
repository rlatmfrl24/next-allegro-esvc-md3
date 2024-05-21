"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { MdFilledButton, MdTextButton } from "@/app/util/md3";
import { useState } from "react";
import { SurchargeSearchTable } from "./table";

export default function SurchargeSearchPage() {
  return <SurchargeSearch />;
}

const MoreFilter = () => {
  return (
    <>
      <MdTextButton>More Filter</MdTextButton>
    </>
  );
};

export const SurchargeSearch = () => {
  const [pageState, setPageState] = useState<"unsearch" | "search">("search");

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Surcharge Search" />
      <div className={styles.area}>
        <div className="flex gap-4 justify-end">
          <MdTextButton
            onClick={() => {
              setPageState("unsearch");
            }}
          >
            Reset
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              setPageState("search");
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
      <div className={styles.area}>
        {pageState === "search" ? (
          <SurchargeSearchTable />
        ) : (
          <EmptyResultPlaceholder text="Please search for the condition." />
        )}
      </div>
    </div>
  );
};
