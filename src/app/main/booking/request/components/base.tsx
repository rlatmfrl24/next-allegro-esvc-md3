import { MdTypography } from "@/app/components/typography";

export const SubTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${className ? className : ""}`}>
      <div className="w-1 h-4 bg-primary"></div>
      <MdTypography variant="body" size="large">
        {title}
      </MdTypography>
    </div>
  );
};

export const SimpleItem = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex-1">
      <MdTypography
        variant="label"
        size="medium"
        className="text-outline mb-2 "
      >
        {title}
      </MdTypography>
      <MdTypography variant="title" size="medium" className="text-onSurface">
        {value}
      </MdTypography>
    </div>
  );
};
