import {
  useFloating,
  autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  useTransitionStyles,
} from "@floating-ui/react";
import { CSSProperties, useMemo, useState } from "react";
import moduleStyles from "@/app/styles/base.module.css";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
  MdCheckbox,
  MdElevation,
  MdFilledButton,
  MdList,
  MdListItem,
  MdTextButton,
} from "@/app/util/md3";
import { MdTypography } from "@/app/components/typography";
import { DateTime } from "luxon";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { createDummyVesselInformations } from "@/app/main/schedule/util";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";

const filterOptions = ["Vessel", "Booking Via"];

export default function SISearchCondition() {
  const [isFilterDetailsOpen, setIsFilterDetailsOpen] = useState(false);
  const [activeFilterOptions, setActiveFilterOptions] = useState<string[]>([]);
  const [searchCondition, setSearchCondition] = useState({
    date: "Request Date",
    bookingNo: "",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
    vesselInfo: {} as VesselInfoType,
    voyage: "",
    direction: "",
    bookingVia: "general" as "general" | "edi" | "web",
  });

  function getCondition() {
    let baseCondition: Object = {
      date: searchCondition.date,
      bookingNo: searchCondition.bookingNo,
      startDate: searchCondition.startDate,
      endDate: searchCondition.endDate,
    };

    if (activeFilterOptions.includes("Vessel")) {
      baseCondition = {
        ...baseCondition,
        vesselInfo: searchCondition.vesselInfo,
        voyage: searchCondition.voyage,
        direction: searchCondition.direction,
      };
    }

    if (activeFilterOptions.includes("Booking Via")) {
      baseCondition = {
        ...baseCondition,
        bookingVia: searchCondition.bookingVia,
      };
    }

    return baseCondition;
  }

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
      </div>
    );
  }, [
    searchCondition.direction,
    searchCondition.vesselInfo.vesselName,
    searchCondition.voyage,
  ]);

  const BookingViaFilter = useMemo(() => {
    return (
      <NAOutlinedListBox
        label="Booking Via"
        options={["General", "EDI", "Web"]}
        initialValue={
          {
            general: "General",
            edi: "EDI",
            web: "Web",
          }[searchCondition.bookingVia]
        }
        onSelection={(bookingVia) => {
          setSearchCondition((prev) => ({
            ...prev,
            bookingVia: bookingVia.toLowerCase() as "general" | "edi" | "web",
          }));
        }}
      />
    );
  }, [searchCondition.bookingVia]);

  const { refs, floatingStyles, context } = useFloating({
    open: isFilterDetailsOpen,
    onOpenChange: setIsFilterDetailsOpen,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  const { isMounted, styles } = useTransitionStyles(context);

  return (
    <>
      <div className={moduleStyles.area}>
        <div className="flex gap-4">
          <NAOutlinedListBox
            label="Date"
            initialValue={searchCondition.date}
            options={["Request Date", "Booking Date", "Departure Date"]}
            onSelection={(date) => {
              setSearchCondition((prev) => ({
                ...prev,
                date,
              }));
            }}
          />
          <MdRangeDatePicker
            defaultStartDate={searchCondition.startDate}
            defaultEndDate={searchCondition.endDate}
            handleDateRangeSelected={(dateRange) => {
              setSearchCondition((prev) => ({
                ...prev,
                startDate: dateRange[0],
                endDate: dateRange[1],
              }));
            }}
          />
          <NAOutlinedTextField
            label="Booking No"
            value={searchCondition.bookingNo}
            handleValueChange={(bookingNo) => {
              setSearchCondition((prev) => ({
                ...prev,
                bookingNo,
              }));
            }}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {activeFilterOptions.includes("Vessel") && VesselVoyageFilter}
          {activeFilterOptions.includes("Booking Via") && BookingViaFilter}
        </div>

        <div className="flex gap-4 justify-end">
          <MdTextButton
            onClick={() => {
              setSearchCondition({
                date: "Request Date",
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
          <MdTextButton
            ref={refs.setReference}
            {...getReferenceProps()}
            className={isFilterDetailsOpen ? "bg-secondaryFixed" : ""}
          >
            Filter Detils
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              console.log(getCondition());
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
      <div
        aria-label="filter-details-popover"
        {...getFloatingProps()}
        ref={refs.setFloating}
        style={floatingStyles}
        className="z-10"
      >
        {isMounted && (
          <div
            style={
              {
                "--md-elevation-level": 2,
                ...styles,
              } as CSSProperties
            }
            className="bg-surfaceContainer rounded-3xl relative w-72"
          >
            <MdElevation />
            <MdTypography variant="headline" size="small" className="p-6">
              Filter Details
            </MdTypography>
            <MdList className="bg-surfaceContainerHigh">
              {filterOptions.map((option) => (
                <MdListItem
                  key={option}
                  type="button"
                  className="border-b border-outlineVariant"
                  onClick={() => {
                    if (activeFilterOptions.includes(option)) {
                      setActiveFilterOptions(
                        activeFilterOptions.filter(
                          (filter) => filter !== option
                        )
                      );
                    } else {
                      setActiveFilterOptions([...activeFilterOptions, option]);
                    }
                  }}
                >
                  <div
                    slot="start"
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <MdCheckbox
                      checked={activeFilterOptions.includes(option)}
                    />
                  </div>
                  <div slot="headline">{option}</div>
                </MdListItem>
              ))}
            </MdList>
            <div className="p-6 flex justify-end">
              <MdTextButton
                onClick={() => {
                  setIsFilterDetailsOpen(false);
                }}
              >
                Close
              </MdTextButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
