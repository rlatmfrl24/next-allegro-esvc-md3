"use client";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import classNames from "classnames";
import { useState } from "react";
import { BLIssueRequestTable } from "./table";

export default function BLIssueRequest() {
  const cx = classNames.bind(styles);
  const [bookingNumberQuery, setBookingNumberQuery] = useState<string>("");
  const [bookingNumberList, setBookingNumberList] = useState<string[]>([]);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="B/L Issue Request"
        category="Documents"
        href="/main/documents"
      />
      <div className={cx(styles.area)}>
        <div className="flex gap-2">
          <div className="flex gap-2 flex-1">
            <DateRangePicker label="ETD Date" />
            <div className="flex flex-col gap-2 w-[864px]">
              <NAOutlinedTextField
                label="Booking No. (Multi)"
                value={bookingNumberQuery}
                handleValueChange={(value) => setBookingNumberQuery(value)}
                onKeyDown={(e) => {
                  const value = e.currentTarget.value;
                  if (e.key === "Enter") {
                    if (!bookingNumberList.includes(value)) {
                      setBookingNumberList([...bookingNumberList, value]);
                      setBookingNumberQuery("");
                    }
                  }
                }}
              />
              <MdChipSet>
                {bookingNumberList.map((bookingNumber, index) => (
                  <MdInputChip
                    className={styles.pointChip}
                    key={bookingNumber}
                    label={bookingNumber}
                    selected
                    remove={() => {
                      setBookingNumberList((prev) => {
                        return prev.filter(
                          (prevBookingNumber) =>
                            prevBookingNumber !== bookingNumber
                        );
                      });
                    }}
                  />
                ))}
              </MdChipSet>
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <MdTextButton>Reset</MdTextButton>
            <MdFilledButton>Search</MdFilledButton>
          </div>
        </div>
      </div>
      <div className={cx(styles.area, "flex-1")}>
        <BLIssueRequestTable />
      </div>
    </div>
  );
}
