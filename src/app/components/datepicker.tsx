"use client";

import { useState } from "react";
import { MdIcon, MdIconButton, MdOutlinedTextField } from "../util/md3";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";

export default function MdDatePicker(props: { defaultValue?: string }) {
  const [invalid, setInvalid] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  function validateDate(date: string) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(date);
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isCalendarOpen,
    onOpenChange: setIsCalendarOpen,
    middleware: [offset(10), flip(), shift()],
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

  return (
    <>
      <MdOutlinedTextField
        ref={refs.setReference}
        supportingText="MM/DD/YYYY"
        errorText="Invalid date format"
        defaultValue={props.defaultValue}
        onInput={(e) => {
          const targetValue = (e.target as HTMLInputElement).value;
          if (targetValue.length > 4) {
            if (!validateDate(targetValue)) {
              setInvalid(true);
            } else {
              setInvalid(false);
            }
          } else if (targetValue.length === 0) {
            setInvalid(false);
          }
        }}
        error={invalid}
      >
        <MdIconButton slot="trailing-icon" {...getReferenceProps()}>
          <MdIcon>
            <CalendarTodayIcon />
          </MdIcon>
        </MdIconButton>
      </MdOutlinedTextField>
      {isCalendarOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-white border rounded-xl p-4"
          >
            Popover element
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
