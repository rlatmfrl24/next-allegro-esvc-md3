"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdChipSet,
  MdElevatedCard,
  MdElevation,
  MdFilterChip,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdRippleEffect,
  MdTextButton,
} from "@/app/util/md3";
import Link from "next/link";
import EmptyResultPlaceholder from "../../schedule/empty-placeholder";
import BookingStatusCondition from "./condition";
import { MdTypography } from "@/app/components/typography";
import { ArrowDropDown, Check, Download } from "@mui/icons-material";
import { CSSProperties, useState } from "react";
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
import BookingStatusTable from "./table";
import { Divider } from "@mui/material";

export default function BookingStatus() {
  const statusOptions = [
    "Requested",
    "Change Requested",
    "Cancel Requested",
    "Cancelled",
    "Accepted",
    "Rejected",
    "Pending",
  ];
  const [selectedStatus, setSelectedStatus] = useState(statusOptions);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isStatusFilterOpen,
    onOpenChange: setIsStatusFilterOpen,
    placement: "bottom-start",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const transitionProps = useTransitionStyles(context, {
    initial: { opacity: 0, transform: "translateY(-8px)" },
    open: { opacity: 1, transform: "translateY(0)" },
    close: { opacity: 0, transform: "translateY(-8px)" },
  });
  const dismiss = useDismiss(context);
  const click = useClick(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ]);

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Status" />
        <Link href={`/main/booking/request`}>
          <MdOutlinedButton>New Booking</MdOutlinedButton>
        </Link>
      </div>
      <BookingStatusCondition />

      {/* <EmptyResultPlaceholder /> */}

      <div className={styles.area}>
        <MdChipSet>
          <div
            ref={refs.setReference}
            {...getReferenceProps()}
            className="bg-secondaryContainer flex items-center h-8 rounded-lg relative cursor-pointer"
          >
            <MdRippleEffect />
            <Check fontSize="small" className="mx-2" />
            <MdTypography variant="label" size="large" className="select-none">
              {selectedStatus.length === 7
                ? "All Status"
                : selectedStatus.join(", ")}
            </MdTypography>
            <ArrowDropDown fontSize="small" className="mx-2" />
          </div>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-10"
          >
            {transitionProps.isMounted && (
              <div
                style={
                  {
                    "--md-elevation-level": 2,
                    ...transitionProps.styles,
                  } as CSSProperties
                }
                className="bg-surfaceContainerHigh rounded-lg "
              >
                <MdElevation />
                <MdListItem
                  type="button"
                  className="border-b border-b-outlineVariant pt-2"
                  onClick={() => {
                    if (selectedStatus.length === 7) {
                      setSelectedStatus([]);
                    } else {
                      setSelectedStatus(statusOptions);
                    }
                  }}
                >
                  <div
                    slot="start"
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <MdCheckbox checked={selectedStatus.length === 7} />
                  </div>
                  {`(${selectedStatus.length}/7)`}
                </MdListItem>
                <MdList className="bg-surfaceContainerHigh rounded-b-lg">
                  {statusOptions.map((status) => (
                    <MdListItem
                      key={status}
                      type="button"
                      onClick={() => {
                        if (selectedStatus.includes(status)) {
                          setSelectedStatus(
                            selectedStatus.filter((s) => s !== status)
                          );
                        } else {
                          setSelectedStatus([...selectedStatus, status]);
                        }
                      }}
                    >
                      <div
                        slot="start"
                        className="w-6 h-6 flex items-center justify-center"
                      >
                        <MdCheckbox checked={selectedStatus.includes(status)} />
                      </div>
                      {status}
                    </MdListItem>
                  ))}
                </MdList>
              </div>
            )}
          </div>
          <MdFilterChip label="My Booking" />
        </MdChipSet>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdTextButton>
              <div slot="icon">
                <Download fontSize="small" />
              </div>
              Download
            </MdTextButton>
            <div className="w-px h-6 bg-outlineVariant"></div>
            <MdTextButton>Copy</MdTextButton>
          </div>
          <MdTypography variant="label" size="large" className="text-outline">
            Total: 13
          </MdTypography>
        </div>
        <BookingStatusTable />
      </div>
    </div>
  );
}
