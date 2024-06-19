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
import classNames from "classnames";

export default function BookingStatusPage() {
  const router = useRouter();
  const reset = useSetRecoilState(resetBookingState);
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={cx(styles.container, "flex-1")}>
      <div className="flex items-center justify-between">
        <PageTitle
          title="Booking Status"
          category="Booking"
          href="/main/booking/status"
        />
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

      <div className={cx(styles.area, "flex-1")}>
        <BookingStatusTable />
      </div>
    </div>
  );
}
