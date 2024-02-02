"use client";

import { DateTime } from "luxon";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import styles from "../components.module.css";
import { useCalendar } from "@h6s/calendar";
import {
  FocusOnInput,
  MonthList,
  YearList,
  getModifiedCursorDate,
  validateDate,
} from "./util";
import NavigationContainer from "./navigation-container";
import ListSelector from "./list-selector";
import { MdTypography } from "../typography";

export const SingleDatePicker = (props: { defaultDate?: DateTime }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [mode, setMode] = useState<"date" | "month" | "year">("date");
  const inputEl = useRef<any>(null);

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

  const { headers, body, navigation, cursorDate } = useCalendar();

  const [invalid, setInvalid] = useState(false);
  const [defaultDate, setDefaultDate] = useState<DateTime>(
    props.defaultDate || DateTime.now()
  );

  function handleDateChange(e: any) {
    let targetValue = e.target.value;

    // pre-processing if value is 8 digits
    if (e.target.value.length === 8) {
      const month = targetValue.substring(0, 2);
      const day = targetValue.substring(2, 4);
      const year = targetValue.substring(4, 8);
      targetValue = `${month}/${day}/${year}`;
    }

    // validate date
    if (targetValue !== "") {
      if (!validateDate(targetValue)) {
        console.log("invalid::->", targetValue);
        e.target.value = defaultDate.toFormat("MM/dd/yyyy");
        setInvalid(true);
      } else {
        console.log("set to date::->", targetValue);
        setDefaultDate(DateTime.fromFormat(targetValue, "MM/dd/yyyy"));
        setInvalid(false);
      }
    }
  }

  function handleListSelection(value: string) {
    navigation.setDate(
      getModifiedCursorDate(value, mode, cursorDate)?.toJSDate()!
    );
    setMode("date");
  }

  useEffect(() => {
    if (!isCalendarOpen) {
      setMode("date");
      FocusOnInput(inputEl);
      navigation.setDate(defaultDate.toJSDate());
    }
  }, [defaultDate, isCalendarOpen, navigation]);

  return (
    <div className="relative flex z-10" ref={refs.setReference}>
      <MdOutlinedTextField
        ref={inputEl}
        className="flex-1"
        supportingText="MM/DD/YYYY"
        errorText="Invalid date format"
        value={defaultDate.toFormat("MM/dd/yyyy")}
        error={invalid}
        onBlur={(e) => {
          handleDateChange(e);
        }}
      >
        <MdIconButton slot="trailing-icon" {...getReferenceProps()}>
          <MdIcon>
            <CalendarTodayIcon />
          </MdIcon>
        </MdIconButton>
      </MdOutlinedTextField>
      {isCalendarOpen && (
        <FloatingFocusManager context={context} modal={true}>
          <div
            className={styles["datepicker-container"]}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <MdElevation />
            <NavigationContainer
              mode={mode}
              setMode={setMode}
              cursorDate={cursorDate}
              navigation={navigation}
            />
            {mode === "month" && (
              <ListSelector
                list={MonthList}
                selectedValue={DateTime.fromJSDate(cursorDate).toFormat("LLLL")}
                selectionHandler={handleListSelection}
              />
            )}
            {mode === "year" && (
              <ListSelector
                list={YearList}
                selectedValue={DateTime.fromJSDate(cursorDate).year.toString()}
                selectionHandler={handleListSelection}
              />
            )}
            {mode === "date" && (
              <div className="p-3">
                <div className="grid grid-cols-7">
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
                        const {
                          key,
                          date,
                          isCurrentDate,
                          isCurrentMonth,
                          value,
                        } = day;
                        const dayText = DateTime.fromISO(
                          value.toISOString()
                        ).toFormat("dd");

                        return (
                          <div
                            key={key}
                            className={`flex items-center justify-center w-12 h-12`}
                          >
                            <MdIconButton
                              className={`${
                                // today
                                value.toDateString() ===
                                  new Date().toDateString() &&
                                `border border-primary rounded-full`
                              } `}
                              onClick={() => {}}
                            >
                              <MdTypography variant="body" size="large">
                                {dayText}
                              </MdTypography>
                            </MdIconButton>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
};
