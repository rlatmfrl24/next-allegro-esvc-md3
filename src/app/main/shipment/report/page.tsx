"use client";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedMultiListBox from "@/app/components/na-multi-listbox";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdChipSet,
  MdElevatedCard,
  MdFilledButton,
  MdFilledTonalButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { createDummyVesselInformations } from "../../schedule/util";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicPopoverStyles } from "@/app/util/constants";
import { DividerComponent } from "@/app/components/divider";
import { flushSync } from "react-dom";
import { ReportTable } from "./table";
import { ContractNumberSelector } from "@/app/components/update-contract-number";

const MoreFilter = (props: { onFilterChange: (filter: string[]) => void }) => {
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    placement: "bottom-end",
    middleware: [shift(), offset(4), flip()],
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
    props.onFilterChange(moreFilter);
  }, [moreFilter, props]);

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
          className="z-10"
        >
          <MdElevatedCard style={transitionStyles} className="py-2">
            <MdTypography variant="headline" size="small" className="m-6">
              More Filter
            </MdTypography>
            <MdList className="bg-surfaceContainerLow">
              <MdListItem
                type="button"
                onClick={() => {
                  if (moreFilter.includes("Port of Loading")) {
                    setMoreFilter(
                      moreFilter.filter((item) => item !== "Port of Loading")
                    );
                  } else {
                    setMoreFilter([...moreFilter, "Port of Loading"]);
                  }
                }}
              >
                <MdCheckbox
                  slot="start"
                  checked={moreFilter.includes("Port of Loading")}
                />
                Port of Loading
              </MdListItem>
              <MdListItem
                type="button"
                onClick={() => {
                  if (moreFilter.includes("Port of Discharging")) {
                    setMoreFilter(
                      moreFilter.filter(
                        (item) => item !== "Port of Discharging"
                      )
                    );
                  } else {
                    setMoreFilter([...moreFilter, "Port of Discharging"]);
                  }
                }}
              >
                <MdCheckbox
                  slot="start"
                  checked={moreFilter.includes("Port of Discharging")}
                />
                Port of Discharging
              </MdListItem>
            </MdList>
            <MdTextButton
              onClick={() => {
                props.onFilterChange(moreFilter);
              }}
              className="ml-auto mr-4 mb-4"
            >
              Close
            </MdTextButton>
          </MdElevatedCard>
        </div>
      )}
    </>
  );
};

const MyReportComponent = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    placement: "bottom-end",
    middleware: [
      shift(),
      offset(4),
      flip(),
      size({
        apply({ rects, elements, availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight));
        },
      }),
    ],
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

  return (
    <>
      <MdFilledTonalButton ref={refs.setReference} {...getReferenceProps()}>
        My Report
      </MdFilledTonalButton>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-10"
        >
          <MdElevatedCard style={transitionStyles}>
            <MdTypography variant="headline" size="small" className="m-6">
              My Report
            </MdTypography>
            <MdList
              className="bg-surfaceContainerLow overflow-y-auto"
              style={{ maxHeight: maxHeight - 200, minHeight: "4rem" }}
            >
              {Array.from({ length: 20 }, (_, i) => i).map((i) => (
                <MdListItem
                  key={i}
                  type="button"
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                >
                  Report Name {i}
                </MdListItem>
              ))}
            </MdList>
            <div className="mx-6 mb-6 flex justify-end">
              <MdOutlinedButton
                onClick={() => {
                  setIsPopoverOpen(false);
                }}
              >
                Close
              </MdOutlinedButton>
            </div>
          </MdElevatedCard>
        </div>
      )}
    </>
  );
};

