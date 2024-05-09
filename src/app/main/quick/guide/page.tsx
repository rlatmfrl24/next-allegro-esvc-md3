"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";

export default function GuideDownloadPage() {
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={cx(styles.container, "h-full")}>
      <PageTitle title="e-Service Guide" />
      <div className={cx(styles.area, "flex-1")}></div>
    </div>
  );
}
