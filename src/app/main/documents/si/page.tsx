"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import SISearchCondition from "./search-condition";
import SITable from "./table";
import classNames from "classnames";

export default function SISearch() {
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="Shipping Instruction"
        category="Documents"
        href="/main/documents/si"
      />
      <SISearchCondition />
      <div className={cx(styles.area, styles.table)}>
        <SITable />
      </div>
    </div>
  );
}
