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
import { useCalendar } from "@h6s/calendar";
import {
  FocusOnInput,
  MonthList,
  YearList,
  getModifiedCursorDate,
} from "./util";
import NavigationContainer from "./navigation-container";
import ListSelector from "./list-selector";
import { motion } from "framer-motion";
import { DateSelector } from "./date-selector";
import styles from "@/app/styles/datepicker.module.css";
import { MdTypography } from "../typography";

export const MdSingleDatePicker = (props: {
  label?: string;
  defaultDate?: DateTime;
  className?: string;
  required?: boolean;
  handleDateChange?: (date: DateTime) => void;
  dateFormat?: string;
}) => {
  const currentDateFormat = props.dateFormat || "yyyy-MM-dd";
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [mode, setMode] = useState<"date" | "month" | "year">("date");
  const inputEl = useRef<any>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    middleware: [offset(10), shift()],
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
  const [focusDate, setFocusDate] = useState<DateTime>(
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
      const inputDate = DateTime.fromFormat(targetValue, currentDateFormat);

      if (inputDate.isValid) {
        setDefaultDate(DateTime.fromFormat(targetValue, currentDateFormat));
        setFocusDate(DateTime.fromFormat(targetValue, currentDateFormat));
        navigation.setDate(inputDate.toJSDate());
        setInvalid(false);
      } else {
        e.target.value = defaultDate.toFormat(currentDateFormat);
        setInvalid(true);
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
    props.handleDateChange?.(defaultDate);
    setFocusDate(defaultDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDate]);

  useEffect(() => {
    if (!isCalendarOpen) {
      setMode("date");
      FocusOnInput(inputEl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarOpen]);

  return (
    <div className={`relative flex ${props.className}`} ref={refs.setReference}>
      <MdOutlinedTextField
        ref={inputEl}
        label={props.label}
        className="flex-1"
        value={defaultDate.toFormat(currentDateFormat)}
        errorText="Invalid date format"
        error={invalid}
        onBlur={(e) => {
          handleDateChange(e);
        }}
        readOnly
      >
        <MdIconButton slot="trailing-icon" {...getReferenceProps()}>
          <MdIcon>
            <CalendarTodayIcon />
          </MdIcon>
        </MdIconButton>
      </MdOutlinedTextField>
      <FloatingFocusManager context={context} modal={false}>
        <div
          className={isCalendarOpen ? "visible z-20" : "invisible"}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <motion.div
            layout
            animate={{
              opacity: isCalendarOpen ? 1 : 0,
              y: isCalendarOpen ? 0 : -10,
            }}
            className={styles["datepicker-container"]}
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
              <DateSelector
                headers={headers}
                body={body}
                focusDate={focusDate}
                cursorDate={cursorDate}
                setFocusDate={setFocusDate}
                setIsCalendarOpen={setIsCalendarOpen}
                setDefaultDate={setDefaultDate}
              />
            )}
          </motion.div>
        </div>
      </FloatingFocusManager>
      {props.required && (
        <MdTypography
          variant="label"
          size="large"
          className="text-error absolute top-0.5 left-1.5"
        >
          *
        </MdTypography>
      )}
    </div>
  );
};
