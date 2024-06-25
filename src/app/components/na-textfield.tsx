"use client";

import { useEffect, useRef, useState } from "react";

import {
  MdIcon,
  MdIconButton,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "@/app/util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";

import { MdTypography } from "./typography";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedTextField = ({
  handleValueChange,
  enableClearButton = true,
  maxInputLength,
  enableNumberSeparator = true,
  className,
  ...props
}: {
  handleValueChange?: (value: string) => void;
  enableClearButton?: boolean;
  maxInputLength?: number;
  enableNumberSeparator?: boolean;
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
    <div className={`relative flex h-fit ${className} `}>
      <MdOutlinedTextFieldBase
        {...props}
        ref={inputRef}
        className={`flex-1 resize-y [&::-webkit-inner-spin-button]:appearance-none ${
          props.readOnly ? "bg-surfaceContainer" : ""
        }`}
        onInput={(e) => {
          if (maxInputLength && e.currentTarget.value.length > maxInputLength) {
            e.currentTarget.value = e.currentTarget.value.slice(
              0,
              maxInputLength
            );
          }

          handleValueChange?.(e.currentTarget.value);
          if (e.currentTarget.value.length > 0) {
            setHasValue(true);
          } else {
            setHasValue(false);
          }
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          handleValueChange?.(e.currentTarget.value);
        }}
        value={
          props.type === "textarea"
            ? props.value?.replaceAll("\n", "\r\n") || ""
            : props.value || ""
        }
        required={false}
      >
        {props.children}
        {!(props.type === "textarea" || props.readOnly) &&
          enableClearButton && (
            <MdIconButton
              // make sure to use tabIndex={-1} to prevent the button from being focused
              slot="trailing-icon"
              tabIndex={-1}
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
