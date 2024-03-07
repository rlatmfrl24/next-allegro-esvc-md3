"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton } from "@/app/util/md3";
import Link from "next/link";
import EmptyResultPlaceholder from "../../schedule/empty-placeholder";
import BookingStatusCondition from "./condition";

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

      <EmptyResultPlaceholder />
    </div>
  );
}
