import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdRadio,
  MdSelectOption,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { useEffect, useState } from "react";
import { SearchTextField } from "./search-textfield";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import AddIcon from "@mui/icons-material/Add";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

export default function SearchCondition() {
  const [searchCondition, setSearchCondition] = useState<
    "single" | "multi-origin" | "multi-destination"
  >("single");

  const [originList, setOriginList] = useState<string[]>([]);
  const [destinationList, setDestinationList] = useState<string[]>([]);
  const [originLimit, setOriginLimit] = useState<number>(1);
  const [destinationLimit, setDestinationLimit] = useState<number>(1);

  function switchOriginDestination() {
    const temp = originList;
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

  function clearAllSelection() {
    setOriginList([]);
    setDestinationList([]);
  }

  return (
    <div
      aria-label="search-panel"
      className="bg-surface rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex gap-6">
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
              setSearchCondition("single");
              clearAllSelection();
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
              setSearchCondition("multi-origin");
              clearAllSelection();
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
              setSearchCondition("multi-destination");
              clearAllSelection();
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
          />
        </div>
        <MdOutlinedButton className="h-fit mt-2">
          <div slot="icon">
            <AddIcon className="w-5 h-5" />
          </div>
          Save Preset
        </MdOutlinedButton>
        <MdFilledTonalButton className="h-fit mt-2">
          <div slot="icon">
            <InboxOutlinedIcon className="w-5 h-5" />
          </div>
          Preset
        </MdFilledTonalButton>
      </div>

      <div className="flex gap-4">
        <MdOutlinedSelect label="Search On">
          <MdSelectOption value="departure">Departure</MdSelectOption>
          <MdSelectOption value="arrival">Arrival</MdSelectOption>
        </MdOutlinedSelect>
        <MdRangeDatePicker label="Date" supportingText=" " />

        <MdTypography
          variant="body"
          size="large"
          className="flex items-center gap-2"
        >
          <MdSwitch />
          Direct
        </MdTypography>
      </div>
      <div className="flex justify-end gap-2">
        <MdTextButton>Reset</MdTextButton>
        <MdFilledButton
          onClick={() => {
            // setPageState("list");
          }}
        >
          Search
        </MdFilledButton>
      </div>
    </div>
  );
}
