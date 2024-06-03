"use client";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, Suspense, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import BookingStatusChip from "@/app/main/booking/status/components/booking-status-chip";
import {
  BookingTemplateSelect,
  SaveAsTemplate,
} from "@/app/main/booking/template/components/generic";
import {
  AdditionalInformationState,
  BookingInformationState,
  BookingRequestStepState,
  CargoPickUpReturnState,
  ContactInformationState,
  ContainerState,
  LocationScheduleState,
  PartiesState,
  resetBookingState,
} from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import {
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdOutlinedButton,
} from "@/app/util/md3";
import {
  BookingInformationRequestType,
  BookingStatus,
} from "@/app/util/typeDef/boooking";
import { ChevronLeft } from "@mui/icons-material";

import AdditionalInformationStep from "./step-additional-information";
import CargoStep from "./step-cargo";
import ContactInformationStep from "./step-contact-information";
import ContainerStep from "./step-container";
import StepItem from "./step-item";
import LoactionScheduleStep from "./step-location-schedule";
import PartiesStep from "./step-parties";

export default function BookingTemplateCreationPage() {
  return (
    <Suspense>
      <BookingTemplateCreation />
    </Suspense>
  );
}

function BookingTemplateCreation() {
  const cx = classNames.bind(styles);
  const [bookingRequestStepState, setBookingRequestStepState] = useRecoilState(
    BookingRequestStepState
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetBookingStore, setResetBookingStore] =
    useRecoilState(resetBookingState);

  const locationSchedule = useRecoilValue(LocationScheduleState);
  const parties = useRecoilValue(PartiesState);
  const container = useRecoilValue(ContainerState);
  const cargoPickUpReturn = useRecoilValue(CargoPickUpReturnState);
  const additionalInformation = useRecoilValue(AdditionalInformationState);
  const contactInformation = useRecoilValue(ContactInformationState);
  const setBookingInformations = useSetRecoilState(BookingInformationState);
  // const clearBookingRequestStep = useSetRecoilState(clearBookingRequestState);

  useEffect(() => {
    setResetBookingStore();
    // clearBookingRequestStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      // set all step to visited false
      setBookingRequestStepState((prev) => {
        const newArray = Object.keys(prev).map((k) => {
          return {
            ...prev[k as keyof typeof prev],
            visited: false,
          };
        });
        const newObject: typeof prev = newArray.reduce((prev, curr) => {
          prev[curr.id as keyof typeof prev] = curr;
          return prev;
        }, {} as typeof prev);

        return newObject;
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStepClick(key: string) {
    setBookingRequestStepState((prev) => {
      const newArray = Object.keys(prev).map((k) => {
        return {
          ...prev[k as keyof typeof prev],
          isSelected: k === key,
          visited:
            prev[k as keyof typeof prev].visited ||
            prev[k as keyof typeof prev].isSelected,
        };
      });
      const newObject: typeof prev = newArray.reduce((prev, curr) => {
        prev[curr.id as keyof typeof prev] = curr;
        return prev;
      }, {} as typeof prev);

      return newObject;
    });
  }

  function getSelectedStepId() {
    // return keyof typeof bookingRequestState
    return Object.keys(bookingRequestStepState).find((key) => {
      return bookingRequestStepState[
        key as keyof typeof bookingRequestStepState
      ].isSelected;
    });
  }
  console.log(searchParams.get("quoteNumber"));

  return (
    <div
      aria-label="container"
      className={cx(styles["container"], "flex-1 flex-col overflow-y-auto")}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {searchParams.get("type") === "edit" ? (
            <>
              <MdOutlinedButton
                hasIcon
                onClick={() => {
                  router.back();
                }}
              >
                <MdIcon slot="icon">
                  <ChevronLeft fontSize="small" />
                </MdIcon>
                Back
              </MdOutlinedButton>
              <PageTitle title="Booking Template(Edit)" />
            </>
          ) : (
            <>
              <PageTitle title="New Template" hasFavorite={false} />
            </>
          )}
        </div>
        <div className="flex items-center">
          {searchParams.get("type") !== "edit" &&
            searchParams.get("quoteNumber") === null && (
              <BookingTemplateSelect
                initialTemplate={searchParams.get("template") as string}
              />
            )}
        </div>
      </div>
      <div
        className={cx(
          styles["area"],
          styles["no-padding"],
          styles["row-direction"],
          "flex-1"
        )}
      >
        <div className="flex flex-col gap-4 py-6 px-4 border-r border-r-outlineVariant">
          {Object.keys(bookingRequestStepState).map((key) => {
            const item =
              bookingRequestStepState[
                key as keyof typeof bookingRequestStepState
              ];
            return (
              <StepItem
                key={key}
                title={item.title}
                isSelected={item.isSelected}
                isCompleted={item.isCompleted}
                onClick={() => {
                  if (getSelectedStepId() !== key) handleStepClick(key);
                }}
              />
            );
          })}
        </div>
        <Suspense>
          <div className="flex-1 flex p-6">
            {
              {
                locationSchedule: <LoactionScheduleStep />,
                parties: <PartiesStep />,
                cargoPickUpReturn: <CargoStep />,
                container: <ContainerStep />,
                additionalInformation: <AdditionalInformationStep />,
                contactInformation: <ContactInformationStep />,
              }[getSelectedStepId() as keyof typeof bookingRequestStepState]
            }
          </div>
        </Suspense>
      </div>
      <div>
        <div
          className="relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
          style={
            {
              "--md-elevation-level": 4,
            } as CSSProperties
          }
        >
          <MdElevation />
          <MdFilledButton
            onClick={() => {
              const newBookingInformation = {
                locationSchedule,
                parties,
                container,
                cargoPickUpReturn,
                additionalInformation,
                contactInformation,
              } as BookingInformationRequestType;
              setBookingInformations((prev) => [
                ...prev,
                newBookingInformation,
              ]);
              router.push("/main/booking/template");
            }}
          >
            {searchParams.get("type") === "edit" ? "Save" : "Create"}
          </MdFilledButton>
        </div>
      </div>
    </div>
  );
}
