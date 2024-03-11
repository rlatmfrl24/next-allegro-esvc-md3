import { MdTypography } from "@/app/components/typography";
import { MdRippleEffect } from "@/app/util/md3";
import { Check } from "@mui/icons-material";

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
      className={`relative flex gap-4 w-[268px] p-4 rounded-lg cursor-pointer ${
        isSelected ? "bg-primary" : "bg-surfaceContainerLow"
      }`}
    >
      <MdRippleEffect />
      <div
        className={`rounded-full min-w-10 h-10 flex items-center justify-center ${
          isCompleted
            ? "bg-primary text-white border border-outlineVariant"
            : "border border-outlineVariant text-outlineVariant"
        }  `}
      >
        <Check fontSize="small" />
      </div>
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
        <MdTypography
          variant="body"
          size="medium"
          className={`select-none ${
            isSelected ? "text-outlineVariant" : "text-outline"
          }`}
        >
          {isCompleted ? "Completed" : "Not Completed"}
        </MdTypography>
      </div>
    </div>
  );
}
