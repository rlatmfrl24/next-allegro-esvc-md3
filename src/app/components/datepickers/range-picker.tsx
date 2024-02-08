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
import { MonthList, YearList, getModifiedCursorDate } from "./util";
import NavigationContainer from "./navigation-container";
import ListSelector from "./list-selector";
import { motion } from "framer-motion";
import { RangeDateSelector } from "./range-selector";

export const MdRangeDatePicker = (props: {
  className?: string;
  defautStartDate?: DateTime;
  defaultEndDate?: DateTime;
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [mode, setMode] = useState<"date" | "month" | "year">("date");
  const [focusStartDate, setFocusStartDate] = useState<DateTime>(
    props.defautStartDate || DateTime.now()
  );
  const [focusEndDate, setFocusEndDate] = useState<DateTime>(
    props.defaultEndDate || DateTime.now()
  );
  const [defaultDateRange, setDefaultDateRange] = useState<DateTime[]>([
    focusStartDate,
    focusEndDate,
  ]);
  const [startInvalid, setStartInvalid] = useState(false);
  const [endInvalid, setEndInvalid] = useState(false);

  const inputEl = useRef<any>(null);
  const [errorSupportText, setErrorSupportText] = useState("");

  const { refs, floatingStyles, context } = useFloating({
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    middleware: [offset(10), flip(), shift()],
    placement: "bottom-end",
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
    defaultDate: props.defautStartDate?.toJSDate() || DateTime.now().toJSDate(),
  });

  function handleDateChange(e: any, target: "start" | "end") {
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
      const inputDate = DateTime.fromFormat(targetValue, "MM/dd/yyyy");

      if (inputDate.isValid) {
        if (target === "start") {
          // target is start
          if (inputDate > defaultDateRange[1]) {
            // error: start date is greater than end date
            setDefaultDateRange([defaultDateRange[0], defaultDateRange[1]]);
            setStartInvalid(true);
            setErrorSupportText("Invalid date range");
          } else {
            // Date range is valid
            setDefaultDateRange([inputDate, defaultDateRange[1]]);
            setStartInvalid(false);
            setEndInvalid(false);
            navigation.setDate(inputDate.toJSDate());
          }
        } else {
          // target is end
          if (inputDate < defaultDateRange[0]) {
            // error: end date is less than start date
            setDefaultDateRange([defaultDateRange[0], defaultDateRange[1]]);
            setEndInvalid(true);
            setErrorSupportText("Invalid date range");
          } else {
            // Date range is valid
            setDefaultDateRange([defaultDateRange[0], inputDate]);
            setStartInvalid(false);
            setEndInvalid(false);
            navigation.setDate(inputDate.toJSDate());
          }
        }
      } else {
        if (target === "start") {
          e.target.value = defaultDateRange[0].toFormat("MM/dd/yyyy");
        } else {
          e.target.value = defaultDateRange[1].toFormat("MM/dd/yyyy");
        }
        setErrorSupportText("Invalid date format");
        if (target === "start") {
          setStartInvalid(true);
        } else {
          setEndInvalid(true);
        }
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
    }
    setFocusStartDate(defaultDateRange[0]);
    setFocusEndDate(defaultDateRange[1]);
    if (defaultDateRange[0] < defaultDateRange[1]) {
      setStartInvalid(false);
      setEndInvalid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarOpen]);

  return (
    <div
      className={`relative flex ${props.className} gap-2`}
      ref={refs.setReference}
    >
      <MdOutlinedTextField
        ref={inputEl}
        label="From"
        className="flex-1"
        value={defaultDateRange[0].toFormat("MM/dd/yyyy")}
        supportingText="MM/DD/YYYY"
        errorText={errorSupportText}
        error={startInvalid}
        onBlur={(e) => {
          handleDateChange(e, "start");
        }}
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
      <MdOutlinedTextField
        ref={inputEl}
        label="To"
        className="flex-1"
        value={defaultDateRange[1].toFormat("MM/dd/yyyy")}
        supportingText="MM/DD/YYYY"
        errorText={errorSupportText}
        error={endInvalid}
        onBlur={(e) => {
          handleDateChange(e, "end");
        }}
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
      <FloatingFocusManager context={context} modal={false}>
        <div
          className={isCalendarOpen ? "visible" : "invisible"}
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
