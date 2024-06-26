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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useCalendar } from "@h6s/calendar";
import { MonthList, YearList, getModifiedCursorDate } from "./util";
import NavigationContainer from "./navigation-container";
import ListSelector from "./list-selector";
import { motion } from "framer-motion";
import { RangeDateSelector } from "./range-selector";
import styles from "@/app/styles/datepicker.module.css";

export const MdRangeDatePicker = (props: {
  className?: string;
  label?: string;
  defaultStartDate?: DateTime;
  defaultEndDate?: DateTime;
  handleDateRangeSelected?: (dateRange: [DateTime, DateTime]) => void;
  dateFormat?: string;
  disabled?: boolean;
  readonly?: boolean;
}) => {
  const currentDateFormat = props.dateFormat || "yyyy-MM-dd";

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [mode, setMode] = useState<"date" | "month" | "year">("date");
  const [focusStartDate, setFocusStartDate] = useState<DateTime>(
    props.defaultStartDate || DateTime.now()
  );
  const [focusEndDate, setFocusEndDate] = useState<DateTime>(
    props.defaultEndDate || DateTime.now()
  );
  const [defaultDateRange, setDefaultDateRange] = useState<DateTime[]>([
    focusStartDate,
    focusEndDate,
  ]);

  const [isDateRangeValid, setIsDateRangeValid] = useState(true);

  const inputEl = useRef<any>(null);
  const [errorSupportText, setErrorSupportText] = useState("");

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

  const { headers, body, navigation, cursorDate } = useCalendar({
    defaultDate:
      props.defaultStartDate?.toJSDate() || DateTime.now().toJSDate(),
  });

  function handleDateChange(e: any) {
    // ignore if target is md-icon-button
    if (e.target.tagName === "MD-ICON-BUTTON") {
      return;
    }

    let targetValue = e.target.value;

    if (targetValue === "") {
      setIsDateRangeValid(false);
      setErrorSupportText("Date range cannot be empty");
      return;
    }

    const startDate = DateTime.fromFormat(
      (targetValue.split("~")[0] as string).trim(),
      currentDateFormat
    );

    const endDate = DateTime.fromFormat(
      (targetValue.split("~")[1] as string).trim(),
      currentDateFormat
    );

    if (startDate.isValid && endDate.isValid) {
      if (startDate > endDate) {
        setIsDateRangeValid(false);
        setErrorSupportText("Start date cannot be greater than end date");
      } else {
        setIsDateRangeValid(true);
        setErrorSupportText("");
        setDefaultDateRange([startDate, endDate]);
        setFocusStartDate(startDate);
        setFocusEndDate(endDate);
      }
    } else {
      setIsDateRangeValid(false);
      setErrorSupportText("Invalid date format");
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
    }
    setFocusStartDate(defaultDateRange[0]);
    setFocusEndDate(defaultDateRange[1]);
    if (defaultDateRange[0] < defaultDateRange[1]) {
      setIsDateRangeValid(true);
      setErrorSupportText("");
    }
    props.handleDateRangeSelected &&
      props.handleDateRangeSelected([defaultDateRange[0], defaultDateRange[1]]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarOpen]);

  // set default date range if provided
  useEffect(() => {
    if (props.defaultStartDate && props.defaultEndDate)
      setDefaultDateRange([props.defaultStartDate, props.defaultEndDate]);
  }, [props.defaultStartDate, props.defaultEndDate]);

  return (
    <div
      className={`relative flex ${props.className} gap-2 min-w-fit`}
      ref={refs.setReference}
    >
      <MdOutlinedTextField
        ref={inputEl}
        label={props.label}
        className="flex-1"
        value={
          defaultDateRange[0].toFormat(currentDateFormat) +
          " ~ " +
          defaultDateRange[1].toFormat(currentDateFormat)
        }
        errorText={errorSupportText}
        error={
          !isDateRangeValid ||
          errorSupportText.length > 0 ||
          !defaultDateRange[0].isValid ||
          !defaultDateRange[1].isValid
        }
        onBlur={(e) => {
          handleDateChange(e);
        }}
        onClick={
          !props.disabled && !props.readonly
            ? () => {
                setIsCalendarOpen(true);
              }
            : undefined
        }
        readOnly
      >
        <MdIconButton
          slot="trailing-icon"
          {...getReferenceProps()}
          onClick={() => {
            setIsCalendarOpen(true);
          }}
        >
          <MdIcon>
            <CalendarTodayIcon />
          </MdIcon>
        </MdIconButton>
      </MdOutlinedTextField>
      <FloatingFocusManager context={context} modal={true}>
        <div
          className={
            isCalendarOpen && !props.readonly && !props.disabled
              ? "visible z-50"
              : "invisible"
          }
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
            transition={{ type: "spring", duration: 0.3 }}
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
              <RangeDateSelector
                headers={headers}
                body={body}
                cursorDate={cursorDate}
                focusStartDate={focusStartDate}
                focusEndDate={focusEndDate}
                setFocusStartDate={setFocusStartDate}
                setFocusEndDate={setFocusEndDate}
                setIsCalendarOpen={setIsCalendarOpen}
                setDefaultDateRange={setDefaultDateRange}
              />
            )}
          </motion.div>
        </div>
      </FloatingFocusManager>
    </div>
  );
};
