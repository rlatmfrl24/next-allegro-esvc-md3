"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";

export default function BookingTemplate() {
  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Template" />
      </div>
    </div>
  );
}
