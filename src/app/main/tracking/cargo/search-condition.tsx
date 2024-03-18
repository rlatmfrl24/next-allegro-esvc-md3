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
import { useState } from "react";

export default function CargoTrackingSearchCondition({
  onSearch,
  onReset,
}: {
  onSearch: () => void;
  onReset: () => void;
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchChipList, setSearchChipList] = useState<string[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [shift()],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "tooltip",
    }),
  ]);

  return (
    <div className={styles.area}>
      <div className="flex gap-2">
        <NAOutlinedTextField
          className="flex-1"
          placeholder="Container or Booking or B/L No. (Multi)"
          value={searchQuery}
          handleValueChange={(value) => {
            setSearchQuery(value);
          }}
          onKeyDown={(e) => {
            const value = e.currentTarget.value;
            if (e.key === "Enter") {
              if (e.currentTarget.value && !searchChipList.includes(value)) {
                setSearchChipList((prev) => [...prev, value]);
              }
              setSearchQuery("");
            }
          }}
        />
        <MdIconButton
          className="mt-2"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <InfoOutlined />
        </MdIconButton>
        {isTooltipOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-10 max-w-80"
          >
            <RichTooltipContainer>
              <RichTooltipItem
                slot="content"
                title={`Please enter KAMBARA KISEN B/L number composed of 3 alphabet characters + 9 digits of number (i/e PUS123456789, Discard the prefix "KKCL").`}
                supportingText={`Ensure your B/L number is assigned by KAMBARA KISEN. 
                      Our system does not accept House B/L number assigned 
                      by NVOCC or Freight Forwarder.`}
              />
            </RichTooltipContainer>
          </div>
        )}
      </div>
      <MdChipSet>
        {searchChipList.map((searchChip) => (
          <MdInputChip
            selected
            key={searchChip}
            label={searchChip}
            handleTrailingActionFocus={() => {
              setSearchChipList((prev) =>
                prev.filter((chip) => chip !== searchChip)
              );
            }}
          />
        ))}
      </MdChipSet>
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
  );
}
