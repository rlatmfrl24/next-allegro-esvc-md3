import { MdTypography } from "@/app/components/typography";
import EmptyResultIcon from "@/../public/image_empty_search_result.svg";
import styles from "@/app/styles/base.module.css";

export default function EmptyResultPlaceholder({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-1 items-center ${className ? className : ""}`}>
      <div className="my-10 flex flex-col flex-1 justify-center items-center">
        <EmptyResultIcon className="mb-8" />
        <MdTypography
          variant="headline"
          size="medium"
          className="text-outlineVariant"
        >
          {text}
        </MdTypography>
      </div>
    </div>
  );
}
