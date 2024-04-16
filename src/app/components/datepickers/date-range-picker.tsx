import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ComponentProps, useEffect, useState } from "react";
import { flushSync } from "react-dom";

import { basicPopoverStyles } from "@/app/util/constants";
import {
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import {
  autoUpdate,
  FloatingFocusManager,
  hide,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useCalendar } from "@h6s/calendar";
import {
  ArrowDropDown,
  CalendarTodayOutlined,
  Check,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import { MdTypography } from "../typography";
import { MonthList } from "./util";
import styles from "@/app/styles/datepicker.module.css";
import classNames from "classnames";

type DateRange = {
  start: DateTime | undefined;
  end: DateTime | undefined;
};

export const DateRangePicker = ({
  format = "yyyy-MM-dd",
  initial,
  readonly = false,
  buttonMode = "none",
  onDateChange,
  ...props
}: {
  format?: string;
  initial?: DateRange;
  buttonMode?: "none" | "before" | "after";
  readonly?: boolean;
  onDateChange?: (date: DateRange) => void;
  props?: ComponentProps<typeof MdOutlinedTextField>;
} & ComponentProps<typeof MdOutlinedTextField>) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    initial || {
      start: undefined,
      end: undefined,
    }
  );
  const [selectionMode, setSelectionMode] = useState<"day" | "month" | "year">(
    "day"
  );
  const [inputMode, setInputMode] = useState<"start" | "end">("start");

  const { headers, body, view, cursorDate, navigation } = useCalendar();
  const [beforeCursorDate, setBeforeCursorDate] = useState<Date>(cursorDate);

  useEffect(() => {
    if (cursorDate.toDateString() !== beforeCursorDate.toDateString()) {
      setBeforeCursorDate(cursorDate);
    }
  }, [beforeCursorDate, cursorDate]);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    middleware: [
      offset(8),
      hide(),
      shift({
        crossAxis: true,
      }),
      size({
        apply({ availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight - 100));
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: floatingTransitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {
      outsidePress: () => {
        setSelectedRange({
          start: initial?.start || undefined,
          end: initial?.end || undefined,
        });
        return true;
      },
    }),
    useRole(context),
  ]);

  const cx = classNames.bind(styles);

  useEffect(() => {
    if (!isCalendarOpen) {
      setTimeout(() => {
        setSelectionMode("day");
      }, 100);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarOpen]);

  function handleSelection(value: Date) {
    if (inputMode === "start") {
      setSelectedRange({
        start: DateTime.fromJSDate(value),
        end: DateTime.fromJSDate(value),
      });
      setInputMode("end");
    } else {
      if (
        selectedRange.start &&
        DateTime.fromJSDate(value) > selectedRange.start
      ) {
        setSelectedRange({
          ...selectedRange!,
          end: DateTime.fromJSDate(value),
        });
        setInputMode("start");
      } else {
        setSelectedRange({
          start: DateTime.fromJSDate(value),
          end: DateTime.fromJSDate(value),
        });
        setInputMode("end");
      }
    }
  }

  return (
    <>
      <div className={`relative ${props.className}`}>
        <MdOutlinedTextField
          {...props}
          ref={refs.setReference}
          {...getReferenceProps()}
          readOnly
          required={false}
          className={`w-full ${readonly ? "bg-surfaceContainer" : ""} `}
          placeholder="Select Date Range"
          value={
            selectedRange.start && selectedRange.end
              ? `${selectedRange.start.toFormat(
                  format
                )} ~ ${selectedRange.end.toFormat(format)}`
              : ""
          }
        >
          <MdIcon slot="trailing-icon">
            <CalendarTodayOutlined />
          </MdIcon>
        </MdOutlinedTextField>
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
      <div
        hidden={middlewareData.hide?.referenceHidden}
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
        }}
        {...getFloatingProps()}
        className="z-50"
      >
        {isMounted && (
          <FloatingFocusManager context={context}>
            <div style={floatingTransitionStyles}>
              <MdElevatedCard className="flex">
                <div className="flex">
                  {
                    {
                      before: (
                        <MdList className="rounded-l-xl w-40 bg-surfaceContainer">
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now(),
                                end: DateTime.now().plus({ week: 1 }),
                              });
                            }}
                          >
                            1 Week
                          </MdListItem>
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now(),
                                end: DateTime.now().plus({ week: 2 }),
                              });
                            }}
                          >
                            2 Weeks
                          </MdListItem>
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now(),
                                end: DateTime.now().plus({ week: 3 }),
                              });
                            }}
                          >
                            3 Weeks
                          </MdListItem>
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now(),
                                end: DateTime.now().plus({ week: 4 }),
                              });
                            }}
                          >
                            4 Weeks
                          </MdListItem>
                        </MdList>
                      ),
                      after: (
                        <MdList className="rounded-l-xl w-40 bg-surfaceContainer">
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now(),
                                end: DateTime.now(),
                              });
                            }}
                          >
                            Today
                          </MdListItem>
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now().minus({ week: 1 }),
                                end: DateTime.now(),
                              });
                            }}
                          >
                            - 1 Week
                          </MdListItem>
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now().minus({ week: 2 }),
                                end: DateTime.now(),
                              });
                            }}
                          >
                            - 2 Weeks
                          </MdListItem>
                          <MdListItem
                            type="button"
                            onClick={() => {
                              navigation.setToday();
                              setSelectedRange({
                                start: DateTime.now().minus({ day: 30 }),
                                end: DateTime.now(),
                              });
                            }}
                          >
                            - 30 days
                          </MdListItem>
                        </MdList>
                      ),
                      none: <></>,
                    }[buttonMode]
                  }
                  <div className="flex flex-col bg-surfaceContainerHigh rounded-xl">
                    <div className="flex justify-between p-2">
                      <div aria-label="month-selector" className="flex h-fit">
                        <MdIconButton
                          className={
                            selectionMode !== "day" ? "invisible" : "visible"
                          }
                          onClick={() => {
                            navigation.toPrev();
                          }}
                        >
                          <MdIcon>
                            <ChevronLeft />
                          </MdIcon>
                        </MdIconButton>
                        <MdTextButton
                          trailingIcon
                          onClick={() => {
                            if (selectionMode === "day") {
                              setSelectionMode("month");
                            } else {
                              setSelectionMode("day");
                            }
                          }}
                          disabled={selectionMode === "year"}
                        >
                          <MdTypography variant="label" size="large">
                            {DateTime.fromJSDate(cursorDate).toFormat("MMM")}
                          </MdTypography>
                          <MdIcon
                            slot="icon"
                            className={cx(
                              styles["select-mode-button"],
                              {
                                day: "",
                                month: "rotate-180",
                                year: "invisible",
                              }[selectionMode]
                            )}
                          >
                            <ArrowDropDown fontSize="small" />
                          </MdIcon>
                        </MdTextButton>
                        <MdIconButton
                          className={
                            selectionMode !== "day" ? "invisible" : "visible"
                          }
                          onClick={() => {
                            navigation.toNext();
                          }}
                        >
                          <MdIcon>
                            <ChevronRight />
                          </MdIcon>
                        </MdIconButton>
                      </div>
                      <div aria-label="year-selector">
                        <MdIconButton
                          className={
                            selectionMode !== "day" ? "invisible" : "visible"
                          }
                          onClick={() => {
                            //navigation to previos year
                            navigation.setDate(
                              DateTime.fromJSDate(cursorDate)
                                .minus({ year: 1 })
                                .toJSDate()
                            );
                          }}
                        >
                          <MdIcon>
                            <ChevronLeft />
                          </MdIcon>
                        </MdIconButton>
                        <MdTextButton
                          disabled={selectionMode === "month"}
                          trailingIcon
                          onClick={() => {
                            if (selectionMode === "day") {
                              setSelectionMode("year");
                            } else {
                              setSelectionMode("day");
                            }
                          }}
                        >
                          <MdTypography variant="label" size="large">
                            {DateTime.fromJSDate(cursorDate).toFormat("yyyy")}
                          </MdTypography>
                          <MdIcon
                            slot="icon"
                            className={cx(
                              styles["select-mode-button"],
                              {
                                day: "",
                                month: "invisible",
                                year: "rotate-180",
                              }[selectionMode]
                            )}
                          >
                            <ArrowDropDown fontSize="small" />
                          </MdIcon>
                        </MdTextButton>
                        <MdIconButton
                          className={
                            selectionMode !== "day" ? "invisible" : "visible"
                          }
                          onClick={() => {
                            //navigation to next year
                            navigation.setDate(
                              DateTime.fromJSDate(cursorDate)
                                .plus({ year: 1 })
                                .toJSDate()
                            );
                          }}
                        >
                          <MdIcon>
                            <ChevronRight />
                          </MdIcon>
                        </MdIconButton>
                      </div>
                    </div>
                    {selectionMode === "day" && (
                      <>
                        <motion.div
                          key={cursorDate.toDateString()}
                          animate={{ opacity: 1, x: 0 }}
                          initial={{
                            opacity: 0,
                            x:
                              cursorDate === beforeCursorDate
                                ? 0
                                : cursorDate > beforeCursorDate
                                ? 40
                                : -40,
                          }}
                          transition={{ duration: 0.2 }}
                          className="grid grid-cols-7 mx-2"
                        >
                          {headers.weekDays.map(({ key, value }) => {
                            const weekHead = DateTime.fromJSDate(value)
                              .toFormat("EEE")
                              .charAt(0);
                            return (
                              <div
                                key={key}
                                className="flex items-center justify-center w-12 h-12"
                              >
                                <MdTypography
                                  variant="body"
                                  size="large"
                                  className={
                                    weekHead === "S"
                                      ? "text-error"
                                      : "text-outline"
                                  }
                                >
                                  {weekHead.toUpperCase()}
                                </MdTypography>
                              </div>
                            );
                          })}
                          {body.value.map((week: any) => {
                            return week.value.map((day: any, idx: number) => {
                              const { key, isCurrentMonth, value } = day;
                              const diffStart =
                                selectedRange.start &&
                                DateTime.fromJSDate(value).hasSame(
                                  selectedRange.start,
                                  "day"
                                );

                              const diffEnd =
                                selectedRange.end &&
                                DateTime.fromJSDate(value).hasSame(
                                  selectedRange.end,
                                  "day"
                                );

                              const isBetween =
                                selectedRange.start &&
                                selectedRange.end &&
                                DateTime.fromJSDate(value).startOf("day") >
                                  selectedRange.start.startOf("day") &&
                                DateTime.fromJSDate(value).startOf("day") <
                                  selectedRange.end.startOf("day");

                              return (
                                <div
                                  key={key}
                                  className={cx(styles["date-cell"])}
                                >
                                  {isCurrentMonth ? (
                                    <div
                                      className={cx(
                                        diffStart &&
                                          !diffEnd &&
                                          styles["diff-start"],
                                        diffEnd &&
                                          !diffStart &&
                                          styles["diff-end"],
                                        isBetween && styles["between"]
                                      )}
                                    >
                                      <MdIconButton
                                        className={`${
                                          DateTime.now().toISODate() ===
                                          DateTime.fromJSDate(value).toISODate()
                                            ? "border rounded-full border-primary"
                                            : ""
                                        } ${
                                          diffStart
                                            ? "bg-primary rounded-full"
                                            : ""
                                        } ${
                                          diffEnd
                                            ? "bg-primary rounded-full"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          handleSelection(value);
                                        }}
                                      >
                                        <MdTypography
                                          variant="body"
                                          size="large"
                                          className={`${
                                            diffStart || diffEnd
                                              ? "text-white"
                                              : ""
                                          }`}
                                        >
                                          {value.getDate()}
                                        </MdTypography>
                                      </MdIconButton>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              );
                            });
                          })}
                        </motion.div>
                        <div className="p-2 flex gap-2 justify-end ">
                          <MdOutlinedButton
                            onClick={() => {
                              setSelectedRange({
                                start: initial?.start || undefined,
                                end: initial?.end || undefined,
                              });
                              setIsCalendarOpen(false);
                            }}
                          >
                            Cancel
                          </MdOutlinedButton>
                          <MdFilledButton
                            onClick={() => {
                              onDateChange?.(selectedRange);
                              setIsCalendarOpen(false);
                            }}
                          >
                            OK
                          </MdFilledButton>
                        </div>
                      </>
                    )}
                    {selectionMode === "month" && (
                      <MdList
                        style={{ maxHeight }}
                        className={cx(styles["list-box"])}
                      >
                        <OverlayScrollbarsComponent
                          defer
                          events={{
                            initialized: (instance) => {
                              // move to selected
                              const selected = instance
                                .elements()
                                .viewport.querySelector(".bg-surfaceVariant");
                              if (!selected) return;
                              instance.elements().viewport.scroll({
                                top: (selected as HTMLElement).offsetTop - 100,
                              });
                            },
                          }}
                        >
                          {MonthList.map((month, idx) => {
                            return (
                              <MdListItem
                                key={idx}
                                type="button"
                                className={`${
                                  cursorDate.getMonth() === idx
                                    ? "bg-surfaceVariant"
                                    : ""
                                }`}
                                onClick={() => {
                                  navigation.setDate(
                                    DateTime.fromJSDate(cursorDate)
                                      .set({ month: idx + 1 })
                                      .toJSDate()
                                  );
                                  setSelectionMode("day");
                                }}
                              >
                                {cursorDate.getMonth() === idx && (
                                  <MdIcon slot="start">
                                    <Check />
                                  </MdIcon>
                                )}
                                {month}
                              </MdListItem>
                            );
                          })}
                        </OverlayScrollbarsComponent>
                      </MdList>
                    )}
                    {selectionMode === "year" && (
                      <MdList
                        style={{ maxHeight }}
                        className={cx(styles["list-box"])}
                      >
                        <OverlayScrollbarsComponent
                          defer
                          events={{
                            initialized: (instance) => {
                              // move to selected
                              const selected = instance
                                .elements()
                                .viewport.querySelector(".bg-surfaceVariant");
                              if (!selected) return;
                              instance.elements().viewport.scroll({
                                top: (selected as HTMLElement).offsetTop - 100,
                              });
                            },
                          }}
                        >
                          {Array.from({ length: 100 }, (_, idx) => {
                            const year = DateTime.now().year;
                            return (
                              <MdListItem
                                key={idx}
                                className={`${
                                  cursorDate.getFullYear() === year + idx - 50
                                    ? "bg-surfaceVariant"
                                    : ""
                                }`}
                                type="button"
                                onClick={() => {
                                  navigation.setDate(
                                    DateTime.fromJSDate(cursorDate)
                                      .set({ year: year + idx - 50 })
                                      .toJSDate()
                                  );
                                  setSelectionMode("day");
                                }}
                              >
                                {cursorDate.getFullYear() ===
                                  year + idx - 50 && (
                                  <MdIcon slot="start">
                                    <Check />
                                  </MdIcon>
                                )}
                                {year + idx - 50}
                              </MdListItem>
                            );
                          })}
                        </OverlayScrollbarsComponent>
                      </MdList>
                    )}
                  </div>
                </div>
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </>
  );
};
