import {
  MdFilledButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import { useMemo, useState } from "react";
import NAOutlinedAutoComplete from "../na-autocomplete";
import {
  createDummyPlaceInformation,
  createDummyVesselInformations,
} from "@/app/main/schedule/util";
import { faker } from "@faker-js/faker";
import { PlaceOutlined } from "@mui/icons-material";
import NAOutlinedListBox from "../na-outline-listbox";
import { MdRangeDatePicker } from "../datepickers/old/range-picker";
import Link from "next/link";
import VesselIcon from "@/../public/icon_vessel_outline.svg";
import PortIcon from "@/../public/icon_port.svg";
import { DateRangePicker } from "../datepickers/date-range-picker";
import { DateTime } from "luxon";
import NaOutlinedSegmentedButton from "../na-outlined-segmented-button";

export default function QuickSchedule() {
  const [mode, setMode] = useState("point-to-point");

  return (
    <>
      <MdOutlinedSegmentedButtonSet>
        <NaOutlinedSegmentedButton
          selected={mode === "point-to-point"}
          label="Point to Point"
          onClick={() => {
            setMode("point-to-point");
          }}
        />
        <NaOutlinedSegmentedButton
          selected={mode === "vessel"}
          label="Vessel"
          onClick={() => {
            setMode("vessel");
          }}
        />
        <NaOutlinedSegmentedButton
          selected={mode === "port"}
          label="Port"
          onClick={() => {
            setMode("port");
          }}
        />
        <NaOutlinedSegmentedButton
          selected={mode === "long-range"}
          label="Long Range"
          onClick={() => {
            setMode("long-range");
          }}
        />
      </MdOutlinedSegmentedButtonSet>
      <div className="mt-6 flex-1">
        {
          {
            "point-to-point": <PtpSearch />,
            vessel: <VesselSearch />,
            port: <PortSearch />,
            "long-range": <LongRangeSearch />,
          }[mode]
        }
      </div>
    </>
  );
}

const PtpSearch = () => {
  const tempPorts = useMemo(() => {
    return Array.from({ length: 1200 }, (_, i) =>
      createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      )
    );
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <NAOutlinedAutoComplete
        label="Origin"
        icon={<PlaceOutlined />}
        itemList={tempPorts.map((port) => port.yardName)}
        maxListHeight={240}
      />
      <NAOutlinedAutoComplete
        label="Destination"
        icon={<PlaceOutlined />}
        itemList={tempPorts.map((port) => port.yardName)}
        maxListHeight={240}
      />
      <div className="flex gap-4">
        <NAOutlinedListBox
          label="Search On"
          initialValue="Departure"
          options={["Departure", "Arrival"]}
        />
        <DateRangePicker
          label="Date"
          initial={{
            start: DateTime.now(),
            end: DateTime.now().plus({ days: 7 }),
          }}
        />
      </div>
      <div className="flex-1 flex justify-end items-end h-full gap-2">
        <MdTextButton>Reset</MdTextButton>
        <Link href={`/main/schedule/ptp`}>
          <MdFilledButton>Search</MdFilledButton>
        </Link>
      </div>
    </div>
  );
};

const VesselSearch = () => {
  const tempVessels = useMemo(() => {
    return createDummyVesselInformations(50);
  }, []);
  return (
    <div className="flex h-full flex-col gap-4">
      <NAOutlinedAutoComplete
        label="Vessel Name"
        icon={<VesselIcon />}
        itemList={tempVessels.map((vessel) => vessel.vesselName)}
      />
      <div className="flex-1 flex justify-end items-end h-full gap-2">
        <MdTextButton>Reset</MdTextButton>
        <Link href={`/main/schedule/vessel`}>
          <MdFilledButton>Search</MdFilledButton>
        </Link>
      </div>
    </div>
  );
};

const PortSearch = () => {
  const tempPorts = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) =>
      createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      )
    );
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <NAOutlinedAutoComplete
        label="Port Name"
        icon={<PortIcon />}
        itemList={tempPorts.map((port) => port.yardName)}
      />
      <DateRangePicker
        label="Date"
        className="w-full"
        initial={{
          start: DateTime.now(),
          end: DateTime.now().plus({ days: 7 }),
        }}
      />
      <div className="flex-1 flex justify-end items-end h-full gap-2">
        <MdTextButton>Reset</MdTextButton>
        <Link href={`/main/schedule/port`}>
          <MdFilledButton>Search</MdFilledButton>
        </Link>
      </div>
    </div>
  );
};

const LongRangeSearch = () => {
  const continents = [
    { key: "north-us", value: "North America" },
    { key: "south-us", value: "South America" },
    { key: "europe", value: "Europe" },
    { key: "asia", value: "Asia" },
    { key: "africa", value: "Africa" },
    { key: "oceania", value: "Oceania" },
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex gap-4">
        <NAOutlinedListBox
          className="flex-1"
          label="Continent From"
          options={continents.map((continent) => continent.value)}
        />
        <NAOutlinedListBox
          className="flex-1"
          label="Continent To"
          options={continents.map((continent) => continent.value)}
        />
      </div>
      <div className="flex-1 flex justify-end items-end h-full gap-2">
        <MdTextButton>Reset</MdTextButton>
        <Link href={`/main/schedule/long-range`}>
          <MdFilledButton>Search</MdFilledButton>
        </Link>
      </div>
    </div>
  );
};
