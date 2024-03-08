"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton } from "@/app/util/md3";
import Link from "next/link";
import BookingStatusCondition from "./condition";
import BookingStatusTable from "./table";
import StatusFilterComponent from "./components/status-filter";

export default function BookingStatus() {
  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Status" />
        <Link href={`/main/booking/request`}>
          <MdOutlinedButton>New Booking</MdOutlinedButton>
        </Link>
      </div>
      <BookingStatusCondition />

      <div className={styles.area}>
        <StatusFilterComponent />
        <BookingStatusTable />
      </div>
    </div>
  );
}
