"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton } from "@/app/util/md3";
import { useState } from "react";
import SeaWaybillSearchCondition from "./search-condition";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import SurchargeCodeInquiry from "../surcharge-code-inquiry";
import SeaWaybillResultTable from "./reseult-table";

export default function SeaWaybillPrint() {
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");
  const [isSurchargeCodeInquiryOpen, setIsSurchargeCodeInquiryOpen] =
    useState(false);

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle title="Sea Waybill Print" />
        <MdOutlinedButton
          onClick={() => {
            setIsSurchargeCodeInquiryOpen(true);
          }}
        >
          Surcharge Code Inquiry
        </MdOutlinedButton>
      </div>
      <SeaWaybillSearchCondition
        onReset={() => {
          setPageState("unsearch");
        }}
        onSearch={() => {
          setPageState("search");
        }}
      />
      <div className={styles.area}>
        {pageState === "search" ? (
          <SeaWaybillResultTable />
        ) : (
          <EmptyResultPlaceholder text={"Please search for the B/L."} />
        )}
      </div>
      <SurchargeCodeInquiry
        open={isSurchargeCodeInquiryOpen}
        onOpenChange={setIsSurchargeCodeInquiryOpen}
      />
    </div>
  );
}
