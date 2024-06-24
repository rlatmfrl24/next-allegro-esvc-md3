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

  return (
    <>
      <div className={`relative h-fit ${className ? className : ""}`}>
        <MdOutlinedTextFieldBase
          {...props}
          required={false}
          type="text"
          onFocus={(e) => {
            e.currentTarget.select();

            if (!hasValue) {
              e.currentTarget.value = "";
            }
          }}
          style={
            {
              "--md-outlined-text-field-input-text-color": !hasValue
                ? "var(--md-sys-color-outline-variant)"
                : "inherit",
            } as CSSProperties
          }
          value={
            !hasValue
              ? "0"
              : enableNumberSeparator
              ? props.value
                  ?.toLocaleString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  .split(".")
                  .map((v, i) => (i === 0 ? v : v.replaceAll(",", "")))
                  .join(".")
              : props.value
          }
          onKeyDown={(e) => {
            // allow only numbers, backspace, delete, arrow keys, and tab, dot, and minus sign
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
              )
            ) {
              e.preventDefault();
            }
          }}
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
          className="text-right"
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
