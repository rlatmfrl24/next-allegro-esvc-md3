import { MdOutlinedSelect, MdSelectOption, MdTextButton } from "@/app/util/md3";
import { useState } from "react";
import { ListItemProps } from "./typeDef";
import ListItem from "./listItem";
import NaToggleButton from "@/app/components/na-toggle-button";
import DownloadIcon from "@mui/icons-material/Download";

export default function PointToPointListResult({
  list,
}: {
  list: ListItemProps[];
}) {
  const [listSort, setListSort] = useState<
    | "earliest_departure"
    | "latest_departure"
    | "earliest_arrival"
    | "latest_arrival"
  >("earliest_departure");

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <MdOutlinedSelect
          label="Sort By"
          value={listSort}
          onClick={(e) => setListSort((e.target as any).value)}
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
          <MdSelectOption value="latest_arrival">Latest Arrival</MdSelectOption>
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
      <div className="flex flex-col gap-4">
        {list.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
