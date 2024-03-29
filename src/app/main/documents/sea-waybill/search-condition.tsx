import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { createDummyVesselInformations } from "@/app/main/schedule/util";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdIconButton,
  MdInputChip,
  MdTextButton,
} from "@/app/util/md3";
import { InfoOutlined } from "@mui/icons-material";
import {
  autoUpdate,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";

export default function SeaWaybillSearchCondition({
  onSearch,
  onReset,
}: {
  onReset: () => void;
  onSearch: () => void;
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [blQuery, setBlQuery] = useState<string>("");
  const [blNumberList, setBlNumberList] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<
    "B/L No." | "Vessel" | "On Board Date"
  >("On Board Date");

  const vesselList = useMemo(() => {
    return createDummyVesselInformations(30);
  }, []);

  const [vesselCondition, setVesselCondition] = useState<{
    vesselName: string;
    voyage: string;
    direction: string;
  }>({
    vesselName: "",
    voyage: "",
    direction: "E",
  });
  const [boardDateCondition, setBoardDateCondition] = useState<{
    from: DateTime;
    to: DateTime;
  }>({
    from: DateTime.now(),
    to: DateTime.now(),
  });

  useEffect(() => {
    setBlQuery("");
    setBlNumberList([]);
    setVesselCondition({
      vesselName: "",
      voyage: "",
      direction: "E",
    });
    setBoardDateCondition({
      from: DateTime.now(),
      to: DateTime.now(),
    });
  }, [searchType]);

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
        <NAOutlinedListBox
          className="w-56"
          options={["B/L No.", "Vessel", "On Board Date"]}
          initialValue={searchType}
          onSelection={(value) => {
            setSearchType(value as "B/L No." | "Vessel" | "On Board Date");
          }}
        />
        {
          {
            "B/L No.": (
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  <NAOutlinedTextField
                    className="flex-1"
                    value={blQuery}
                    placeholder="Multi B/L No."
                    handleValueChange={(value) => {
                      setBlQuery(value);
                    }}
                    onKeyDown={(e) => {
                      const value = e.currentTarget.value;
                      if (e.key === "Enter") {
                        if (
                          e.currentTarget.value &&
                          !blNumberList.includes(value)
                        ) {
                          setBlNumberList((prev) => [...prev, value]);
                        }
                        setBlQuery("");
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
                  {blNumberList.map((blNumber) => (
                    <MdInputChip
                      selected
                      key={blNumber}
                      label={blNumber}
                      handleTrailingActionFocus={() => {
                        setBlNumberList((prev) =>
                          prev.filter((bl) => bl !== blNumber)
                        );
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            ),
            Vessel: (
              <div className="flex-1 flex gap-2">
                <NAOutlinedAutoComplete
                  label="Vessel Name"
                  className="flex-1"
                  recentCookieKey="recent-vessel"
                  initialValue={vesselCondition.vesselName}
                  itemList={vesselList.map((vessel) => vessel.vesselName)}
                  onItemSelection={(value) => {
                    setVesselCondition((prev) => ({
                      ...prev,
                      vesselName: value,
                    }));
                  }}
                />
                <NAOutlinedTextField
                  label="Voyage"
                  value={vesselCondition.voyage}
                  handleValueChange={(value) => {
                    setVesselCondition((prev) => ({
                      ...prev,
                      voyage: value,
                    }));
                  }}
                />
                <NAOutlinedListBox
                  className="w-32"
                  label="Direction"
                  initialValue="E"
                  options={["E", "N", "W", "S"]}
                  onSelection={(value) => {
                    setVesselCondition((prev) => ({
                      ...prev,
                      direction: value,
                    }));
                  }}
                />
              </div>
            ),
            "On Board Date": (
              <MdRangeDatePicker
                defaultStartDate={boardDateCondition.from}
                defaultEndDate={boardDateCondition.to}
                handleDateRangeSelected={(dateRange) => {
                  setBoardDateCondition({
                    from: dateRange[0],
                    to: dateRange[1],
                  });
                }}
              />
            ),
          }[searchType]
        }
      </div>
      <div className="flex gap-2 justify-end">
        <MdTextButton
          onClick={() => {
            setBlQuery("");
            setBlNumberList([]);
            setVesselCondition({
              vesselName: "",
              voyage: "",
              direction: "E",
            });
            setBoardDateCondition({
              from: DateTime.now(),
              to: DateTime.now(),
            });
            onReset();
          }}
        >
          Reset
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            if (searchType === "B/L No.") console.log(blNumberList);
            else if (searchType === "Vessel") console.log(vesselCondition);
            else console.log(boardDateCondition);

            onSearch();
          }}
        >
          Search
        </MdFilledButton>
      </div>
    </div>
  );
}
