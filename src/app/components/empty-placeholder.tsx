import { MdTypography } from "@/app/components/typography";
import EmptyResultIcon from "@/../public/image_empty_search_result.svg";
import styles from "@/app/styles/base.module.css";

export default function EmptyResultPlaceholder({ text }: { text?: string }) {
  return (
    <div className={styles.area + ` flex items-center`}>
      <div className="my-10">
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
