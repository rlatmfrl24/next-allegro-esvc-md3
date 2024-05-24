"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import QuotationList from "./list";
import { useRouter } from "next/navigation";

export default function OnlineQuoteResult() {
  const router = useRouter();

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Online Quote" />
      <QuotationList
        onResearch={() => {
          router.back();
        }}
      />
    </div>
  );
}
