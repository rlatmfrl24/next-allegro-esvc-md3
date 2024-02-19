import NaToggleButton from "@/app/components/na-toggle-button";
import { MdOutlinedSelect, MdSelectOption, MdTextButton } from "@/app/util/md3";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import ListItem from "./listItem";
import { DateTime } from "luxon";

export default function PointToPointListResult() {
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
        {Array.from({ length: 10 }).map((_, index) => (
          <ListItem
            key={index}
            item={{
              origin: "Bangkok, Thailand",
              destination: "Busan, South Korea",
              departure: DateTime.fromFormat("2024-02-01", "yyyy-MM-dd"),
              arrival: DateTime.fromFormat("2024-02-01", "yyyy-MM-dd"),
              vesselName: "Sawasdee thailand 2204S",
              transitTime: 12,
              serviceLane: "EC1",
            }}
          />
        ))}
      </div>
    </div>
  );
}
