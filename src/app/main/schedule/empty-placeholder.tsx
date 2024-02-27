import { MdTypography } from "@/app/components/typography";
import EmptyResultIcon from "@/../public/image_empty_search_result.svg";
import styles from "@/app/styles/base.module.css";

export default function EmptyResultPlaceholder() {
  return (
    <div className={styles.area}>
      <EmptyResultIcon className="mb-8" />
      <MdTypography
        variant="headline"
        size="medium"
        className="text-outlineVariant"
      >
        Please search for the schedule
      </MdTypography>
    </div>
  );
}
