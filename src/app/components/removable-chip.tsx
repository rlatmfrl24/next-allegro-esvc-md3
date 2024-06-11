import { Close } from "@mui/icons-material";
import { MdTypography } from "./typography";
import { MdInputChip, MdRippleEffect } from "../util/md3";

export const RemovableChip = ({
  label,
  onRemove,
  className,
  disabled,
}: {
  label: string;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return !disabled ? (
    <div
      className={`flex max-h-8 py-1.5 pl-3 pr-2 items-center rounded-lg overflow-hidden whitespace-nowrap text-ellipsis ${
        className || ""
      } ${className?.includes("bg-") ? "" : "bg-secondaryContainer"}
        ${className?.includes("text-") ? "" : "text-onSecondaryContainer"}
        `}
    >
      <MdTypography variant="label" size="large" className="h-fit">
        {label}
      </MdTypography>
      <div
        className="flex items-center justify-center w-6 h-6 cursor-pointer relative rounded-full ml-2"
        onClick={onRemove}
      >
        <MdRippleEffect />
        <Close fontSize="small" />
      </div>
    </div>
  ) : (
    <MdInputChip label={label} className={className} disabled={true} selected />
  );
};
