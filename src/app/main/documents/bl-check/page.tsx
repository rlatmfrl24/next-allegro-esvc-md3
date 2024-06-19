"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import BLCheckSearchCondition from "./search-condition";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { useState } from "react";
import BLCheckResultTable from "./reseult-table";
import { MdOutlinedButton } from "@/app/util/md3";
import SurchargeCodeInquiry from "../surcharge-code-inquiry";
import classNames from "classnames";

export default function BLCheck() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");
  const [isSurchargeCodeInquiryOpen, setIsSurchargeCodeInquiryOpen] =
    useState(false);

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle
          title="B/L Check (Outbound)"
          category="Documents"
          href="/main/documents/bl-check"
        />
        <MdOutlinedButton
          onClick={() => {
            setIsSurchargeCodeInquiryOpen(true);
          }}
        >
          Surcharge Code Inquiry
        </MdOutlinedButton>
      </div>
      <BLCheckSearchCondition
        onReset={() => {
          setPageState("unsearch");
        }}
        onSearch={() => {
          setPageState("search");
        }}
      />
      <div className={cx(styles.area, styles.table)}>
        {pageState === "search" ? (
          <BLCheckResultTable />
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
