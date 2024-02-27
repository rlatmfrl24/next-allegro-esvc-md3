import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdFilledTonalButton,
  MdFilledTonalIconButton,
  MdIcon,
  MdIconButton,
  MdOutlinedSelect,
  MdRadio,
  MdSelectOption,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { useEffect, useState } from "react";
import { SearchTextField } from "./components/search-textfield";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { DateTime } from "luxon";
import { PtPSearchConditionType } from "@/app/util/typeDef";
import { useRecoilState } from "recoil";
import MyFavorite from "./components/my-favorite";
import { FavoriteRouteListState } from "@/app/store/ptp.store";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "@/app/styles/base.module.css";
import { createDummyPortData } from "../util";

export default function SearchCondition({
  searchAction,
}: {
  searchAction: (condition: PtPSearchConditionType) => void;
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
  const [currentCondition, setCurrentCondition] =
    useState<PtPSearchConditionType>({
      origins: originList,
      destinations: destinationList,
      directOnly: isDirectOnly,
      startDate: dateRange[0],
      endDate: dateRange[1],
      searchOn: searchOn,
    });

  const [favoriteList, setFavoriteList] = useRecoilState(
    FavoriteRouteListState
  );

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
    setIsOriginError(false);
    setIsDestinationError(false);
    setSearchOn("departure");
    setIsDirectOnly(true);
    setDateRange([DateTime.now(), DateTime.now()]);
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

  function isCurrentRouteFavourite() {
    if (originList.length === 0 || destinationList.length === 0) return false;

    return favoriteList.some((preset) => {
      return (
        preset.origin.toString() === originList.toString() &&
        preset.destination.toString() === destinationList.toString()
      );
    });
  }

  function toggleFavourite() {
    if (originList.length === 0 || destinationList.length === 0) return;

    if (isCurrentRouteFavourite()) {
      setFavoriteList(
        favoriteList.filter((preset) => {
          return (
            preset.origin.toString() !== originList.toString() ||
            preset.destination.toString() !== destinationList.toString()
          );
        })
      );
    } else {
      setFavoriteList([
        ...favoriteList,
        {
          id: "preset-" + favoriteList.length,
          name: "Preset " + (favoriteList.length + 1),
          origin: originList,
          destination: destinationList,
        },
      ]);
    }
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
    <div aria-label="search-panel" className={styles.area}>
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
            itemList={createDummyPortData()}
            selectionItems={originList}
            maxSelectionCount={originLimit}
            handleItemSelection={setOriginList}
            errorText="Please select origin"
            error={isOriginError}
          ></SearchTextField>
          <MdIconButton className="mt-2" onClick={switchOriginDestination}>
            <MdIcon>
              <SwapHorizOutlinedIcon />
            </MdIcon>
          </MdIconButton>
          <SearchTextField
            itemList={createDummyPortData()}
            selectionItems={destinationList}
            maxSelectionCount={destinationLimit}
            handleItemSelection={setDestinationList}
            errorText="Please select destination"
            error={isDestinationError}
          />
        </div>
        <MdFilledTonalIconButton
          className="mt-2"
          onClick={() => {
            toggleFavourite();
          }}
        >
          <MdIcon>
            {isCurrentRouteFavourite() ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </MdIcon>
        </MdFilledTonalIconButton>
        <MyFavorite
          onSelection={(origin, destination) => {
            if (origin.length > 1) {
              handleModeSelection("multi-origin");
            } else if (destination.length > 1) {
              handleModeSelection("multi-destination");
            } else {
              handleModeSelection("single");
            }
            setOriginList(origin);
            setDestinationList(destination);
          }}
        />
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
          defaultStartDate={dateRange[0]}
          defaultEndDate={dateRange[1]}
          handleDateRangeSelected={(range) => {
            setDateRange(range);
          }}
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
        <MdTextButton
          onClick={() => {
            clearAllSelection();
          }}
        >
          Reset
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            Validation() && searchAction(currentCondition);
          }}
        >
          Search
        </MdFilledButton>
      </div>
    </div>
  );
}
