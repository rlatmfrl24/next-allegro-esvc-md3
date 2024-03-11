"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";
import LocationScheduleSection from "../../components/location-schedule";

export default function BookingConfirmationInformation() {
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Booking Confirmation Information" />
      <div className={cx(styles.area, styles["no-padding"], "overflow-hidden")}>
        <div className="bg-secondaryContainer h-4"></div>
        <div className="px-6 pt-4 pb-8"></div>
      </div>
    </div>
  );
}
