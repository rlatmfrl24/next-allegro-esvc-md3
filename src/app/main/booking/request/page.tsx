"use client";

import classNames from "classnames";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import PageTitle from "@/app/components/title-components";
import {
  AdditionalInformationState,
  BookingInformationState,
  BookingRequestStepState,
  CargoPickUpReturnState,
  ContactInformationState,
  ContainerState,
  LocationScheduleState,
  PartiesState,
} from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import {
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdOutlinedButton,
} from "@/app/util/md3";

import CargoStep from "./step-cargo";
import ContainerStep from "./step-container";
import AdditionalInformationStep from "./step-additional-information";
import StepItem from "./step-item";
import LoactionScheduleStep from "./step-location-schedule";
import PartiesStep from "./step-parties";
import { CSSProperties, Suspense, use, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import ContactInformationStep from "./step-contact-information";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookingInformationRequestType,
  BookingStatus,
} from "@/app/util/typeDef/boooking";
import { set } from "lodash";
import { ChevronLeft } from "@mui/icons-material";
import BookingStatusChip from "../status/components/booking-status-chip";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/components/divider";

export default function BookingRequestPage() {
  return (
    <Suspense>
      <BookingRequest />
    </Suspense>
  );
}

function BookingRequest() {
  const cx = classNames.bind(styles);
  const [bookingRequestStepState, setBookingRequestStepState] = useRecoilState(
    BookingRequestStepState
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const locationSchedule = useRecoilValue(LocationScheduleState);
  const parties = useRecoilValue(PartiesState);
  const container = useRecoilValue(ContainerState);
  const cargoPickUpReturn = useRecoilValue(CargoPickUpReturnState);
  const additionalInformation = useRecoilValue(AdditionalInformationState);
  const contactInformation = useRecoilValue(ContactInformationState);
  const setBookingInformations = useSetRecoilState(BookingInformationState);
  // const clearBookingRequestStep = useSetRecoilState(clearBookingRequestState);

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

  const AllStepsCompleted = useMemo(() => {
    return Object.keys(bookingRequestStepState).every((key) => {
      return bookingRequestStepState[
        key as keyof typeof bookingRequestStepState
      ].isCompleted;
    });
  }, [bookingRequestStepState]);

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

  return (
    <div aria-label="container" className={styles.container + ""}>
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
              <PageTitle title="Booking Request(Edit)" />
            </>
          ) : (
            <>
              <PageTitle title="Booking Request" />
            </>
          )}
        </div>
        <div className="flex items-center">
          {searchParams.get("type") !== "edit" ? (
            <MdOutlinedButton>Booking Template</MdOutlinedButton>
          ) : (
            <>
              {searchParams.get("status") !== null && (
                <BookingStatusChip
                  status={searchParams.get("status") as BookingStatus}
                />
              )}
              {searchParams.get("requestNo") !== null && (
                <>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline mr-1 ml-4"
                  >
                    Request No.
                  </MdTypography>
                  <MdTypography variant="body" size="medium" prominent>
                    {searchParams.get("requestNo")}
                  </MdTypography>
                </>
              )}
              {searchParams.get("bookingNo") !== null && (
                <>
                  <DividerComponent
                    orientation="vertical"
                    className="mx-4 h-5"
                  />
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline mr-1"
                  >
                    Booking No.
                  </MdTypography>
                  <MdTypography variant="body" size="medium" prominent>
                    {searchParams.get("bookingNo")}
                  </MdTypography>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className={cx(
          styles["area"],
          styles["no-padding"],
          styles["row-direction"],
          "min-h-[720px] "
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
      <AnimatePresence>
        {AllStepsCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring" }}
            className="fixed bottom-0 left-20 w-[calc(100%-80px)] px-4 pb-2 z-10"
          >
            <div
              className="relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
              style={
                {
                  "--md-elevation-level": 4,
                } as CSSProperties
              }
            >
              <MdElevation />
              <Link href={`/main/booking/information/preview`}>
                <MdFilledTonalButton>Preview</MdFilledTonalButton>
              </Link>
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
                  router.push("/main/booking/request");
                }}
              >
                Booking
              </MdFilledButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
