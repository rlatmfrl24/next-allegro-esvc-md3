"use client";

import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedSelect,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import { useState } from "react";
import NaToggleButton from "@/app/components/na-toggle-button";
import { SearchTextField } from "./search-textfield";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

export default function PointToPointSchedule() {
  const [listSort, setListSort] = useState<
    | "earliest_departure"
    | "latest_departure"
    | "earliest_arrival"
    | "latest_arrival"
  >("earliest_departure");

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
              <SearchTextField maxSelectionCount={3} />
              <MdIconButton className="mt-2">
                <MdIcon>
                  <SwapHorizOutlinedIcon />
                </MdIcon>
              </MdIconButton>
              <SearchTextField maxSelectionCount={3} />
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
            <MdRangeDatePicker label="Date" />
          </div>
          <div className="flex justify-end gap-2">
            <MdTextButton>Reset</MdTextButton>
            <MdFilledButton>Search</MdFilledButton>
          </div>
        </div>
        <div
          aria-label="result-panel"
          className="bg-surface rounded-2xl p-6 flex flex-col gap-4"
        >
          <MdOutlinedSegmentedButtonSet>
            <MdOutlinedSegmentedButton
              label="List"
              selected
            ></MdOutlinedSegmentedButton>
            <MdOutlinedSegmentedButton label="Calendar"></MdOutlinedSegmentedButton>
          </MdOutlinedSegmentedButtonSet>
          <div className="flex items-center gap-4">
            <MdOutlinedSelect
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
            <NaToggleButton label="Earliest arrival only" state="checked" />
            <div className="flex-1"></div>
            <MdTextButton>
              <div slot="icon">
                <DownloadIcon className="w-5 h-5" />
              </div>
              Download
            </MdTextButton>
          </div>
          <div
            aria-label="empty-container"
            className="h-96 border-outlineVariant border rounded-xl"
          ></div>
        </div>
      </div>
    </div>
  );
}
