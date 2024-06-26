import { useMemo, useRef, useState } from "react";
import moduleStyles from "@/app/styles/base.module.css";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdRangeDatePicker } from "@/app/components/datepickers/old/range-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
  MdFilledButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import { DateTime } from "luxon";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { createDummyVesselInformations } from "@/app/main/schedule/util";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { useRecoilValue } from "recoil";
import { ScrollState } from "@/app/store/global.store";
import { FocusOnResult } from "../../util";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import NaOutlinedSegmentedButton from "@/app/components/na-outlined-segmented-button";

export default function SISearchCondition() {
  const [conditionType, setConditionType] = useState<
    | "Request Date"
    | "Departure Date"
    | "Booking Date"
    | "Vessel"
    | "Booking No."
  >("Request Date");

  const [searchCondition, setSearchCondition] = useState({
    conditionType: "Request Date",
    bookingNo: "",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
    vesselInfo: {} as VesselInfoType,
    voyage: "",
    direction: "",
    bookingVia: "all" as "all" | "general" | "edi" | "web",
  });

  function getCondition() {
    let baseCondition: Object = {
      date: searchCondition.conditionType,
    };
    switch (searchCondition.conditionType) {
      case "Request Date":
        baseCondition = {
          ...baseCondition,
          startDate: searchCondition.startDate,
          endDate: searchCondition.endDate,
          bookingVia: searchCondition.bookingVia,
        };
        break;
      case "Departure Date":
        baseCondition = {
          ...baseCondition,
          startDate: searchCondition.startDate,
          endDate: searchCondition.endDate,
          bookingVia: searchCondition.bookingVia,
        };
        break;
      case "Booking Date":
        baseCondition = {
          ...baseCondition,
          startDate: searchCondition.startDate,
          endDate: searchCondition.endDate,
          bookingVia: searchCondition.bookingVia,
        };
        break;
      case "Vessel":
        baseCondition = {
          ...baseCondition,
          vesselInfo: searchCondition.vesselInfo,
          voyage: searchCondition.voyage,
          direction: searchCondition.direction,
          bookingVia: searchCondition.bookingVia,
        };
        break;
      case "Booking No.":
        baseCondition = {
          ...baseCondition,
          bookingNo: searchCondition.bookingNo,
          bookingVia: searchCondition.bookingVia,
        };
        break;
    }
    return baseCondition;
  }
  const BookingViaFilter = useMemo(() => {
    return (
      <NAOutlinedListBox
        label="Booking Via"
        options={["All", "General", "EDI", "Web"]}
        initialValue={
          {
            all: "All",
            general: "General",
            edi: "EDI",
            web: "Web",
          }[searchCondition.bookingVia]
        }
        onSelection={(bookingVia) => {
          setSearchCondition((prev) => ({
            ...prev,
            bookingVia: bookingVia.toLowerCase() as
              | "all"
              | "general"
              | "edi"
              | "web",
          }));
        }}
      />
    );
  }, [searchCondition.bookingVia]);

  const VesselVoyageFilter = useMemo(() => {
    const vesselInfos = createDummyVesselInformations(50);

    return (
      <div className="flex gap-2">
        <NAOutlinedAutoComplete
          label="Vessel Name"
          className="min-w-[502px]"
          initialValue={searchCondition.vesselInfo.vesselName}
          itemList={vesselInfos.map((vessel) => vessel.vesselName)}
          onItemSelection={(selected) => {
            const selectedVessel = vesselInfos.find(
              (vessel) => vessel.vesselName === selected
            );
            if (selectedVessel) {
              setSearchCondition((prev) => ({
                ...prev,
                vesselInfo: selectedVessel,
              }));
            }
          }}
        />
        <NAOutlinedTextField
          className="min-w-72"
          label="Voyage"
          value={searchCondition.voyage}
          handleValueChange={(voyage) => {
            setSearchCondition((prev) => ({
              ...prev,
              voyage,
            }));
          }}
        />
        <NAOutlinedListBox
          className="w-40"
          label="Direction"
          initialValue={
            {
              east: "E",
              west: "W",
              north: "N",
              south: "S",
            }[searchCondition.direction]
          }
          options={["E", "W", "N", "S"]}
          onSelection={(value) => {
            const direction = {
              E: "east",
              W: "west",
              N: "north",
              S: "south",
            }[value] as string;

            setSearchCondition((prev) => ({
              ...prev,
              direction,
            }));
          }}
        />
        {BookingViaFilter}
      </div>
    );
  }, [
    BookingViaFilter,
    searchCondition.direction,
    searchCondition.vesselInfo.vesselName,
    searchCondition.voyage,
  ]);

  const BookingDateFilter = useMemo(() => {
    return (
      <>
        <DateRangePicker
          label="Booking Date"
          initial={{
            start: searchCondition.startDate,
            end: searchCondition.endDate,
          }}
          onDateChange={(dateRange) => {
            setSearchCondition((prev) => ({
              ...prev,
              startDate: dateRange.start!,
              endDate: dateRange.end!,
            }));
          }}
        />
        {BookingViaFilter}
      </>
    );
  }, [BookingViaFilter, searchCondition.endDate, searchCondition.startDate]);

  const DepartureDateFilter = useMemo(() => {
    return (
      <>
        <DateRangePicker
          label="Departure Date"
          initial={{
            start: searchCondition.startDate,
            end: searchCondition.endDate,
          }}
          onDateChange={(dateRange) => {
            setSearchCondition((prev) => ({
              ...prev,
              startDate: dateRange.start!,
              endDate: dateRange.end!,
            }));
          }}
        />
        {BookingViaFilter}
      </>
    );
  }, [BookingViaFilter, searchCondition.endDate, searchCondition.startDate]);

  const RequestDateFilter = useMemo(() => {
    return (
      <>
        <DateRangePicker
          label="Request Date"
          initial={{
            start: searchCondition.startDate,
            end: searchCondition.endDate,
          }}
          onDateChange={(dateRange) => {
            setSearchCondition((prev) => ({
              ...prev,
              startDate: dateRange.start!,
              endDate: dateRange.end!,
            }));
          }}
        />
        {BookingViaFilter}
      </>
    );
  }, [BookingViaFilter, searchCondition.endDate, searchCondition.startDate]);

  const BookingNumberFilter = useMemo(() => {
    return (
      <>
        <NAOutlinedTextField
          label="Booking No."
          value={searchCondition.bookingNo}
          handleValueChange={(bookingNo) => {
            setSearchCondition((prev) => ({
              ...prev,
              bookingNo,
            }));
          }}
        />
        {BookingViaFilter}
      </>
    );
  }, [BookingViaFilter, searchCondition.bookingNo]);

  const areaRef = useRef<HTMLDivElement>(null);
  const scrollState = useRecoilValue(ScrollState);

  return (
    <>
      <div ref={areaRef} className={moduleStyles.area}>
        <MdOutlinedSegmentedButtonSet>
          <NaOutlinedSegmentedButton
            label="Request Date"
            selected={conditionType === "Request Date"}
            onClick={() => {
              setConditionType("Request Date");
            }}
          />
          <NaOutlinedSegmentedButton
            label="Departure Date"
            selected={conditionType === "Departure Date"}
            onClick={() => {
              setConditionType("Departure Date");
            }}
          />
          <NaOutlinedSegmentedButton
            label="Booking Date"
            selected={conditionType === "Booking Date"}
            onClick={() => {
              setConditionType("Booking Date");
            }}
          />
          <NaOutlinedSegmentedButton
            label="Vessel"
            selected={conditionType === "Vessel"}
            onClick={() => {
              setConditionType("Vessel");
            }}
          />
          <NaOutlinedSegmentedButton
            label="Booking No."
            selected={conditionType === "Booking No."}
            onClick={() => {
              setConditionType("Booking No.");
            }}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4">
          <div className="flex gap-4">
            {
              {
                "Request Date": RequestDateFilter,
                "Departure Date": DepartureDateFilter,
                "Booking Date": BookingDateFilter,
                Vessel: VesselVoyageFilter,
                "Booking No.": BookingNumberFilter,
              }[conditionType]
            }
          </div>

          <div className="flex gap-4 justify-end h-full items-end flex-1">
            <MdTextButton
              onClick={() => {
                setSearchCondition({
                  conditionType: "Request Date",
                  bookingNo: "",
                  startDate: DateTime.now(),
                  endDate: DateTime.now(),
                  vesselInfo: {} as VesselInfoType,
                  voyage: "",
                  direction: "east",
                  bookingVia: "general" as "general" | "edi" | "web",
                });
              }}
            >
              Reset
            </MdTextButton>
            <MdFilledButton
              onClick={() => {
                console.log(getCondition());
                FocusOnResult(areaRef, scrollState.instance);
              }}
            >
              Search
            </MdFilledButton>
          </div>
        </div>
      </div>
    </>
  );
}
