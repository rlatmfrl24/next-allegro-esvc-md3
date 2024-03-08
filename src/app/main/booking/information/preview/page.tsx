"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";

export default function BookingRequestPreview() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Booking Request Preview" />
    </div>
  );
}
