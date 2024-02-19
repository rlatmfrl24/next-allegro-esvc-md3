import { MdTypography } from "./typography";
import { MdCheckbox } from "../util/md3";

export default function NaToggleButton({
  label,
  state,
}: {
  label?: string;
  state:
    | "checked"
    | "unchecked"
    | "indetermine"
    | "disabled"
    | "disabled-checked";
}) {
  return (
    <MdTypography
      tag="label"
      variant="label"
      size="large"
      className="text-primary flex items-center cursor-pointer gap-2"
    >
      <MdCheckbox
        checked={
          state === "checked" ? true : state === "unchecked" ? false : undefined
        }
        indeterminate={state === "indetermine"}
        disabled={state === "disabled" || state === "disabled-checked"}
      />
      {label}
    </MdTypography>
  );
}
