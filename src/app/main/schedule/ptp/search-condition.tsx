import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdRadio,
  MdSelectOption,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { use, useEffect, useState } from "react";
import { SearchTextField } from "./search-textfield";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { DateTime } from "luxon";
import AddIcon from "@mui/icons-material/Add";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SavePresetDialog from "./popup/save-preset";
import { SearchConditionProps } from "@/app/util/typeDef";
import PresetScheduleDialog from "./popup/preset-schedule";
import Image from "next/image";

export default function SearchCondition({
  searchAction,
}: {
  searchAction: (condition: SearchConditionProps) => void;
}) {
  const [searchCondition, setSearchCondition] = useState<
    "single" | "multi-origin" | "multi-destination"
  >("single");

  const [originList, setOriginList] = useState<string[]>([]);
  const [destinationList, setDestinationList] = useState<string[]>([]);
  const [originLimit, setOriginLimit] = useState<number>(1);
  const [destinationLimit, setDestinationLimit] = useState<number>(1);
  const [searchOn, setSearchOn] = useState<"departure" | "arrival">(
    "departure"
  );
  const [isDirectOnly, setIsDirectOnly] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<[DateTime, DateTime]>([
    DateTime.now(),
    DateTime.now(),
  ]);

  const [isOriginError, setIsOriginError] = useState<boolean>(false);
  const [isDestinationError, setIsDestinationError] = useState<boolean>(false);
  const [isSavePrestOpen, setIsSavePrestOpen] = useState(false);
  const [isPresetScheduleOpen, setIsPresetScheduleOpen] = useState(false);

  const [currentCondition, setCurrentCondition] =
    useState<SearchConditionProps>({
      origins: originList,
      destinations: destinationList,
      directOnly: isDirectOnly,
      startDate: dateRange[0],
      endDate: dateRange[1],
      searchOn: searchOn,
    });

  useEffect(() => {
    if (searchCondition === "single") {
      setOriginLimit(1);
      setDestinationLimit(1);
    } else if (searchCondition === "multi-origin") {
      setOriginLimit(5);
      setDestinationLimit(1);
    } else if (searchCondition === "multi-destination") {
      setOriginLimit(1);
      setDestinationLimit(5);
    }
  }, [searchCondition]);

  useEffect(() => {
    setCurrentCondition({
      origins: originList,
      destinations: destinationList,
      directOnly: isDirectOnly,
      startDate: dateRange[0],
      endDate: dateRange[1],
      searchOn: searchOn,
    });
  }, [originList, destinationList, isDirectOnly, dateRange, searchOn]);

  function clearAllSelection() {
    setOriginList([]);
    setDestinationList([]);
  }

  function switchOriginDestination() {
    const temp = originList;
    setIsOriginError(false);
    setIsDestinationError(false);
    setOriginList(destinationList);
    setDestinationList(temp);
    setSearchCondition(
      searchCondition === "multi-origin"
        ? "multi-destination"
        : searchCondition === "multi-destination"
        ? "multi-origin"
        : "single"
    );
  }

  function Validation() {
    if (originList.length === 0) {
      setIsOriginError(true);
      return false;
    }
    if (destinationList.length === 0) {
      setIsDestinationError(true);
      return false;
    }
    return true;
  }

  function handleModeSelection(
    mode: "single" | "multi-origin" | "multi-destination"
  ) {
    setSearchCondition(mode);
    clearAllSelection();
    setIsOriginError(false);
    setIsDestinationError(false);
  }

  return (
    <div
      aria-label="search-panel"
      className="bg-surface rounded-2xl p-6 flex flex-col gap-4"
    >
      <SavePresetDialog
        open={isSavePrestOpen}
        handleOpen={setIsSavePrestOpen}
        condition={currentCondition}
      />
      <PresetScheduleDialog
        open={isPresetScheduleOpen}
        handleOpen={setIsPresetScheduleOpen}
      />

      <div className="flex gap-6 h-10">
        <MdTypography
          tag="label"
          variant="label"
          size="large"
          className="flex items-center gap-2 cursor-pointer"
        >
          <MdRadio
            name="route-condition"
            value="single"
            checked={searchCondition === "single"}
            onClick={() => {
              handleModeSelection("single");
            }}
          />
          One to One
        </MdTypography>
        <MdTypography
          tag="label"
          variant="label"
          size="large"
          className="flex items-center gap-2 cursor-pointer"
        >
          <MdRadio
            name="route-condition"
            value="multi-origin"
            checked={searchCondition === "multi-origin"}
            onClick={() => {
              handleModeSelection("multi-origin");
            }}
          />
          Multi Origin
        </MdTypography>
        <MdTypography
          tag="label"
          variant="label"
          size="large"
          className="flex items-center gap-2 cursor-pointer"
        >
          <MdRadio
            name="route-condition"
            value="multi-destination"
            checked={searchCondition === "multi-destination"}
            onClick={() => {
              handleModeSelection("multi-destination");
            }}
          />
          Multi Destination
        </MdTypography>
      </div>

      <div className="flex gap-4 ">
        <div className="flex flex-1 gap-4">
          <SearchTextField
            maxSelectionCount={originLimit}
            selectionItems={originList}
            handleItemSelection={setOriginList}
            errorText="Please select origin"
            error={isOriginError}
          />
          <MdIconButton className="mt-2" onClick={switchOriginDestination}>
            <MdIcon>
              <SwapHorizOutlinedIcon />
            </MdIcon>
          </MdIconButton>
          <SearchTextField
            maxSelectionCount={destinationLimit}
            selectionItems={destinationList}
            handleItemSelection={setDestinationList}
            errorText="Please select destination"
            error={isDestinationError}
          />
        </div>
        <MdOutlinedButton
          className="h-fit mt-2"
          onClick={() => {
            setIsSavePrestOpen(true);
          }}
        >
          <div slot="icon">
            <AddIcon fontSize="small" />
          </div>
          Save Preset
        </MdOutlinedButton>
        <MdFilledTonalButton
          className="h-fit mt-2"
          onClick={() => {
            setIsPresetScheduleOpen(true);
          }}
        >
          <div slot="icon">
            <InboxOutlinedIcon fontSize="small" />
          </div>
          Preset
        </MdFilledTonalButton>
      </div>

      <div className="flex gap-4">
        <MdOutlinedSelect label="Search On" value={searchOn}>
          <MdSelectOption
            value="departure"
            onClick={() => {
              setSearchOn("departure");
            }}
          >
            Departure
          </MdSelectOption>
          <MdSelectOption
            value="arrival"
            onClick={() => {
              setSearchOn("arrival");
            }}
          >
            Arrival
          </MdSelectOption>
        </MdOutlinedSelect>
        <MdRangeDatePicker
          label="Date"
          supportingText=" "
          handleDateRangeSelected={setDateRange}
        />

        <MdTypography
          variant="body"
          size="large"
          className="flex items-center gap-2"
        >
          <MdSwitch
            selected={isDirectOnly}
            onClick={() => {
              setIsDirectOnly(!isDirectOnly);
            }}
          />
          Direct
        </MdTypography>
      </div>
      <div className="flex justify-end gap-2">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton
          onClick={() => {
            Validation() &&
              searchAction({
                origins: originList,
                destinations: destinationList,
                searchOn: searchOn,
                startDate: dateRange[0],
                endDate: dateRange[1],
                directOnly: isDirectOnly,
              });
          }}
        >
          Search
        </MdFilledButton>
      </div>
    </div>
  );
}
