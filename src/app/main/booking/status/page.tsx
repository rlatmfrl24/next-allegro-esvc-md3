"use client";

import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/page-title";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdElevation,
  MdFilledButton,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import EmptyResultPlaceholder from "../../schedule/empty-placeholder";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";

export default function BookingStatus() {
  const [stateCondition, setStateCondition] = useState<
    "requestNo" | "bookingNo"
  >("requestNo");
  const [isFilterDetailsOpen, setIsFilterDetailsOpen] = useState(false);
  const filterList = [
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
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: isFilterDetailsOpen,
    onOpenChange: setIsFilterDetailsOpen,
    placement: "bottom-start",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ]);

  const VesselVoyageFilter = () => {
    return (
      <div className="flex gap-2">
        <NAOutlinedTextField
          className="min-w-[502px]"
          label="Vessel Name"
          value=""
        />
        <NAOutlinedTextField className="min-w-72" label="Voyage" value="" />
        <MdOutlinedSelect label="Direction">
          <MdSelectOption value="east">E</MdSelectOption>
          <MdSelectOption value="west">W</MdSelectOption>
          <MdSelectOption value="north">N</MdSelectOption>
          <MdSelectOption value="south">S</MdSelectOption>
        </MdOutlinedSelect>
      </div>
    );
  };

  const BookingViaFilter = () => {
    return (
      <MdOutlinedSelect label="Booking Via">
        <MdSelectOption value="web">Web</MdSelectOption>
        <MdSelectOption value="edi">EDI</MdSelectOption>
        <MdSelectOption value="general">General</MdSelectOption>
      </MdOutlinedSelect>
    );
  };

  const OriginPortFilter = () => {
    return <NAOutlinedAutoComplete label="Origin" itemList={[]} />;
  };

  const DestinationPortFilter = () => {
    return <NAOutlinedAutoComplete label="Destination" itemList={[]} />;
  };

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Status" />
        <Link href={`/main/booking/request`}>
          <MdOutlinedButton>New Booking</MdOutlinedButton>
        </Link>
      </div>
      <div className={styles.area}>
        <div className="flex gap-4">
          <MdRangeDatePicker label="Request Date" />
          <div className="flex gap-2">
            <MdOutlinedSelect
              label="State No."
              selectedIndex={stateCondition === "requestNo" ? 0 : 1}
              onchange={(e) => {
                const target = e.target as HTMLSelectElement;
                setStateCondition(target.value as "requestNo" | "bookingNo");
              }}
            >
              <MdSelectOption value="requestNo">Request No.</MdSelectOption>
              <MdSelectOption value="bookingNo">Booking No.</MdSelectOption>
            </MdOutlinedSelect>
            <NAOutlinedTextField
              placeholder={
                stateCondition === "requestNo" ? "Request No." : "Booking No."
              }
              value=""
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {activeFilters.includes("vesselVoyage") && <VesselVoyageFilter />}
          {activeFilters.includes("bookingVia") && <BookingViaFilter />}
          {activeFilters.includes("origin") && <OriginPortFilter />}
          {activeFilters.includes("destination") && <DestinationPortFilter />}
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
          <MdFilledButton>Search</MdFilledButton>
        </div>
      </div>
      <EmptyResultPlaceholder />
      <AnimatePresence>
        {isFilterDetailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
            ref={refs.setFloating}
            style={
              {
                "--md-elevation-level": 2,
                ...floatingStyles,
              } as CSSProperties
            }
            {...getFloatingProps()}
            className="bg-surfaceContainerHigh rounded-3xl relative w-72 "
          >
            <MdElevation />
            <MdTypography variant="headline" size="small" className="m-6">
              Filter Details
            </MdTypography>
            <MdList className="bg-surfaceContainerHigh">
              {filterList.map((item) => (
                <MdListItem
                  key={item.id}
                  className="border-b border-b-outlineVariant"
                  type="button"
                  onClick={() => {
                    if (activeFilters.includes(item.id)) {
                      setActiveFilters(
                        activeFilters.filter((id) => id !== item.id)
                      );
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
