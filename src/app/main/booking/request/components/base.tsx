import { MdTypography } from "@/app/components/typography";

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
