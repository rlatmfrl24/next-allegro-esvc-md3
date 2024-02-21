import { MdTypography } from "./typography";
import { MdCheckbox } from "../util/md3";
import { on } from "events";

export default function NaToggleButton({
  label,
  state,
  onChange,
}: {
  label?: string;
  state:
    | "checked"
    | "unchecked"
    | "indetermine"
    | "disabled"
    | "disabled-checked";
  onChange?: (state: "checked" | "unchecked" | "indetermine") => void;
}) {
  return (
    <MdTypography
      tag="label"
      variant="label"
      size="large"
      className="text-primary flex items-center cursor-pointer gap-2 my-1.5"
    >
      <MdCheckbox
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
