"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton } from "@/app/util/md3";
import Link from "next/link";
import BookingStatusCondition from "./condition";
import BookingStatusTable from "./table";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { resetBookingState } from "@/app/store/booking.store";

export default function BookingStatusPage() {
  const router = useRouter();
  const reset = useSetRecoilState(resetBookingState);

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Status" />
        <MdOutlinedButton
          onClick={() => {
            reset();
            router.push("/main/booking/request");
          }}
        >
          New Booking
        </MdOutlinedButton>
      </div>
      <BookingStatusCondition />

      <div className={styles.area}>
        <BookingStatusTable />
      </div>
    </div>
  );
}
