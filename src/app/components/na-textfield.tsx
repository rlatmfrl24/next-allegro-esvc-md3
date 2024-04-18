"use client";

import { use, useEffect, useRef, useState } from "react";
import {
  MdIcon,
  MdIconButton,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "@/util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { MdTypography } from "./typography";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedTextField = ({
  handleValueChange,
  enableClearButton = true,
  className,
  ...props
}: {
  handleValueChange?: (value: string) => void;
  enableClearButton?: boolean;
  className?: string;
} & MdOutlinedTextFieldProps) => {
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (!props.value || props.value.length === 0) {
      setHasValue(false);
    } else {
      setHasValue(true);
    }
  }, [props.value]);

  return (
    <div className={`relative flex ${className}`}>
      <MdOutlinedTextFieldBase
        {...props}
        ref={inputRef}
        type={props.type === "number" ? "text" : props.type}
        className={`flex-1 resize-y [&::-webkit-inner-spin-button]:appearance-none ${
          props.type === "number" ? "text-right" : ""
        } ${props.readOnly ? "bg-surfaceContainer" : ""}`}
        onFocus={(e) => {
          if (props.type === "number") {
            e.currentTarget.select();
          }
        }}
        onKeyDown={(e) => {
          if (props.type === "number") {
            if (
              !(
                (e.key >= "0" && e.key <= "9") ||
                e.key === "-" ||
                e.key === "." ||
                e.key === "Backspace" ||
                e.key === "Delete" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Tab"
              ) ||
              (e.key === "-" && e.currentTarget.selectionStart !== 0) ||
              (e.key === "." && e.currentTarget.value.includes(".")) ||
              (e.key === "0" &&
                e.currentTarget.value === "0" &&
                e.currentTarget.selectionStart === 1)
            ) {
              e.preventDefault();
            }
          } else {
            props.onKeyDown?.(e);
          }
        }}
        onInput={(e) => {
          if (props.type !== "number") {
            handleValueChange?.(e.currentTarget.value);
          }
          if (e.currentTarget.value.length > 0) {
            setHasValue(true);
          } else {
            setHasValue(false);
          }
        }}
        onBlur={(e) => {
          if (props.type === "number") {
            let intValue = parseFloat(e.currentTarget.value);
            if (isNaN(intValue)) intValue = 0;
            e.currentTarget.value = intValue.toString();
          }
          handleValueChange?.(e.currentTarget.value);
        }}
        required={false}
      >
        {!(
          props.type === "number" ||
          props.type === "textarea" ||
          props.readOnly
        ) &&
          enableClearButton && (
            <MdIconButton
              slot="trailing-icon"
              className={!props.disabled && hasValue ? "visible" : "invisible"}
              onClick={() => {
                if (inputRef.current) (inputRef.current as any).value = "";
                setHasValue(false);
                handleValueChange?.("");
              }}
            >
              <MdIcon>
                <CancelIcon />
              </MdIcon>
            </MdIconButton>
          )}
      </MdOutlinedTextFieldBase>
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
