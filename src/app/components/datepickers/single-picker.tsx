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
import { MonthList } from "@/app/main/constants";
import { FocusOnInput, getModifiedCursorDate, validateDate } from "./util";
import NavigationContainer from "./navigation-container";
import ListSelector from "./list-selector";

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
    }
  }, [isCalendarOpen]);

  const yearList = Array.from({ length: 100 }, (_, i) => {
    return (defaultDate.year - 50 + i).toString();
  });

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
                list={yearList}
                selectedValue={DateTime.fromJSDate(cursorDate).year.toString()}
                selectionHandler={handleListSelection}
              />
            )}
            {mode === "date" && <div></div>}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
};