export default function ShipmentReportPage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [currentTab, setCurrentTab] = useState<
    "arrival" | "departure" | "vessel"
  >("arrival");
  const [listOption, setListOption] = useState<"customer" | "contract">(
    "customer"
  );
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [polSelections, setPolSelections] = useState<string[]>([]);
  const [podSelections, setPodSelections] = useState<string[]>([]);
  const tempContracts = Array.from({ length: 10 }, () =>
    faker.string.alphanumeric(10).toUpperCase()
  );
  const tempVessels = createDummyVesselInformations(12);
  const tempPorts = Array.from(
    { length: 50 },
    () => faker.location.city() + ", " + faker.location.country()
  );

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="Report"
        category="Shipment"
        href="/main/shipment/report"
      />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={currentTab === "arrival"}
            label="Arrival Date"
            onClick={() => {
              setCurrentTab("arrival");
            }}
          />
          <MdOutlinedSegmentedButton
            selected={currentTab === "departure"}
            label="Departure Date"
            onClick={() => {
              setCurrentTab("departure");
            }}
          />
          <MdOutlinedSegmentedButton
            selected={currentTab === "vessel"}
            label="Vessel"
            onClick={() => {
              setCurrentTab("vessel");
            }}
          />
        </MdOutlinedSegmentedButtonSet>

        <div className="flex items-end gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap items-center">
              {currentTab === "arrival" && (
                <DateRangePicker label="Arrival Date" />
              )}
              {currentTab === "departure" && (
                <DateRangePicker label="Departure Date" />
              )}
              {currentTab === "vessel" && (
                <div className="flex gap-4">
                  <NAOutlinedAutoComplete
                    label="Vessel Name"
                    itemList={tempVessels.map((vessel) => vessel.vesselName)}
                  />
                  <NAOutlinedTextField
                    label="Voyage"
                    value=""
                    className="w-32"
                  />
                  <NAOutlinedListBox
                    label="Direction"
                    options={["E", "W", "S", "N"]}
                    className="w-36"
                  />
                </div>
              )}

              <div className="flex gap-4 flex-1 items-center">
                <MdTypography
                  tag="label"
                  variant="body"
                  size="medium"
                  className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
                >
                  <MdRadio
                    name="list-option"
                    checked={listOption === "customer"}
                    onClick={() => {
                      setListOption("customer");
                    }}
                  />
                  By Customer
                </MdTypography>
                <MdTypography
                  tag="label"
                  variant="body"
                  size="medium"
                  className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
                >
                  <MdRadio
                    name="list-option"
                    checked={listOption === "contract"}
                    onClick={() => {
                      setListOption("contract");
                    }}
                  />
                  By Contract
                </MdTypography>
                {listOption === "customer" ? (
                  <NAOutlinedMultiListBox
                    options={[
                      "Shipper",
                      "Consignee",
                      "Notify",
                      "Fowarder",
                      "Also Notify",
                    ]}
                    label="By Customer"
                    unit="Customer"
                  />
                ) : (
                  <>
                    <ContractNumberSelector contracts={tempContracts} />
                  </>
                )}
                <MyReportComponent />
              </div>
            </div>
            <div className="flex gap-4">
              {moreFilter.includes("Port of Loading") && (
                <div className="w-1/2 flex flex-col gap-2">
                  <NAOutlinedAutoComplete
                    itemList={tempPorts}
                    label="Port of Loading"
                    removeQueryOnSelect
                    onItemSelection={(item) => {
                      setPolSelections([...polSelections, item]);
                    }}
                  />
                  <MdChipSet>
                    {polSelections.map((item) => (
                      <div key={item}>
                        <MdInputChip
                          label={item}
                          selected
                          remove={() =>
                            setPolSelections((prev) => {
                              return prev.filter((q) => q !== item);
                            })
                          }
                        />
                      </div>
                    ))}
                  </MdChipSet>
                </div>
              )}
              {moreFilter.includes("Port of Discharging") && (
                <div className="w-1/2 flex flex-col gap-2">
                  <NAOutlinedAutoComplete
                    itemList={tempPorts}
                    label="Port of Discharging"
                    removeQueryOnSelect
                    onItemSelection={(item) => {
                      setPodSelections([...podSelections, item]);
                    }}
                  />
                  <MdChipSet>
                    {podSelections.map((item) => (
                      <div key={item}>
                        <MdInputChip
                          label={item}
                          selected
                          remove={() =>
                            setPodSelections((prev) => {
                              return prev.filter((q) => q !== item);
                            })
                          }
                        />
                      </div>
                    ))}
                  </MdChipSet>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <MdTextButton
              onClick={() => {
                setPageState("unsearch");
              }}
            >
              Reset
            </MdTextButton>
            <MoreFilter
              onFilterChange={(filter) => {
                setMoreFilter(filter);
              }}
            />
            <MdFilledButton
              onClick={() => {
                setPageState("search");
              }}
            >
              Search
            </MdFilledButton>
          </div>
        </div>
      </div>
      <div className={styles.area}>
        {pageState === "unsearch" ? (
          <EmptyResultPlaceholder text="Please search for the condition." />
        ) : (
          <ReportTable />
        )}
      </div>
    </div>
  );
}
