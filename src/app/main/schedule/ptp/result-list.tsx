import { MdFilterChip, MdTextButton } from "@/app/util/md3";
import { useState } from "react";
import ListItem from "./components/listItem";
import NaToggleButton from "@/app/components/na-toggle-button";
import DownloadIcon from "@mui/icons-material/Download";
import { PtPScheduleType } from "@/app/util/typeDef/schedule";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";

export default function PointToPointListResult({
  list,
}: {
  list: PtPScheduleType[];
}) {
  const [isDirectOnly, setIsDirectOnly] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <NAOutlinedListBox
          label="Sort By"
          initialValue="Earliest Departure"
          options={[
            "Earliest Departure",
            "Earliest Arrival",
            "Fatest Transit Time",
          ]}
        />

        <MdFilterChip label="Direct Only" />

        <div className="flex-1"></div>
        <MdTextButton>
          <div slot="icon">
            <DownloadIcon fontSize="small" />
          </div>
          Download
        </MdTextButton>
      </div>
      <div className="flex flex-col gap-4">
        {list.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
