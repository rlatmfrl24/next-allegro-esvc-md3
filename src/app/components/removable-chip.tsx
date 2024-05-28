import { Close } from "@mui/icons-material";
import { MdTypography } from "./typography";
import { MdRippleEffect } from "../util/md3";

export const RemovableChip = ({
  label,
  onRemove,
  className,
}: {
  label: string;
  onRemove?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex py-1.5 pl-3 pr-2 items-center rounded-lg overflow-hidden whitespace-nowrap text-ellipsis ${
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
  );
};
