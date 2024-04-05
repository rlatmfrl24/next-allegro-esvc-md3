import { MdFilterChip, MdTextButton } from "@/app/util/md3";
import { useState } from "react";
import ListItem from "./components/listItem";
import NaToggleButton from "@/app/components/na-toggle-button";
import DownloadIcon from "@mui/icons-material/Download";
import { PtPScheduleType } from "@/app/util/typeDef/schedule";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { FilterChipMenu } from "@/app/components/filter-chip-menu";

export default function PointToPointListResult({
  list,
}: {
  list: PtPScheduleType[];
}) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MdTextButton>
            <div slot="icon">
              <DownloadIcon fontSize="small" />
            </div>
            Download
          </MdTextButton>

          <FilterChipMenu
            initialValue="Earliest Departure"
            options={[
              "Earliest Departure",
              "Earliest Arrival",
              "Fatest Transit Time",
            ]}
          />

          <MdFilterChip label="Direct Only" />
        </div>

        <MdTypography variant="label" size="large" className="text-outline ">
          Total: {list.length}
        </MdTypography>
      </div>
      <div className="flex flex-col gap-4">
        {list.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
