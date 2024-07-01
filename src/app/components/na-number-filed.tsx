import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { MdOutlinedTextField as MdOutlinedTextFieldBase } from "../util/md3";
import { MdTypography } from "./typography";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedNumberField = ({
  handleValueChange,
  maxInputLength,
  enableNumberSeparator = true,
  className,
  ...props
}: {
  handleValueChange?: (value: number | undefined) => void;
  maxInputLength?: number;
  enableNumberSeparator?: boolean;
  className?: string;
} & MdOutlinedTextFieldProps) => {
  const hasValue = useMemo(() => {
    return (
      props.value !== undefined && props.value !== null && props.value !== ""
    );
  }, [props.value]);

  const [isFocused, setIsFocused] = useState(false);

  const currentValue = useMemo(() => {
    if (hasValue) {
      if (isFocused) {
        return props.value;
      } else {
        if (enableNumberSeparator) {
          return props.value
            ?.toLocaleString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            .split(".")
            .map((v, i) => (i === 0 ? v : v.replaceAll(",", "")))
            .join(".");
        } else {
          return props.value;
        }
      }
    } else {
      if (isFocused) {
        return "";
      } else {
        return "0";
      }
    }
  }, [enableNumberSeparator, hasValue, isFocused, props.value]);

  return (
    <>
      <div className={`relative h-fit ${className ? className : ""}`}>
        <MdOutlinedTextFieldBase
          {...props}
          placeholder="0"
          required={false}
          type={isFocused ? "number" : "text"}
          noSpinner
          onFocus={(e) => {
            setIsFocused(true);
            e.currentTarget.value = "";

            e.currentTarget.select();
          }}
          style={
            {
              "--md-outlined-text-field-input-text-color": !hasValue
                ? "var(--md-sys-color-outline-variant)"
                : "inherit",
            } as CSSProperties
          }
          value={currentValue}
          onInput={(e) => {
            if (
              maxInputLength &&
              e.currentTarget.value.length > maxInputLength
            ) {
              e.currentTarget.value = e.currentTarget.value.slice(
                0,
                maxInputLength
              );
            }
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (enableNumberSeparator) {
              e.currentTarget.value = e.currentTarget.value.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
            }

            if (handleValueChange) {
              handleValueChange(
                e.currentTarget.value === ""
                  ? undefined
                  : parseFloat(e.currentTarget.value.replace(/,/g, ""))
              );
            }
          }}
          className={`text-right w-full ${
            props.readOnly ? "bg-surfaceContainer" : ""
          }`}
        ></MdOutlinedTextFieldBase>
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
    </>
  );
};
