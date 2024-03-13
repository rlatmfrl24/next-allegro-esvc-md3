"use client";

import PageTitle from "@/app/components/page-title";
import moduleStyles from "@/app/styles/base.module.css";
import SISearchCondition from "./condition";

export default function SISearch() {
  return (
    <div aria-label="container" className={moduleStyles.container}>
      <PageTitle title="SI Search" />
      <SISearchCondition />
    </div>
  );
}
