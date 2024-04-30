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
  clearBookingRequestState,
} from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import {
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
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
import { useRouter } from "next/navigation";
import { BookingInformationRequestType } from "@/app/util/typeDef/boooking";
import { set } from "lodash";

export default function BookingRequest() {
  const cx = classNames.bind(styles);
  const [bookingRequestStepState, setBookingRequestStepState] = useRecoilState(
    BookingRequestStepState
  );
  const router = useRouter();

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
        <PageTitle title="Booking Request" />
        <Link href={`/main/booking/template`}>
          <MdOutlinedButton>Booking Template</MdOutlinedButton>
        </Link>
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
