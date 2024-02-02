import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MdIcon, MdIconButton, MdTextButton } from "@/app/util/md3";
import { DateTime } from "luxon";
import { SetStateAction } from "react";

export const NavigationContainer = ({
  mode,
  setMode,
  navigation,
  cursorDate,
}: {
  mode: "date" | "month" | "year";
  setMode: (mode: SetStateAction<"date" | "month" | "year">) => void;
  navigation: {
    toNext: () => void;
    toPrev: () => void;
    setToday: () => void;
    setDate: (date: Date) => void;
  };
  cursorDate: Date;
}) => {
  return (
    <div className="flex justify-around p-3 border-b border-b-outlineVariant">
      <div className="flex justify-between items-center">
        <MdIconButton
          className={`${mode === "date" ? "opacity-100" : "opacity-0"}`}
          onClick={() => {
            navigation.toPrev();
          }}
        >
          <MdIcon>
            <ChevronLeftIcon />
          </MdIcon>
        </MdIconButton>
        <MdTextButton
          disabled={mode === "year"}
          className="pl-5"
          onClick={() => {
            setMode("month");
          }}
        >
          {DateTime.fromJSDate(cursorDate).toFormat("MMM")}
          <ArrowDropDownIcon className="ml-2" />
        </MdTextButton>
        <MdIconButton
          className={`${mode === "date" ? "opacity-100" : "opacity-0"}`}
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
          className={`${mode === "date" ? "opacity-100" : "opacity-0"}`}
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
        <MdTextButton
          disabled={mode === "month"}
          className="pl-5"
          onClick={() => {
            setMode("year");
          }}
        >
          {DateTime.fromJSDate(cursorDate).toFormat("yyyy")}
          <ArrowDropDownIcon className="ml-2" />
        </MdTextButton>
        <MdIconButton
          className={`${mode === "date" ? "opacity-100" : "opacity-0"}`}
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
  );
};

export default NavigationContainer;
