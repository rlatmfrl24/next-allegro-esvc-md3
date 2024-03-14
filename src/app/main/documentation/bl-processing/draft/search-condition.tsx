import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import styles from "@/app/styles/base.module.css";

export default function BLCheckSearchCondition() {
  return (
    <div className={styles.area}>
      <div className="flex gap-2">
        <NAOutlinedListBox options={["B/L No.", "Vessel", "On Board Date"]} />
        <MdRangeDatePicker />
      </div>
    </div>
  );
}
