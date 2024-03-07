import { DateTime } from "luxon";
import { CSSProperties, useMemo, useState } from "react";

import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import moduleStyles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdElevation,
  MdFilledButton,
  MdList,
  MdListItem,
  MdOutlinedSelect,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import { PlaceInformationType, VesselInfoType } from "@/app/util/typeDef";
import { faker } from "@faker-js/faker";
import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";

import {
  createDummyPlaceInformation,
  createDummyVesselInformations,
} from "../../schedule/util";

const filterOptions = [
  {
    id: "vesselVoyage",
    label: "Vessel & Voyage",
  },
  {
    id: "bookingVia",
    label: "Booking Via",
  },
  {
    id: "origin",
    label: "Origin",
  },
  {
    id: "destination",
    label: "Destination",
  },
];

export default function BookingStatusCondition() {
  const [stateCondition, setStateCondition] = useState<
    "requestNo" | "bookingNo"
  >("requestNo");
  const [isFilterDetailsOpen, setIsFilterDetailsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchCondition, setSearchCondition] = useState({
    requestDateStart: DateTime.now(),
    requestDateEnd: DateTime.now(),
    requestNo: "",
    bookingNo: "",
    vesselInfo: {} as VesselInfoType,
    voyage: "",
    direction: "" as "east" | "west" | "north" | "south",
    bookingVia: "general" as "web" | "edi" | "general",
    origin: {} as PlaceInformationType,
    destination: {} as PlaceInformationType,
  });

  function getCondition() {
    const baseCondition = {
      requestDateStart: searchCondition.requestDateStart,
      requestDateEnd: searchCondition.requestDateEnd,
      requestNo: searchCondition.requestNo,
      bookingNo: searchCondition.bookingNo,
    };

    if (activeFilters.includes("vesselVoyage")) {
      return {
        ...baseCondition,
        vesselInfo: searchCondition.vesselInfo,
        voyage: searchCondition.voyage,
        direction: searchCondition.direction,
      };
    }

    if (activeFilters.includes("bookingVia")) {
      return {
        ...baseCondition,
        bookingVia: searchCondition.bookingVia,
      };
    }

    if (activeFilters.includes("origin")) {
      return {
        ...baseCondition,
        origin: searchCondition.origin,
      };
    }

    if (activeFilters.includes("destination")) {
      return {
        ...baseCondition,
        destination: searchCondition.destination,
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
          itemList={vesselInfos.map((vessel) => vessel.vesselName)}
          onSelection={(selected) => {
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
          value=""
          handleValueChange={(value) => {
            setSearchCondition((prev) => ({
              ...prev,
              voyage: value,
            }));
          }}
        />
        <MdOutlinedSelect
          label="Direction"
          onchange={(e) => {
            const target = e.target as HTMLSelectElement;
            setSearchCondition((prev) => ({
              ...prev,
              direction: target.value as "east" | "west" | "north" | "south",
            }));
          }}
        >
          <MdSelectOption value="east">E</MdSelectOption>
          <MdSelectOption value="west">W</MdSelectOption>
          <MdSelectOption value="north">N</MdSelectOption>
          <MdSelectOption value="south">S</MdSelectOption>
        </MdOutlinedSelect>
      </div>
    );
  }, []);

  const BookingViaFilter = useMemo(() => {
    return (
      <MdOutlinedSelect
        label="Booking Via"
        selectedIndex={
          searchCondition.bookingVia === "web"
            ? 0
            : searchCondition.bookingVia === "edi"
            ? 1
            : 2
        }
        onchange={(e) => {
          const target = e.target as HTMLSelectElement;
          setSearchCondition({
            ...searchCondition,
            bookingVia: target.value as "web" | "edi" | "general",
          });
        }}
      >
        <MdSelectOption value="web">Web</MdSelectOption>
        <MdSelectOption value="edi">EDI</MdSelectOption>
        <MdSelectOption value="general">General</MdSelectOption>
      </MdOutlinedSelect>
    );
  }, [searchCondition]);

  const OriginPortFilter = useMemo(() => {
    const portList = Array.from({ length: 50 }, (_, i) => {
      return createDummyPlaceInformation(faker.location.city());
    });

    return (
      <NAOutlinedAutoComplete
        label="Origin"
        itemList={portList.map((port) => port.yardName)}
        onSelection={(selected) => {
          const selectedPort = portList.find(
            (port) => port.yardName === selected
          );
          if (selectedPort) {
            setSearchCondition((prev) => ({
              ...prev,
              origin: selectedPort,
            }));
          }
        }}
      />
    );
  }, []);

  const DestinationPortFilter = useMemo(() => {
    const portList = Array.from({ length: 50 }, (_, i) => {
      return createDummyPlaceInformation(faker.location.city());
    });

    return (
      <NAOutlinedAutoComplete
        label="Destination"
        itemList={portList.map((port) => port.yardName)}
        onSelection={(selected) => {
          const selectedPort = portList.find(
            (port) => port.yardName === selected
          );
          if (selectedPort) {
            setSearchCondition((prev) => ({
              ...prev,
              destination: selectedPort,
            }));
          }
        }}
      />
    );
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open: isFilterDetailsOpen,
    onOpenChange: setIsFilterDetailsOpen,
    placement: "bottom-start",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0, transform: "translateY(-8px)" },
    open: { opacity: 1, transform: "translateY(0px)" },
    close: { opacity: 0, transform: "translateY(-8px)" },
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ]);

  return (
    <div className={moduleStyles.area}>
      <div className="flex gap-4">
        <MdRangeDatePicker
          label="Request Date"
          defaultStartDate={searchCondition.requestDateStart}
          defaultEndDate={searchCondition.requestDateEnd}
          handleDateRangeSelected={(dateRange) => {
            setSearchCondition({
              ...searchCondition,
              requestDateStart: dateRange[0],
              requestDateEnd: dateRange[1],
            });
          }}
        />
        <div className="flex gap-2">
          <MdOutlinedSelect
            label="State No."
            selectedIndex={stateCondition === "requestNo" ? 0 : 1}
            onchange={(e) => {
              const target = e.target as HTMLSelectElement;
              setStateCondition(target.value as "requestNo" | "bookingNo");
              //clear each value
              setSearchCondition({
                ...searchCondition,
                requestNo: "",
                bookingNo: "",
              });
            }}
          >
            <MdSelectOption value="requestNo">Request No.</MdSelectOption>
            <MdSelectOption value="bookingNo">Booking No.</MdSelectOption>
          </MdOutlinedSelect>
          <NAOutlinedTextField
            placeholder={
              stateCondition === "requestNo" ? "Request No." : "Booking No."
            }
            value={searchCondition[stateCondition]}
            handleValueChange={(value) => {
              setSearchCondition({
                ...searchCondition,
                [stateCondition]: value,
              });
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {activeFilters.includes("vesselVoyage") && VesselVoyageFilter}
        {activeFilters.includes("bookingVia") && BookingViaFilter}
        {activeFilters.includes("origin") && OriginPortFilter}
        {activeFilters.includes("destination") && DestinationPortFilter}
      </div>
      <div className="flex gap-4 justify-end">
        <MdTextButton>Reset</MdTextButton>
        <MdTextButton
          ref={refs.setReference}
          {...getReferenceProps()}
          className={isFilterDetailsOpen ? "bg-secondaryFixed" : ""}
        >
          Filter Details
        </MdTextButton>

        <MdFilledButton
          onClick={() => {
            console.log(getCondition());
          }}
        >
          Search
        </MdFilledButton>
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
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
            className="bg-surfaceContainerHigh rounded-3xl relative w-72"
          >
            <MdElevation />
            <MdTypography variant="headline" size="small" className="p-6">
              Filter Details
            </MdTypography>
            <MdList className="bg-surfaceContainerHigh">
              {filterOptions.map((item) => (
                <MdListItem
                  key={item.id}
                  className="border-b border-b-outlineVariant"
                  type="button"
                  onClick={() => {
                    if (activeFilters.includes(item.id)) {
                      setActiveFilters(
                        activeFilters.filter((id) => id !== item.id)
                      );
                      setSearchCondition({
                        ...searchCondition,
                        [item.id]: "",
                      });
                    } else {
                      setActiveFilters([...activeFilters, item.id]);
                    }
                  }}
                >
                  <div
                    slot="start"
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <MdCheckbox checked={activeFilters.includes(item.id)} />
                  </div>
                  <div slot="headline">{item.label}</div>
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
    </div>
  );
}
