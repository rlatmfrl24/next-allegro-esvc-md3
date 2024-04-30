import { MdTypography } from "@/app/components/typography";

export const SimpleItem = ({
  title,
  value,
  noWrap = false,
  className,
}: {
  title: string;
  value: string;
  noWrap?: boolean;
  className?: string;
}) => {
  return (
    <div className={`flex-1 ${className ? className : ""}`}>
      <MdTypography
        variant="label"
        size="medium"
        className="text-outline mb-2 "
      >
        {title}
      </MdTypography>
      <MdTypography
        variant="title"
        size="medium"
        className={`text-onSurface ${noWrap ? "whitespace-nowrap" : ""}`}
      >
        {value}
      </MdTypography>
    </div>
  );
};

export const containerVariant = {
  initial: { opacity: 0, y: -50 },
  remove: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.2,
    },
  },
  add: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};
