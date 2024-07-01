import { InfoTooltipButton } from "@/app/components/info-tooltip-button";
import NaOutlinedSegmentedButton from "@/app/components/na-outlined-segmented-button";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdIconButton,
  MdInputChip,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import {
  useFloating,
  shift,
  autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
} from "@floating-ui/react";
import { InfoOutlined } from "@mui/icons-material";
import { CSSProperties, useState } from "react";

export default function CargoTrackingSearchCondition({
  onSearch,
  onReset,
}: {
  onSearch: () => void;
  onReset: () => void;
}) {
  const [searchType, setSearchType] = useState<"booking" | "container">(
    "booking"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchChipList, setSearchChipList] = useState<string[]>([]);

  return (
    <div className={styles.area}>
      <MdOutlinedSegmentedButtonSet>
        <NaOutlinedSegmentedButton
          selected={searchType === "booking"}
          onClick={() => {
            setSearchType("booking");
            setSearchChipList([]);
          }}
          label="Booking or B/L No."
        />
        <NaOutlinedSegmentedButton
          selected={searchType === "container"}
          onClick={() => {
            setSearchType("container");
            setSearchChipList([]);
          }}
          label="Container No."
        />
      </MdOutlinedSegmentedButtonSet>
      <div className="flex gap-2 items-end">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <NAOutlinedTextField
              label={
                searchType === "booking"
                  ? "Booking or B/L No. (Multi)"
                  : "Container No. (Multi)"
              }
              value={searchQuery}
              handleValueChange={(value) => {
                setSearchQuery(value);
              }}
              className="w-1/2"
              onKeyDown={(e) => {
                const value = e.currentTarget.value;
                if (e.key === "Enter") {
                  if (
                    e.currentTarget.value &&
                    !searchChipList.includes(value)
                  ) {
                    setSearchChipList((prev) => [...prev, value]);
                  }
                  setSearchQuery("");
                }
              }}
            />
            {searchType === "booking" && (
              <InfoTooltipButton
                title="Search Condition"
                supportingText="You can search for multiple Booking or B/L No. or Container No. by pressing Enter after typing each value."
              />
            )}
          </div>
          <MdChipSet>
            {searchChipList.map((searchChip) => (
              <div key={searchChip}>
                <MdInputChip
                  className={styles.pointChip}
                  label={searchChip}
                  selected
                  remove={() =>
                    setSearchChipList((prev) =>
                      prev.filter((chip) => chip !== searchChip)
                    )
                  }
                />
              </div>
            ))}
          </MdChipSet>
        </div>
        <div className="flex gap-2 justify-end">
          <MdTextButton
            onClick={() => {
              setSearchQuery("");
              setSearchChipList([]);
              onReset();
            }}
          >
            Reset
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              onSearch();
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
    </div>
  );
}
