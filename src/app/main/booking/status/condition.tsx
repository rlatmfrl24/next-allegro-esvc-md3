import { DateTime } from "luxon";
import { CSSProperties, useMemo, useRef, useState } from "react";

import { MdRangeDatePicker } from "@/app/components/datepickers/old/range-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import moduleStyles from "@/app/styles/base.module.css";
import { basicPopoverStyles } from "@/app/util/constants";
import {
  MdCheckbox,
  MdElevation,
  MdFilledButton,
  MdList,
  MdListItem,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
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
import { useRecoilValue } from "recoil";
import { ScrollState } from "@/app/store/global.store";
import { FocusOnResult } from "../../util";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import { DividerComponent } from "@/app/components/divider";

const filterOptions = [
  {
    id: "referenceNo",
    label: "Reference No.",
  },
  {
    id: "origin",
    label: "Origin",
  },
  {
    id: "destination",
    label: "Destination",
  },
  {
    id: "bookingVia",
    label: "Booking Via",
  },
];

export default function BookingStatusCondition() {
  const [stateCondition, setStateCondition] = useState<
    "requestDate" | "vessel"
  >("requestDate");
  const [isFilterDetailsOpen, setIsFilterDetailsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchCondition, setSearchCondition] = useState({
    requestDateStart: DateTime.now(),
    requestDateEnd: DateTime.now(),
    requestNo: "",
    referenceNo: "",
    vesselInfo: {} as VesselInfoType,
    voyage: "",
    direction: "" as "east" | "west" | "north" | "south",
    bookingVia: "general" as "web" | "edi" | "general",
    origin: {} as PlaceInformationType,
    destination: {} as PlaceInformationType,
  });

  function getCondition() {
    let baseCondition: Object = {
      requestDateStart: searchCondition.requestDateStart,
      requestDateEnd: searchCondition.requestDateEnd,
      requestNo: searchCondition.requestNo,
      referenceNo: searchCondition.referenceNo,
    };

    if (activeFilters.includes("referenceNo")) {
      baseCondition = {
        ...baseCondition,
        referenceNo: searchCondition.referenceNo,
      };
    }

    if (activeFilters.includes("bookingVia")) {
      baseCondition = {
        ...baseCondition,
        bookingVia: searchCondition.bookingVia,
      };
    }

    if (activeFilters.includes("origin")) {
      baseCondition = {
        ...baseCondition,
        origin: searchCondition.origin,
      };
    }

    if (activeFilters.includes("destination")) {
      baseCondition = {
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
          value=""
          handleValueChange={(value) => {
            setSearchCondition((prev) => ({
              ...prev,
              voyage: value,
            }));
          }}
        />

        <NAOutlinedListBox
          label="Direction"
          initialValue={
            searchCondition.direction === "east"
              ? "E"
              : searchCondition.direction === "west"
              ? "W"
              : searchCondition.direction === "north"
              ? "N"
              : "S"
          }
          options={["E", "W", "N", "S"]}
          onSelection={(value) => {
            setSearchCondition((prev) => ({
              ...prev,
              direction:
                value === "E"
                  ? "east"
                  : value === "W"
                  ? "west"
                  : value === "N"
                  ? "north"
                  : "south",
            }));
          }}
        />
      </div>
    );
  }, [searchCondition.direction]);

  const BookingViaFilter = useMemo(() => {
    return (
      <>
        <NAOutlinedListBox
          label="Booking Via"
          options={["Web", "EDI", "General"]}
          initialValue={
            searchCondition.bookingVia === "web"
              ? "Web"
              : searchCondition.bookingVia === "edi"
              ? "EDI"
              : "General"
          }
          onSelection={(value) => {
            setSearchCondition((prev) => ({
              ...prev,
              bookingVia:
                value === "Web" ? "web" : value === "EDI" ? "edi" : "general",
            }));
          }}
        />
      </>
    );
  }, [searchCondition]);

  const OriginPortFilter = useMemo(() => {
    const portList = Array.from({ length: 50 }, (_, i) => {
      return createDummyPlaceInformation(
        (faker.location.city() + ", " + faker.location.country()).toUpperCase()
      );
    });

    return (
      <NAOutlinedAutoComplete
        label="Origin"
        itemList={portList.map((port) => port.yardName)}
        recentCookieKey="recent-port"
        onItemSelection={(selected) => {
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
      return createDummyPlaceInformation(
        (faker.location.city() + ", " + faker.location.country()).toUpperCase()
      );
    });

    return (
      <NAOutlinedAutoComplete
        label="Destination"
        itemList={portList.map((port) => port.yardName)}
        recentCookieKey="recent-port"
        onItemSelection={(selected) => {
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

  const ReferenceNumberFilter = useMemo(() => {
    return (
      <div className="flex gap-2">
        <NAOutlinedListBox
          label="Reference No."
          initialValue="Request No."
          options={["Request No.", "Booking No."]}
        />
        <NAOutlinedTextField
          placeholder="Enter Reference No."
          value={searchCondition.referenceNo}
          handleValueChange={(value) => {
            setSearchCondition((prev) => ({
              ...prev,
              referenceNo: value,
            }));
          }}
        />
      </div>
    );
  }, [searchCondition.referenceNo]);

  const { refs, floatingStyles, context } = useFloating({
    open: isFilterDetailsOpen,
    onOpenChange: setIsFilterDetailsOpen,
    placement: "bottom-end",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ]);

  const areaRef = useRef<HTMLDivElement>(null);
  const scrollState = useRecoilValue(ScrollState);

  return (
    <div ref={areaRef} className={moduleStyles.area}>
      <MdOutlinedSegmentedButtonSet>
        <MdOutlinedSegmentedButton
          label="Request Date"
          id="requestDate"
          selected={stateCondition === "requestDate"}
          onClick={() => {
            setStateCondition("requestDate");
          }}
        />
        <MdOutlinedSegmentedButton
          label="Vessel"
          selected={stateCondition === "vessel"}
          onClick={() => {
            setStateCondition("vessel");
          }}
        />
      </MdOutlinedSegmentedButtonSet>
      <div>
        {stateCondition === "requestDate" ? (
          <div className="flex items-center">
            <DateRangePicker
              label="Request Date"
              initial={{
                start: searchCondition.requestDateStart,
                end: searchCondition.requestDateEnd,
              }}
              onDateChange={(dateRange) => {
                if (dateRange.start && dateRange.end)
                  setSearchCondition({
                    ...searchCondition,
                    requestDateStart: dateRange.start,
                    requestDateEnd: dateRange.end,
                  });
              }}
            />
          </div>
        ) : (
          <>{VesselVoyageFilter}</>
        )}
      </div>
      {activeFilters.length > 0 && (
        <DividerComponent className="border-dotted" />
      )}
      <div className="flex gap-4 flex-wrap">
        {activeFilters.includes("referenceNo") && ReferenceNumberFilter}
        {activeFilters.includes("origin") && OriginPortFilter}
        {activeFilters.includes("destination") && DestinationPortFilter}
        {activeFilters.includes("bookingVia") && BookingViaFilter}
      </div>
      <div className="flex gap-4 justify-end">
        <MdTextButton>Reset</MdTextButton>
        <MdTextButton
          ref={refs.setReference}
          {...getReferenceProps()}
          className={isFilterDetailsOpen ? "bg-secondaryFixed" : ""}
        >
          More Filter
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
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="z-20"
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
              More Filter
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
