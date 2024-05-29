import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { basicPopoverStyles } from "@/app/util/constants";
import {
  MdElevatedCard,
  MdIcon,
  MdOutlinedTextField,
  MdRippleEffect,
  MdSwitch,
} from "@/app/util/md3";
import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";

export const SimpleSubscriptionItem = (props: { name: string }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <div className="flex items-center px-4 py-5 bg-secondaryContainer rounded-lg">
      <MdTypography variant="body" size="large" prominent className="flex-1">
        {props.name}
      </MdTypography>
      <MdTypography variant="label" size="medium" className="text-outline mr-2">
        {isSwitchOn ? "Subscribe" : "Unsubscribe"}
      </MdTypography>
      <MdSwitch
        onClick={() => {
          setIsSwitchOn(!isSwitchOn);
        }}
      />
    </div>
  );
};

export const SubscriptionItemContainer = (props: {
  name: string;
  children?: React.ReactNode;
  isSwitchOn?: boolean;
  onSwitchChange?: (isSwitchOn: boolean) => void;
}) => {
  const childrenList = React.Children.toArray(props.children);
  const content = childrenList.filter(
    (child) => (child as React.ReactElement).props?.slot === "content"
  );

  const actions = childrenList.filter(
    (child) => (child as React.ReactElement).props?.slot === "actions"
  );

  return (
    <div className="flex flex-col rounded-lg border-2 border-secondaryContainer">
      <div className="flex bg-secondaryContainer px-4 py-6 items-center">
        <MdTypography variant="body" size="large" prominent className="flex-1">
          {props.name}
        </MdTypography>
        {actions}
        <MdTypography
          variant="label"
          size="medium"
          className="text-outline mr-2 ml-4"
        >
          {props.isSwitchOn ? "Subscribe" : "Unsubscribe"}
        </MdTypography>
        <MdSwitch
          selected={props.isSwitchOn}
          onClick={() => {
            props.onSwitchChange?.(
              props.isSwitchOn !== undefined ? !props.isSwitchOn : true
            );
          }}
        />
      </div>
      {content}
    </div>
  );
};

export const CycleSelector = (props: {
  label?: string;
  initialValue?: {
    cycleOption: "Daily" | "Weekly" | "Monthly";
    weekOption?: string;
    dayOption?: string;
  };
}) => {
  const [cycle, setCycle] = useState<"Daily" | "Weekly" | "Monthly">(
    props.initialValue?.cycleOption || "Daily"
  );
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(
    props.initialValue?.weekOption ?? "SUN"
  );
  const [selectedDay, setSelectedDay] = useState(
    props.initialValue?.dayOption ?? 1
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [flip(), shift()],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  const weekOptions = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const WeekSelector = () => {
    return (
      <div className="grid grid-cols-4">
        {weekOptions.map((option) => (
          <MdTypography
            key={option}
            variant="label"
            size="large"
            className={`py-2 px-4 relative cursor-pointer rounded-full text-center ${
              selectedWeek === option ? "bg-primary text-white" : ""
            }`}
            onClick={() => {
              setSelectedWeek(option);
            }}
          >
            <MdRippleEffect />
            {option}
          </MdTypography>
        ))}
      </div>
    );
  };

  const DaySelector = () => {
    return (
      <>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((option) => (
            <MdTypography
              key={option}
              variant="label"
              size="large"
              className={`w-10 h-10 flex justify-center items-center relative cursor-pointer rounded-full text-center ${
                selectedDay === option.toString() ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setSelectedDay(option.toString());
              }}
            >
              <MdRippleEffect />
              {option}
            </MdTypography>
          ))}
        </div>
        <DividerComponent className="my-2" />
        <MdTypography
          variant="body"
          size="small"
          className="text-center text-outline"
        >
          If the selected date is not included in the month,
          <br /> notification goes to the last day of the month.
        </MdTypography>
      </>
    );
  };

  return (
    <div className="flex gap-2 h-fit">
      <NAOutlinedListBox
        initialValue={cycle}
        options={["Daily", "Weekly", "Monthly"]}
        label={props.label || "Cycle"}
        value={cycle}
        onSelection={(value) => {
          setCycle(value as "Daily" | "Weekly" | "Monthly");
        }}
        className="w-32"
      />
      <MdOutlinedTextField
        ref={refs.setReference}
        {...getReferenceProps()}
        className="w-28 select-none"
        readOnly
        disabled={cycle === "Daily"}
        label={cycle === "Daily" ? "" : cycle === "Weekly" ? "Week" : "Day"}
        value={
          cycle === "Weekly"
            ? selectedWeek
            : cycle === "Monthly"
            ? selectedDay.toString()
            : ""
        }
      >
        <MdIcon slot="trailing-icon">
          <ArrowDropDown />
        </MdIcon>
      </MdOutlinedTextField>

      <>
        {isMounted && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-10"
          >
            <MdElevatedCard style={transitionStyles} className="py-4 px-2">
              {cycle === "Weekly" && <WeekSelector />}
              {cycle === "Monthly" && <DaySelector />}
            </MdElevatedCard>
          </div>
        )}
      </>
    </div>
  );
};
