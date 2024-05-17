import { MdTypography } from "./typography";
import { MdCheckbox } from "../util/md3";
import { HTMLAttributes } from "react";

export default function NaToggleButton({
  label,
  state,
  className,
  onClick,
  ...props
}: {
  label?: string;
  state:
    | "checked"
    | "unchecked"
    | "indetermine"
    | "disabled"
    | "disabled-checked";
  className?: string;
  onClick?: (prev: boolean) => void;
} & HTMLAttributes<HTMLLabelElement>) {
  return (
    <MdTypography
      {...props}
      tag="label"
      variant="label"
      size="large"
      className={` flex items-center cursor-pointer gap-0.5 my-1.5 min-w-fit ${className} ${
        state === "disabled" || state === "disabled-checked"
          ? "text-outlineVariant"
          : "text-primary"
      }`}
      // onClick={(e) => {
      //   // e.stopPropagation();
      //   onClick?.(state === "checked");
      // }}
    >
      <MdCheckbox
        className="m-1.5"
        checked={
          state === "checked" || state === "disabled-checked"
            ? true
            : state === "unchecked" || state === "disabled"
            ? false
            : undefined
        }
        indeterminate={state === "indetermine"}
        disabled={state === "disabled" || state === "disabled-checked"}
        onClick={
          state !== "disabled" && state !== "disabled-checked"
            ? (e) => {
                // e.stopPropagation();
                onClick?.(state === "checked");
              }
            : undefined
        }
      />
      {label}
    </MdTypography>
  );
}
