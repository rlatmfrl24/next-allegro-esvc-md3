import { MdTypography } from "./typography";

const LabelChip = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <MdTypography
      variant="label"
      size="large"
      className={`py-1.5 px-4 h-fit min-h-fit bg-primaryContainer text-onPrimaryContainer rounded-lg inline-block overflow-hidden whitespace-nowrap text-ellipsis ${
        className || ""
      }`}
    >
      {label}
    </MdTypography>
  );
};

export default LabelChip;
