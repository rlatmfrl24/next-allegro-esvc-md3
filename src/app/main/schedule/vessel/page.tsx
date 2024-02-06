"use client";

import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { MdTypography } from "@/app/components/typography";
import { MdOutlinedCard } from "@/app/util/md3";
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
    <div className="relative flex-1 flex flex-col w-full">
      <AnimatePresence>
        {!isScrollTop && (
          <motion.div
            initial={{ y: -190 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{
              duration: 0.5,
              type: "spring",
            }}
            className="absolute top-0 w-full h-48 bg-red-300 z-20"
          >
            1
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={scrollContainerRef}
        className="relative flex justify-center flex-auto h-0 overflow-auto w-full p-6"
      >
        <div className="max-w-[1400px] w-full">
          <MdOutlinedCard className={`flex-1 flex flex-col gap-3 z-10 p-6`}>
            <>
              <MdSingleDatePicker
                className="z-20"
                handleDateChange={setFirstDate}
              />
              <MdSingleDatePicker className="z-10" />
              <MdRangeDatePicker />
            </>
          </MdOutlinedCard>
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
    </div>
  );
}
