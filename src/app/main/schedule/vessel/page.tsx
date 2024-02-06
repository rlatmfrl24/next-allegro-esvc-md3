"use client";

import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { MdTypography } from "@/app/components/typography";
import { MdFilledButton, MdOutlinedCard } from "@/app/util/md3";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
export default function VesselSchedule() {
  const [firstDate, setFirstDate] = useState<DateTime | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: scrollContainerRef,
  });
  const [isScrollTop, setIsScrollTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);

    if (latest < 100) {
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }
  });

  return (
    <div
      ref={scrollContainerRef}
      className="relative overflow-auto items-center flex flex-col gap-3 flex-1 w-full"
    >
      <div className="relative w-full max-w-[1400px] p-6">
        <div className="sticky top-0 pt-3 z-50 h-96">
          <motion.div layout>
            {isScrollTop ? (
              <MdOutlinedCard className="p-5 my-5 z-10">
                <MdSingleDatePicker
                  className="z-20"
                  handleDateChange={setFirstDate}
                />
                <MdSingleDatePicker className="z-10" />
                <MdRangeDatePicker />
              </MdOutlinedCard>
            ) : (
              <div className="border">
                <MdTypography variant="title" size="large">
                  {firstDate ? firstDate.toISODate() : "No date selected"}
                </MdTypography>
              </div>
            )}
          </motion.div>
        </div>

        <MdOutlinedCard className="flex flex-col gap-3 p-5 my-5 ">
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
          <MdTypography variant="title" size="large">
            {firstDate ? firstDate.toISODate() : "No date selected"}
          </MdTypography>
        </MdOutlinedCard>
      </div>
    </div>
  );
}
