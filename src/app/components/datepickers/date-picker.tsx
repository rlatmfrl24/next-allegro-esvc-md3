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
  flip,
  FloatingFocusManager,
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

export const DatePicker = ({
  format = "yyyy-MM-dd",
  initialDate,
  onDateChange,
  readonly = false,
  ...props
}: {
  format?: string;
  initialDate?: DateTime;
  onDateChange?: (date: DateTime) => void;
  readonly?: boolean;
  props?: ComponentProps<typeof MdOutlinedTextField>;
} & ComponentProps<typeof MdOutlinedTextField>) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateTime | undefined>(
    initialDate
  );
  const [selectionMode, setSelectionMode] = useState<"day" | "month" | "year">(
    "day"
  );

  const { headers, body, view, cursorDate, navigation } = useCalendar();
  const [beforeCursorDate, setBeforeCursorDate] = useState<Date>(cursorDate);

  useEffect(() => {
    if (cursorDate.toDateString() !== beforeCursorDate.toDateString()) {
      setBeforeCursorDate(cursorDate);
    }
  }, [beforeCursorDate, cursorDate]);

  const { refs, floatingStyles, context } = useFloating({
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    middleware: [
      offset(8),
      flip(),
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
        setSelectedDate(initialDate);
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

    if (initialDate) {
      navigation.setDate(initialDate.toJSDate());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarOpen]);

  const MonthHeader = () => {
    return (
      <div aria-label="month-selector" className="flex h-fit ">
        <MdIconButton
          className={selectionMode !== "day" ? "invisible" : "visible"}
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
          className={selectionMode !== "day" ? "invisible" : "visible"}
          onClick={() => {
            navigation.toNext();
          }}
        >
          <MdIcon>
            <ChevronRight />
          </MdIcon>
        </MdIconButton>
      </div>
    );
  };

  const YearHeader = () => {
    return (
      <div aria-label="year-selector">
        <MdIconButton
          className={selectionMode !== "day" ? "invisible" : "visible"}
          onClick={() => {
            //navigation to previos year
            navigation.setDate(
              DateTime.fromJSDate(cursorDate).minus({ year: 1 }).toJSDate()
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
          className={selectionMode !== "day" ? "invisible" : "visible"}
          onClick={() => {
            //navigation to next year
            navigation.setDate(
              DateTime.fromJSDate(cursorDate).plus({ year: 1 }).toJSDate()
            );
          }}
        >
          <MdIcon>
            <ChevronRight />
          </MdIcon>
        </MdIconButton>
      </div>
    );
  };

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
          placeholder="Select Date"
          value={selectedDate?.toFormat(format) || ""}
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
        ref={refs.setFloating}
        style={{ ...floatingStyles }}
        {...getFloatingProps()}
        className="z-50"
      >
        {isMounted && !readonly && (
          <FloatingFocusManager context={context}>
            <div style={floatingTransitionStyles}>
              <MdElevatedCard className="flex">
                <div className="flex flex-col bg-surfaceContainerHigh rounded-xl">
                  <div className="flex justify-between p-2">
                    <MonthHeader />
                    <YearHeader />
                  </div>
                  {selectionMode === "day" && (
                    <>
                      <motion.div
                        key={cursorDate.toDateString()}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{
                          opacity: 0,
                          x: DateTime.fromJSDate(cursorDate).hasSame(
                            DateTime.fromJSDate(beforeCursorDate),
                            "day"
                          )
                            ? 0
                            : cursorDate > beforeCursorDate
                            ? 40
                            : -40,
                        }}
                        className="grid grid-cols-7"
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

                            return (
                              <div
                                key={key}
                                className={cx(styles["date-cell"])}
                              >
                                {isCurrentMonth ? (
                                  <MdIconButton
                                    className={`
                                    ${
                                      DateTime.now().toISODate() ===
                                      DateTime.fromJSDate(value).toISODate()
                                        ? "border rounded-full border-primary"
                                        : ""
                                    }
                                    ${
                                      selectedDate?.toISODate() ===
                                      DateTime.fromJSDate(value).toISODate()
                                        ? "bg-primary rounded-full"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setSelectedDate(
                                        DateTime.fromJSDate(value)
                                      );
                                    }}
                                  >
                                    <MdTypography
                                      variant="body"
                                      size="large"
                                      className={`${
                                        selectedDate?.toISODate() ===
                                        DateTime.fromJSDate(value).toISODate()
                                          ? "text-white"
                                          : ""
                                      }`}
                                    >
                                      {value.getDate()}
                                    </MdTypography>
                                  </MdIconButton>
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
                            setSelectedDate(initialDate);
                            setIsCalendarOpen(false);
                          }}
                        >
                          Cancel
                        </MdOutlinedButton>
                        <MdFilledButton
                          onClick={() => {
                            setIsCalendarOpen(false);
                            selectedDate &&
                              navigation.setDate(selectedDate.toJSDate());
                            onDateChange?.(selectedDate as DateTime);
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
                              className={`${
                                cursorDate.getMonth() === idx
                                  ? "bg-surfaceVariant"
                                  : ""
                              }`}
                              type="button"
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
                              {cursorDate.getFullYear() === year + idx - 50 && (
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
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </>
  );
};
