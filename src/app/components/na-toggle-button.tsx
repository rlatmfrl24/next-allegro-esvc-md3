import ToggleCheckedIcon from "@/../public/icon_toggle_checked.svg";
import ToggleUncheckedIcon from "@/../public/icon_toggle_unchecked.svg";
import ToggleIndetermineIcon from "@/../public/icon_toggle_indetermine.svg";
import { MdTypography } from "./typography";

export default function NaToggleButton({
  label,
  state,
}: {
  label?: string;
  state: "checked" | "unchecked" | "indetermine";
}) {
  return (
    <div className="flex items-center cursor-pointer gap-2">
      {state === "checked" ? (
        <ToggleCheckedIcon />
      ) : state === "unchecked" ? (
        <ToggleUncheckedIcon />
      ) : (
        <ToggleIndetermineIcon />
      )}
      <MdTypography variant="label" size="large" className="text-primary">
        {label}
      </MdTypography>
    </div>
  );
}
