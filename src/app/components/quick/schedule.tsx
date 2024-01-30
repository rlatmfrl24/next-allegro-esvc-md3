import { MdOutlinedSelect, MdSelectOption } from "@/app/util/md3";
import { MdSegmentedButton, MdSegmentedButtons } from "../segmented-button";

const continents = [
  { key: "north-us", value: "North America" },
  { key: "south-us", value: "South America" },
  { key: "europe", value: "Europe" },
  { key: "asia", value: "Asia" },
  { key: "africa", value: "Africa" },
  { key: "oceania", value: "Oceania" },
];

export default function QuickSchedule() {
  return (
    <>
      <MdSegmentedButtons
        value="segment-schedule"
        onChange={(value) => {
          console.log(value);
        }}
      >
        <MdSegmentedButton id="segment-schedule">Schedule</MdSegmentedButton>
        <MdSegmentedButton id="segment-port">Port Schedule</MdSegmentedButton>
        <MdSegmentedButton id="segment-long-range">
          Long Range Schedule
        </MdSegmentedButton>
      </MdSegmentedButtons>
      <div className="grid grid-cols-2 my-6 gap-4">
        <MdOutlinedSelect label="Origin">
          {continents.map((continent) => (
            <MdSelectOption key={continent.key} value={continent.key}>
              {continent.value}
            </MdSelectOption>
          ))}
        </MdOutlinedSelect>
        <MdOutlinedSelect label="Destination">
          {continents.map((continent) => (
            <MdSelectOption key={continent.key} value={continent.key}>
              {continent.value}
            </MdSelectOption>
          ))}
        </MdOutlinedSelect>
        <MdOutlinedSelect label="Year">
          {Array.from({ length: 50 }, (_, i) => i + 1990).map((year) => (
            <MdSelectOption key={year} value={year.toString()}>
              {year}
            </MdSelectOption>
          ))}
        </MdOutlinedSelect>
        <MdOutlinedSelect label="Month">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MdSelectOption key={month} value={month.toString()}>
              {month}
            </MdSelectOption>
          ))}
        </MdOutlinedSelect>
      </div>
    </>
  );
}
