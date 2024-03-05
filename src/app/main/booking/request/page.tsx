"use client";

import classNames from "classnames";
import { useRecoilState } from "recoil";

import PageTitle from "@/app/components/page-title";
import { BookingRequestStepState } from "@/app/store/booking-request.store";
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
  const [bookingRequestStepState, setBookingRequestStepState] = useRecoilState(
    BookingRequestStepState
  );

  function handleStepClick(key: string) {
    setBookingRequestStepState((prev) => {
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
    return Object.keys(bookingRequestStepState).find((key) => {
      return bookingRequestStepState[
        key as keyof typeof bookingRequestStepState
      ].isSelected;
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
          "min-h-[792px] mb-4"
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
        <div className="flex-1 flex p-6">
          {
            {
              locationSchedule: <LoactionScheduleStep />,
              parties: <PartiesStep />,
              cargoPickUpReturn: <CargoStep />,
              container: <ContainerStep />,
              etc: <EtcStep />,
            }[getSelectedStepId() as keyof typeof bookingRequestStepState]
          }
        </div>
      </div>
    </div>
  );
}
