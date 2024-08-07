"use client";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import NaOutlinedSegmentedButton from "@/app/components/na-outlined-segmented-button";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdChipSet,
  MdElevatedCard,
  MdFilledButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";

import {
  createDummyPortList,
  createDummyVesselInformations,
} from "../../schedule/util";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import VesselIcon from "@/../public/icon_vessel_outline.svg";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicPopoverStyles } from "@/app/util/constants";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/components/divider";
import { AgreementTable } from "./table";

const MoreFilter = (props: { onFilterChange?: (filter: string[]) => void }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [shift(), flip(), offset(4)],
    whileElementsMounted: autoUpdate,
  });
  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );
  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  useEffect(() => {
    if (props.onFilterChange) {
      props.onFilterChange(filters);
    }
  }, [filters, props]);

  return (
    <>
      <MdTextButton ref={refs.setReference} {...getReferenceProps()}>
        More Filter
      </MdTextButton>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-20 w-72"
        >
          <MdElevatedCard style={transitionStyles}>
            <MdTypography variant="headline" size="small" className="m-6">
              More Filter
            </MdTypography>
            <MdList className="bg-surfaceContainerLow">
              <MdListItem
                type="button"
                onClick={() => {
                  if (filters.includes("Origin")) {
                    setFilters((prev) =>
                      prev.filter((filter) => filter !== "Origin")
                    );
                  } else {
                    setFilters((prev) => [...prev, "Origin"]);
                  }
                }}
              >
                <MdCheckbox slot="start" checked={filters.includes("Origin")} />
                Origin
              </MdListItem>
              <DividerComponent />
              <MdListItem
                type="button"
                onClick={() => {
                  if (filters.includes("Destination")) {
                    setFilters((prev) =>
                      prev.filter((filter) => filter !== "Destination")
                    );
                  } else {
                    setFilters((prev) => [...prev, "Destination"]);
                  }
                }}
              >
                <MdCheckbox
                  slot="start"
                  checked={filters.includes("Destination")}
                />
                Destination
              </MdListItem>
              <DividerComponent />
              <MdListItem
                type="button"
                onClick={() => {
                  if (filters.includes("Booking Request Exist")) {
                    setFilters((prev) =>
                      prev.filter(
                        (filter) => filter !== "Booking Request Exist"
                      )
                    );
                  } else {
                    setFilters((prev) => [...prev, "Booking Request Exist"]);
                  }
                }}
              >
                <MdCheckbox
                  slot="start"
                  checked={filters.includes("Booking Request Exist")}
                />
                Booking Request Exist
              </MdListItem>
              <DividerComponent />
            </MdList>
            <div className="flex justify-end mx-6 mb-6">
              <MdTextButton
                onClick={() => {
                  setIsOptionOpen(false);
                }}
              >
                Close
              </MdTextButton>
            </div>
          </MdElevatedCard>
        </div>
      )}
    </>
  );
};

export default function Agreement() {
  const cx = classNames.bind(styles);
  const [searchType, setSearchType] = useState<"Create Date" | "Vessel">(
    "Create Date"
  );
  const [agreeQuery, setAgreeQuery] = useState<string>("");
  const [agreeList, setAgreeList] = useState<string[]>([]);
  const [moreFilters, setMoreFilters] = useState<string[]>([]);
  const vesselList = useMemo(() => {
    return createDummyVesselInformations(30);
  }, []);
  const ports = useMemo(() => {
    return createDummyPortList();
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle
          title="My Agreement List"
          category="Pricing"
          href="/main/pricing/agreement"
        />
      </div>
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          {["Create Date", "Vessel"].map((type) => (
            <NaOutlinedSegmentedButton
              key={type}
              label={type}
              selected={searchType === type}
              onClick={() => setSearchType(type as "Create Date" | "Vessel")}
            >
              {type}
            </NaOutlinedSegmentedButton>
          ))}
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-2">
          <div className="flex gap-2 flex-col flex-1">
            {
              {
                "Create Date": (
                  <div className="flex-1 flex gap-2">
                    <DateRangePicker label="Create Date" />
                    <div className="flex flex-col gap-2 w-[864px]">
                      <NAOutlinedTextField
                        label="Multi Agreement No."
                        value={agreeQuery}
                        handleValueChange={(value) => setAgreeQuery(value)}
                        onKeyDown={(e) => {
                          const value = e.currentTarget.value;
                          if (e.key === "Enter") {
                            if (
                              e.currentTarget.value &&
                              !agreeList.includes(value)
                            ) {
                              setAgreeList((prev) => [...prev, value]);
                              setAgreeQuery("");
                            }
                          }
                        }}
                      />
                      <MdChipSet>
                        {agreeList.map((agree) => (
                          <MdInputChip
                            className={styles.pointChip}
                            key={agree}
                            label={agree}
                            selected
                            remove={() => {
                              setAgreeList((prev) =>
                                prev.filter((prevAgree) => prevAgree !== agree)
                              );
                            }}
                          />
                        ))}
                      </MdChipSet>
                    </div>
                  </div>
                ),
                Vessel: (
                  <div className="flex-1 flex gap-2">
                    <NAOutlinedAutoComplete
                      icon={<VesselIcon />}
                      label="Vessel Name"
                      itemList={vesselList.map((vessel) => vessel.vesselName)}
                    />
                    <NAOutlinedTextField label="Voyage" className="w-32" />
                    <NAOutlinedListBox
                      label="Direction"
                      options={["N", "E", "S", "W"]}
                      className="w-24"
                      initialValue="N"
                    />
                    <div className="flex flex-col gap-2 w-[864px]">
                      <NAOutlinedTextField
                        label="Multi Agreement No."
                        className="flex-1"
                        value={agreeQuery}
                        handleValueChange={(value) => setAgreeQuery(value)}
                        onKeyDown={(e) => {
                          const value = e.currentTarget.value;
                          if (e.key === "Enter") {
                            if (
                              e.currentTarget.value &&
                              !agreeList.includes(value)
                            ) {
                              setAgreeList((prev) => [...prev, value]);
                              setAgreeQuery("");
                            }
                          }
                        }}
                      />
                      <MdChipSet>
                        {agreeList.map((agree) => (
                          <MdInputChip
                            className={styles.pointChip}
                            key={agree}
                            label={agree}
                            selected
                            remove={() => {
                              setAgreeList((prev) =>
                                prev.filter((prevAgree) => prevAgree !== agree)
                              );
                            }}
                          />
                        ))}
                      </MdChipSet>
                    </div>
                  </div>
                ),
              }[searchType]
            }
            {moreFilters.length > 0 && (
              <div className="flex gap-2 mt-2">
                {moreFilters.includes("Origin") && (
                  <NAOutlinedAutoComplete
                    label="Origin"
                    itemList={ports.map((port) => port.name)}
                  />
                )}
                {moreFilters.includes("Destination") && (
                  <NAOutlinedAutoComplete
                    label="Destination"
                    itemList={ports.map((port) => port.name)}
                  />
                )}
                {moreFilters.includes("Booking Request Exist") && (
                  <NAOutlinedListBox
                    label="Booking Request Exist"
                    options={["All", "Yes", "No"]}
                    initialValue="All"
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-end">
            <MdTextButton>Reset</MdTextButton>
            <MoreFilter
              onFilterChange={(filters) => {
                setMoreFilters(filters);
              }}
            />
            <MdFilledButton>Search</MdFilledButton>
          </div>
        </div>
      </div>
      <div className={cx(styles.area, "flex-1")}>
        <AgreementTable />
      </div>
    </div>
  );
}
