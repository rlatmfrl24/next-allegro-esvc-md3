"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { useState } from "react";
import Condition from "./condition";
import QuotationList from "./result/list";
import { useRouter } from "next/navigation";

export default function OnlineQuote() {
  // const [pageState, setPageState] = useState<"condition" | "list">("condition");
  const router = useRouter();

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Online Quote" />
      <Condition
        onSearch={() => {
          router.push("/main/pricing/online-quote/result");
        }}
        onReset={() => {}}
      />
    </div>
  );
}
