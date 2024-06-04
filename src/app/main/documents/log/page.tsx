"use client";

import { DividerComponent } from "@/app/components/divider";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import { basicPopoverStyles } from "@/app/util/constants";
import {
  MdCheckbox,
  MdChipSet,
  MdElevatedCard,
  MdFilledButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
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
import { use, useEffect, useState } from "react";
import { ManifestLogTable } from "./table";

const MoreFilter = (props: { onFilterChange: (filter: string[]) => void }) => {
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
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
          <div style={transitionStyles}>
            <MdElevatedCard>
              <MdTypography variant="headline" size="small" className="m-6">
                More Filter
              </MdTypography>
              <MdList className="bg-surfaceContainerLow">
                <MdListItem
                  type="button"
                  onClick={() => {
                    if (moreFilter.includes("Place of Loading")) {
                      setMoreFilter(
                        moreFilter.filter((f) => f !== "Place of Loading")
                      );
                    } else {
                      setMoreFilter([...moreFilter, "Place of Loading"]);
                    }
                  }}
                >
                  <MdCheckbox
                    slot="start"
                    checked={moreFilter.includes("Place of Loading")}
                  />
                  Place of Loading
                </MdListItem>
                <MdListItem
                  type="button"
                  onClick={() => {
                    if (moreFilter.includes("Place of Discharging")) {
                      setMoreFilter(
                        moreFilter.filter((f) => f !== "Place of Discharging")
                      );
                    } else {
                      setMoreFilter([...moreFilter, "Place of Discharging"]);
                    }
                  }}
                >
                  <MdCheckbox
                    slot="start"
                    checked={moreFilter.includes("Place of Discharging")}
                  />
                  Place of Discharging
                </MdListItem>
              </MdList>
              <div className="flex justify-end px-6 pb-6">
                <MdTextButton
                  className="w-fit"
                  onClick={() => setIsOptionOpen(false)}
                >
                  Close
                </MdTextButton>
              </div>
            </MdElevatedCard>
          </div>
        </div>
      )}
    </>
  );
};

export default function AdvancedManifestLogPage() {
  const [pageState, setPageState] = useState<"unsearched" | "searched">(
    "unsearched"
  );
  const [currentTab, setCurrentTab] = useState<"booking" | "vessel">("booking");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  useEffect(() => {
    console.log(activeFilters);
  }, [activeFilters]);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Advanced Manifest Log" />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="Booking or B/L No."
            selected={currentTab === "booking"}
            onClick={() => setCurrentTab("booking")}
          />
          <MdOutlinedSegmentedButton
            label="Vessel"
            selected={currentTab === "vessel"}
            onClick={() => setCurrentTab("vessel")}
          />
        </MdOutlinedSegmentedButtonSet>

        <div className="flex gap-4 items-end">
          <div className="flex-1 flex gap-4 flex-wrap">
            {currentTab === "booking" && (
              <div className="flex flex-col gap-2">
                <NAOutlinedTextField
                  label="Booking or B/L No.(Multi)"
                  value={inputQuery}
                  className="w-[832px]"
                  handleValueChange={(value) => setInputQuery(value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (inputQuery !== "" && !queries.includes(inputQuery))
                        setQueries([...queries, inputQuery]);
                      setInputQuery("");
                    }
                  }}
                />
                <MdChipSet>
                  {queries.map((query) => (
                    <MdInputChip
                      key={faker.string.uuid()}
                      label={query}
                      selected
                      handleTrailingActionFocus={() =>
                        setQueries((prev) => {
                          return prev.filter((q) => q !== query);
                        })
                      }
                    />
                  ))}
                </MdChipSet>
              </div>
            )}
            {currentTab === "vessel" && (
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="Vessel Name"
                  value=""
                  className="w-96"
                />
                <NAOutlinedTextField label="Voyage" value="" />
                <NAOutlinedListBox
                  options={["E", "W", "N", "s"]}
                  label="Direction"
                  className="w-36"
                />
              </div>
            )}
            {activeFilters.includes("Place of Loading") && (
              <NAOutlinedTextField
                label="Place of Loading"
                value=""
                className="min-w-36"
              />
            )}
            {activeFilters.includes("Place of Discharging") && (
              <NAOutlinedTextField label="Place of Discharging" value="" />
            )}
          </div>
          <div className="flex gap-4 justify-end">
            <MdTextButton
              onClick={() => {
                setActiveFilters([]);
                setPageState("unsearched");
                setQueries([]);
              }}
            >
              Reset
            </MdTextButton>
            <MoreFilter onFilterChange={(filter) => setActiveFilters(filter)} />
            <MdFilledButton onClick={() => setPageState("searched")}>
              Search
            </MdFilledButton>
          </div>
        </div>
      </div>
      <div className={styles.area}>
        {pageState === "unsearched" ? (
          <EmptyResultPlaceholder text="Please search for the condition." />
        ) : (
          <ManifestLogTable />
        )}
      </div>
    </div>
  );
}
