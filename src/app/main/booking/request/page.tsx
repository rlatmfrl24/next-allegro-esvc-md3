"use client";

import classNames from "classnames";
import { useRecoilState } from "recoil";

import PageTitle from "@/app/components/page-title";
import { BookingRequestState } from "@/app/store/booking-request.store";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton } from "@/app/util/md3";

import CargoStep from "./step-cargo";
import ContainerStep from "./step-container";
import EtcStep from "./step-etc";
import StepItem from "./step-item";
import LoactionScheduleStep from "./step-location-schedule";
import PartiesStep from "./step-parties";

export default function BookingRequest() {
  const cx = classNames.bind(styles);
  const [bookingRequestState, setBookingRequestState] =
    useRecoilState(BookingRequestState);

  function handleStepClick(key: string) {
    setBookingRequestState((prev) => {
      const newArray = Object.keys(prev).map((k) => {
        return {
          ...prev[k as keyof typeof prev],
          isSelected: k === key,
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
    return Object.keys(bookingRequestState).find((key) => {
      return bookingRequestState[key as keyof typeof bookingRequestState]
        .isSelected;
    });
  }

  return (
    <div aria-label="container" className={styles.container + " h-fit"}>
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Request" />
        <MdOutlinedButton>Booking Template</MdOutlinedButton>
      </div>
      <div
        className={cx(
          styles["area"],
          styles["no-padding"],
          styles["row-direction"],
          "min-h-[812px]"
        )}
      >
        <div className="flex flex-col gap-4 py-6 px-4 border-r border-r-outlineVariant">
          {Object.keys(bookingRequestState).map((key) => {
            const item =
              bookingRequestState[key as keyof typeof bookingRequestState];
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
        <div className="flex-1 p-6">
          {
            {
              locationSchedule: <LoactionScheduleStep />,
              parties: <PartiesStep />,
              cargoPickUpReturn: <CargoStep />,
              container: <ContainerStep />,
              etc: <EtcStep />,
            }[getSelectedStepId() as keyof typeof bookingRequestState]
          }
        </div>
      </div>
    </div>
  );
}
