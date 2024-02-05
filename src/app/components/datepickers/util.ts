import { DateTime } from "luxon";
import { MutableRefObject } from "react";

export function FocusOnInput(inputEl: MutableRefObject<any>) {
  // focus on text field without use ref
  if (inputEl.current?.shadowRoot) {
    inputEl.current?.shadowRoot.querySelector("input")?.focus();
  }
}

export function getModifiedCursorDate(
  selectedValue: string,
  mode: "month" | "year" | "date",
  cursorDate: Date
) {
  let modifiedDate = DateTime.fromJSDate(cursorDate);
  if (mode === "month") {
    const month = MonthList.findIndex((m) => m === selectedValue) + 1;
    modifiedDate = DateTime.fromJSDate(cursorDate).set({ month });
  } else if (mode === "year") {
    modifiedDate = DateTime.fromJSDate(cursorDate).set({
      year: parseInt(selectedValue),
    });
  }
  return modifiedDate;
}

export const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const YearList = Array.from({ length: 100 }, (_, i) => {
  return (DateTime.now().year - 50 + i).toString();
});
