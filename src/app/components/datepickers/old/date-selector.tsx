import { DateTime } from "luxon";
import { motion } from "framer-motion";
import { MdTypography } from "../../typography";
import { MdIconButton } from "@/app/util/md3";
import { MdTextButton } from "@/app/util/md3";
import { useEffect, useState } from "react";

export const DateSelector = (props: {
  headers: { weekDays: { key: string; value: Date }[] };
  body: any;
  cursorDate: Date;
  focusDate: DateTime;
  setFocusDate: (date: DateTime) => void;
  setIsCalendarOpen: (open: boolean) => void;
  setDefaultDate: (date: DateTime) => void;
}) => {
  const [beforeCursorDate, setBeforeCursorDate] = useState<Date>(
    props.cursorDate
  );

  useEffect(() => {
    if (props.cursorDate.toDateString() !== beforeCursorDate.toDateString()) {
      setBeforeCursorDate(props.cursorDate);
    }
  }, [beforeCursorDate, props.cursorDate]);

  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.3,
      }}
      className="p-3"
    >
      <motion.div
        layout
        key={props.cursorDate.toDateString()}
        animate={{ opacity: 1, x: 0 }}
        initial={{
          opacity: 0,
          x:
            props.cursorDate === beforeCursorDate
              ? 0
              : props.cursorDate > beforeCursorDate
              ? 40
              : -40,
        }}
        exit={{
          opacity: 0,
          x:
            props.cursorDate === beforeCursorDate
              ? 0
              : props.cursorDate > beforeCursorDate
              ? 40
              : -40,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="grid grid-cols-7">
          {props.headers.weekDays.map(({ key, value }) => {
            const weekHead = DateTime.fromJSDate(value)
              .toFormat("EEE")
              .charAt(0);
            return (
              <div
                key={key}
                className="flex items-center justify-center w-12 h-12"
              >
                <MdTypography variant="body" size="large">
                  {weekHead.toUpperCase()}
                </MdTypography>
              </div>
            );
          })}
        </div>
        <div className="flex flex-1 items-start">
          <div className="h-fit flex-1 grid grid-cols-7">
            {props.body.value.map((week: any) => {
              return week.value.map((day: any, idx: number) => {
                const { key, isCurrentMonth, value } = day;
                const dayText = DateTime.fromISO(value.toISOString()).toFormat(
                  "dd"
                );

                return (
                  <motion.div
                    key={key}
                    className={`flex items-center justify-center w-12 h-12`}
                  >
                    <MdIconButton
                      className={`${
                        // today
                        value.toDateString() === new Date().toDateString() &&
                        `border border-primary rounded-full`
                      } ${
                        props.focusDate.hasSame(
                          DateTime.fromJSDate(value),
                          "day"
                        ) && `bg-primary rounded-full`
                      }`}
                      onClick={() => {
                        props.setFocusDate(DateTime.fromJSDate(value));
                      }}
                    >
                      <MdTypography
                        variant="body"
                        size="large"
                        className={
                          props.focusDate.hasSame(
                            DateTime.fromJSDate(value),
                            "day"
                          )
                            ? `text-white`
                            : isCurrentMonth
                            ? `text-onSurface`
                            : `text-onSurfaceVariant`
                        }
                      >
                        {dayText}
                      </MdTypography>
                    </MdIconButton>
                  </motion.div>
                );
              });
            })}
          </div>
        </div>
      </motion.div>
      <div className="flex justify-end">
        <MdTextButton
          onClick={() => {
            props.setIsCalendarOpen(false);
          }}
        >
          Cancel
        </MdTextButton>
        <MdTextButton
          onClick={() => {
            props.setDefaultDate(props.focusDate);
            props.setIsCalendarOpen(false);
          }}
        >
          OK
        </MdTextButton>
      </div>
    </motion.div>
  );
};
