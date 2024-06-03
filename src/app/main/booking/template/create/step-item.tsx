import { MdTypography } from "@/app/components/typography";
import { MdRippleEffect } from "@/app/util/md3";

export default function StepItem({
  title,
  isSelected,
  isCompleted,
  ...props
}: {
  title: string;
  isSelected?: boolean;
  isCompleted?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`relative flex gap-4 w-[268px] p-4 h-20 items-center rounded-lg cursor-pointer ${
        isSelected ? "bg-primary" : "bg-surfaceContainerLow"
      }`}
    >
      <MdRippleEffect />
      <div>
        <MdTypography
          variant="title"
          size="medium"
          className={`select-none ${
            isSelected ? "text-surface" : "text-onsurface"
          }`}
        >
          {title}
        </MdTypography>
      </div>
    </div>
  );
}
