import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import styles from "@/app/styles/base.module.css";
import { MdFilledButton, MdTextButton } from "@/app/util/md3";

export default function BLCheckSearchCondition({
  onSearch,
  onReset,
}: {
  onSearch: () => void;
  onReset: () => void;
}) {
  return (
    <div className={styles.area}>
      <div className="flex gap-2">
        <NAOutlinedListBox options={["B/L No.", "Vessel", "On Board Date"]} />
        <MdRangeDatePicker />
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton onClick={onReset}>Reset</MdTextButton>
        <MdFilledButton onClick={onSearch}>Search</MdFilledButton>
      </div>
    </div>
  );
}
