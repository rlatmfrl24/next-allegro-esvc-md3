"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdElevatedCard,
  MdFilledButton,
  MdList,
  MdListItem,
  MdTextButton,
} from "@/app/util/md3";
import { useEffect, useMemo, useState } from "react";
import { SurchargeSearchTable } from "./table";
import { createDummyPlaceInformation } from "../../schedule/util";
import { faker } from "@faker-js/faker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { FmdGoodOutlined } from "@mui/icons-material";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DatePicker } from "@/app/components/datepickers/date-picker";
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
import classNames from "classnames";

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
                  if (filters.includes("Charge")) {
                    setFilters(filters.filter((filter) => filter !== "Charge"));
                  } else {
                    setFilters([...filters, "Charge"]);
                  }
                }}
              >
                <MdCheckbox slot="start" checked={filters.includes("Charge")} />
                Charge
              </MdListItem>
              <DividerComponent />
              <MdListItem
                type="button"
                onClick={() => {
                  if (filters.includes("Per Type")) {
                    setFilters(
                      filters.filter((filter) => filter !== "Per Type")
                    );
                  } else {
                    setFilters([...filters, "Per Type"]);
                  }
                }}
              >
                <MdCheckbox
                  slot="start"
                  checked={filters.includes("Per Type")}
                />
                Per Type
              </MdListItem>
              <DividerComponent />
              <MdListItem
                type="button"
                onClick={() => {
                  if (filters.includes("Cargo Type")) {
                    setFilters(
                      filters.filter((filter) => filter !== "Cargo Type")
                    );
                  } else {
                    setFilters([...filters, "Cargo Type"]);
                  }
                }}
              >
                <MdCheckbox
                  slot="start"
                  checked={filters.includes("Cargo Type")}
                />
                Cargo Type
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

export const SurchargeSearch = () => {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unsearch" | "search">("search");
  const [moreFilters, setMoreFilters] = useState<string[]>([]);
  const tempPorts = useMemo(() => {
    return Array.from({ length: 200 }, () =>
      createDummyPlaceInformation(
        faker.location.city() + ", " + faker.address.country()
      )
    );
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="Surcharge Search"
        category="Pricing"
        href="/main/pricing/surcharge"
      />
      <div className={styles.area}>
        <div className="flex gap-4">
          <NAOutlinedAutoComplete
            required
            icon={<FmdGoodOutlined />}
            label="Origin"
            itemList={tempPorts.map((port) => port.yardName)}
            className="w-96"
          />
          <NAOutlinedListBox
            options={["CY", "Door"]}
            initialValue="CY"
            label="Receiving Term"
            className="w-48"
          />
          <NAOutlinedAutoComplete
            required
            label="Port of Loading"
            itemList={tempPorts.map((port) => port.yardName)}
            className="w-96"
          />
          <NaToggleButton
            state="unchecked"
            label="Same as Place of Receipt"
            className="w-64"
          />
          <DatePicker label="Application Date" />
        </div>
        <div className="flex gap-4">
          <NAOutlinedAutoComplete
            required
            icon={<FmdGoodOutlined />}
            label="Destination"
            itemList={tempPorts.map((port) => port.yardName)}
            className="w-96"
          />
          <NAOutlinedListBox
            options={["All", "CY", "Door", "CFS "]}
            initialValue="CY"
            label="Delivery Term"
            className="w-48"
          />
          <NAOutlinedAutoComplete
            required
            label="Port of Discharge"
            itemList={tempPorts.map((port) => port.yardName)}
            className="w-96"
          />
          <NaToggleButton
            state="unchecked"
            label="Same as Place of Discharging"
            className="w-64"
          />
          <NAOutlinedListBox
            label="Service Scope"
            options={["All", "Export", "Import"]}
            initialValue="All"
            className="flex-1"
          />
        </div>
        {moreFilters.length > 0 && <DividerComponent />}
        {moreFilters.length > 0 && (
          <div className="flex gap-4">
            {moreFilters.includes("Charge") && (
              <NAOutlinedListBox
                label="Charge"
                options={["All"]}
                initialValue="All"
              />
            )}
            {moreFilters.includes("Per Type") && (
              <NAOutlinedListBox
                label="Per Type"
                options={["All"]}
                initialValue="All"
              />
            )}
            {moreFilters.includes("Cargo Type") && (
              <NAOutlinedListBox
                label="Cargo Type"
                options={[
                  "Dry",
                  "Reefer",
                  "Dangerous",
                  "Awkward",
                  "Break Bulk",
                ]}
              />
            )}
          </div>
        )}
        <div className="flex gap-4 justify-end">
          <MdTextButton
            onClick={() => {
              setPageState("unsearch");
            }}
          >
            Reset
          </MdTextButton>
          <MoreFilter
            onFilterChange={(filters) => {
              setMoreFilters(filters);
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
      <div className={cx(styles.area, styles.table)}>
        {pageState === "search" ? (
          <SurchargeSearchTable />
        ) : (
          <EmptyResultPlaceholder text="Please search for the condition." />
        )}
      </div>
    </div>
  );
};
