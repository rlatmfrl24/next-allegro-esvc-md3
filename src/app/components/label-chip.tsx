import { MdRippleEffect } from "../util/md3";
import { MdTypography } from "./typography";

const LabelChip = ({
  label,
  className,
  size = "large",
  onClick,
}: {
  label: string;
  className?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}) => {
  return (
    <MdTypography
      variant="label"
      size={size === "large" ? "large" : "medium"}
      onClick={onClick}
      className={`relative h-fit min-h-fit rounded-lg inline-block overflow-hidden whitespace-nowrap text-ellipsis ${
        className || ""
      } ${
        size === "small"
          ? "py-0.5 px-2"
          : size === "medium"
          ? "py-1 px-2"
          : size === "large"
          ? "py-1.5 px-4"
          : ""
      } ${className?.includes("bg-") ? "" : "bg-primaryContainer"}
      ${className?.includes("text-") ? "" : "text-onPrimaryContainer"}
      ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {onClick && <MdRippleEffect />}
      {label}
    </MdTypography>
  );
};

export default LabelChip;
