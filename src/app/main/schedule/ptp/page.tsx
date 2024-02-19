"use client";

import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdElevationButton,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedSelect,
  MdSelectOption,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { useEffect, useState } from "react";
import NaToggleButton from "@/app/components/na-toggle-button";
import { SearchTextField } from "./search-textfield";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import ListItem from "./listItem";
import { DateTime } from "luxon";

export default function PointToPointSchedule() {
  const [listSort, setListSort] = useState<
    | "earliest_departure"
    | "latest_departure"
    | "earliest_arrival"
    | "latest_arrival"
  >("earliest_departure");
  const [pageState, setPageState] = useState<"unsearch" | "list" | "calendar">(
    "unsearch"
  );

  const [originList, setOriginList] = useState<string[]>([]);
  const [destinationList, setDestinationList] = useState<string[]>([]);

  useEffect(() => {
    console.log("originList", originList);
    console.log("destinationList", destinationList);
  }, [originList, destinationList]);

  function switchOriginDestination() {
    const temp = originList;
    setOriginList(destinationList);
    setDestinationList(temp);
  }

  return (
    <div className="relative flex-1 flex justify-center">
      <div
        aria-label="container"
        className="max-w-[1400px] w-full p-6 flex flex-col gap-4"
      >
        <div
          aria-label="page-title"
          className="flex justify-start items-center gap-3"
        >
          <MdTypography variant="title" size="large">
            Point to Point Schedule
          </MdTypography>
          <MdIconButton>
            <MdIcon>
              <FavoriteBorderIcon />
            </MdIcon>
          </MdIconButton>
        </div>
        <div
          aria-label="search-panel"
          className="bg-surface rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex gap-4 ">
            <div className="flex flex-1 gap-4">
              <SearchTextField
                maxSelectionCount={3}
                selectionItems={originList}
                handleItemSelection={setOriginList}
              />
              <MdIconButton className="mt-2" onClick={switchOriginDestination}>
                <MdIcon>
                  <SwapHorizOutlinedIcon />
                </MdIcon>
              </MdIconButton>
              <SearchTextField
                maxSelectionCount={3}
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
                setPageState("list");
              }}
            >
              Search
            </MdFilledButton>
          </div>
        </div>
        <div
          aria-label="result-panel"
          className="bg-surface rounded-2xl p-6 flex flex-col gap-4"
        >
          <MdOutlinedSegmentedButtonSet>
            <MdOutlinedSegmentedButton
              label="List"
              selected={pageState === "list"}
              onClick={() => setPageState("list")}
            ></MdOutlinedSegmentedButton>
            <MdOutlinedSegmentedButton
              label="Calendar"
              selected={pageState === "calendar"}
              onClick={() => setPageState("calendar")}
            ></MdOutlinedSegmentedButton>
          </MdOutlinedSegmentedButtonSet>
          <div className="flex items-center gap-4">
            <MdOutlinedSelect
              label="Sort By"
              value={listSort}
              onChange={(e) => setListSort((e.target as any).value)}
            >
              <MdSelectOption value="earliest_departure">
                Earliest Departure
              </MdSelectOption>
              <MdSelectOption value="latest_departure">
                Latest Departure
              </MdSelectOption>
              <MdSelectOption value="earliest_arrival">
                Earliest Arrival
              </MdSelectOption>
              <MdSelectOption value="latest_arrival">
                Latest Arrival
              </MdSelectOption>
            </MdOutlinedSelect>
            <NaToggleButton label="Direct Only" state="checked" />

            <div className="flex-1"></div>
            <MdTextButton>
              <div slot="icon">
                <DownloadIcon className="w-5 h-5" />
              </div>
              Download
            </MdTextButton>
          </div>
          {
            {
              unsearch: (
                <div
                  aria-label="empty-container"
                  className="h-96 border-outlineVariant border rounded-xl"
                ></div>
              ),
              list: (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <ListItem
                      key={index}
                      item={{
                        origin: "Bangkok, Thailand",
                        destination: "Busan, South Korea",
                        departure: DateTime.fromFormat(
                          "2024-02-01",
                          "yyyy-MM-dd"
                        ),
                        arrival: DateTime.fromFormat(
                          "2024-02-01",
                          "yyyy-MM-dd"
                        ),
                        vesselName: "Sawasdee thailand 2204S",
                        transitTime: 12,
                        serviceLane: "EC1",
                      }}
                    />
                  ))}
                </div>
              ),
              calendar: (
                <div
                  aria-label="empty-container"
                  className="h-96 border-outlineVariant border rounded-xl"
                ></div>
              ),
            }[pageState]
          }
        </div>
      </div>
    </div>
  );
}
