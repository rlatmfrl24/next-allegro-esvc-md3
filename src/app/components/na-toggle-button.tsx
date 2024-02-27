import { MdTypography } from "./typography";
import { MdCheckbox } from "../util/md3";

export default function NaToggleButton({
  label,
  state,
  onChange,
  className,
}: {
  label?: string;
  state:
    | "checked"
    | "unchecked"
    | "indetermine"
    | "disabled"
    | "disabled-checked";
  onChange?: (state: "checked" | "unchecked" | "indetermine") => void;
  className?: string;
}) {
  return (
    <MdTypography
      tag="label"
      variant="label"
      size="large"
      className={`text-primary flex items-center cursor-pointer gap-0.5 my-1.5 min-w-fit ${className}`}
    >
      <MdCheckbox
        className="m-1.5"
        checked={
          state === "checked" ? true : state === "unchecked" ? false : undefined
        }
        indeterminate={state === "indetermine"}
        disabled={state === "disabled" || state === "disabled-checked"}
        onClick={(e) => {
          onChange &&
            onChange(
              state === "checked"
                ? "unchecked"
                : state === "unchecked"
                ? "checked"
                : "indetermine"
            );
        }}
      />
      {label}
    </MdTypography>
  );
}
