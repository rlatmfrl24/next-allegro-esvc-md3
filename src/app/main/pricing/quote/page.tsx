"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import Condition from "./condition";
import { useRouter } from "next/navigation";

export default function OnlineQuote() {
  const router = useRouter();

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Instant Quote" />
      <Condition
        onSearch={() => {
          router.push("/main/pricing/online-quote/result");
        }}
        onReset={() => {}}
      />
    </div>
  );
}
