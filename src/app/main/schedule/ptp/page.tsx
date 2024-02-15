"use client";

import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedSelect,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import NaToggleButton from "@/app/components/na-toggle-button";

export default function PointToPointSchedule() {
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
        <div aria-label="search-panel" className="bg-surface rounded-2xl p-6">
          <div className="flex gap-4">
            <MdOutlinedSelect label="Search On">
              <MdSelectOption value="departure">Departure</MdSelectOption>
              <MdSelectOption value="arrival">Arrival</MdSelectOption>
            </MdOutlinedSelect>
            <MdRangeDatePicker label="date" />
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
            <MdOutlinedSelect defaultValue={"earliest_departure"}>
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
              <MdIcon slot="icon">
                <DownloadIcon />
              </MdIcon>
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
