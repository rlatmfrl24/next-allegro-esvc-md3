"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";

export default function TariffPage() {
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <div className="flex justify-between items-center">
        <PageTitle title="Tariff" />
      </div>
    </div>
  );
}
