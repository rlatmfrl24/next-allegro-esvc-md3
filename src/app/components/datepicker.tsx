"use client";

import { useEffect, useState } from "react";
import {
  MdElevatedCard,
  MdElevation,
  MdIcon,
  MdIconButton,
  MdOutlinedTextField,
  MdTextButton,
} from "../util/md3";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import styles from "./components.module.css";
import { useCalendar } from "@h6s/calendar";
import { MdTypography } from "./typography";
import { DateTime } from "luxon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function MdDatePicker(props: { defaultValue?: string }) {
  const [invalid, setInvalid] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { headers, body, navigation, cursorDate } = useCalendar();
  const [selectedDate, setSelectedDate] = useState<DateTime>(
    DateTime.fromJSDate(new Date())
  );

  useEffect(() => {
    if (props.defaultValue) {
      if (validateDate(props.defaultValue)) {
        setSelectedDate(DateTime.fromISO(props.defaultValue));
      }
    }
  }, [props.defaultValue, isCalendarOpen]);

  function validateDate(date: string) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(date);
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    middleware: [offset(10), flip(), shift()],
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const DateSelector = () => {
    return (
      <>
        <div className="h-fit grid grid-cols-7">
          {headers.weekDays.map(({ key, value }) => {
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
            {body.value.map((week) => {
              return week.value.map((day, idx) => {
                const { key, date, isCurrentDate, isCurrentMonth, value } = day;

                const dayText = DateTime.fromISO(value.toISOString()).toFormat(
                  "dd"
                );

                return (
                  <div
                    key={key}
                    className={`flex items-center justify-center w-12 h-12`}
                  >
                    <MdIconButton
                      className={`${
                        //today
                        value.toDateString() === new Date().toDateString() &&
                        `border border-primary rounded-full`
                      } ${
                        selectedDate.toMillis() ===
                          DateTime.fromJSDate(value).toMillis() &&
                        `bg-primary rounded-full`
                      }
                      `}
                      onClick={() => {
                        setSelectedDate(DateTime.fromISO(value.toISOString()));
                      }}
                    >
                      <MdTypography
                        variant="body"
                        size="large"
                        className={
                          selectedDate.toMillis() ===
                          DateTime.fromJSDate(value).toMillis()
                            ? "text-white"
                            : isCurrentMonth
                            ? "text-black"
                            : "text-gray-400"
                        }
                      >
                        {dayText}
                      </MdTypography>
                    </MdIconButton>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <MdOutlinedTextField
        ref={refs.setReference}
        {...getReferenceProps()}
        supportingText="MM/DD/YYYY"
        errorText="Invalid date format"
        defaultValue={props.defaultValue}
        onInput={(e) => {
          const targetValue = (e.target as HTMLInputElement).value;
          if (targetValue.length > 4) {
            if (!validateDate(targetValue)) {
              setInvalid(true);
            } else {
              setInvalid(false);
            }
          } else if (targetValue.length === 0) {
            setInvalid(false);
          }
        }}
        error={invalid}
      >
        <MdIconButton slot="trailing-icon">
          <MdIcon>
            <CalendarTodayIcon />
          </MdIcon>
        </MdIconButton>
      </MdOutlinedTextField>
      {isCalendarOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className={styles["datepicker-container"]}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <MdElevation />
            <div className="flex justify-around">
              <div className="flex justify-between items-center">
                <MdIconButton
                  onClick={() => {
                    navigation.toPrev();
                  }}
                >
                  <MdIcon>
                    <ChevronLeftIcon />
                  </MdIcon>
                </MdIconButton>
                <MdTextButton className="pl-5">
                  {DateTime.fromJSDate(cursorDate).toFormat("MMM")}
                  <ArrowDropDownIcon className="ml-2" />
                </MdTextButton>
                <MdIconButton
                  onClick={() => {
                    navigation.toNext();
                  }}
                >
                  <MdIcon>
                    <ChevronRightIcon />
                  </MdIcon>
                </MdIconButton>
              </div>
              <div className="flex justify-between items-center">
                <MdIconButton
                  onClick={() => {
                    // prev year
                    for (let i = 0; i < 12; i++) {
                      navigation.toPrev();
                    }
                  }}
                >
                  <MdIcon>
                    <ChevronLeftIcon />
                  </MdIcon>
                </MdIconButton>
                <MdTextButton className="pl-5">
                  {DateTime.fromJSDate(cursorDate).toFormat("yyyy")}
                  <ArrowDropDownIcon className="ml-2" />
                </MdTextButton>
                <MdIconButton
                  onClick={() => {
                    // next year
                    for (let i = 0; i < 12; i++) {
                      navigation.toNext();
                    }
                  }}
                >
                  <MdIcon>
                    <ChevronRightIcon />
                  </MdIcon>
                </MdIconButton>
              </div>
            </div>
            <DateSelector />
            <div className="flex justify-end mt-2">
              <MdTextButton>Cancel</MdTextButton>
              <MdTextButton>OK</MdTextButton>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
