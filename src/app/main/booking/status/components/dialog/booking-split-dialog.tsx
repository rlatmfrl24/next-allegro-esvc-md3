import Portal from "@/app/components/portal";
import { MdDialog } from "@/app/util/md3";
import { useCallback, useEffect, useState } from "react";
import {
  BookingSplitConfirmation,
  BookingSplitProcess,
} from "./split-process-component";
import { BookingSplitType } from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  BookingSplitState,
  CurrentBookingDataState,
} from "@/app/store/booking.store";
import { set } from "lodash";

export function useBookingSplitDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"process" | "result">(
    "process"
  );
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const [originBooking, setOriginBooking] = useState<BookingSplitType>();
  const [splitCount, setSplitCount] = useState(2);
  // const [splitTableData, setSplitTableData] = useRecoilState(BookingSplitState);
  const setSplitTableData = useSetRecoilState(BookingSplitState);

  const makeOriginBooking = useCallback(
    (bookingNumber: string): BookingSplitType => {
      const typeSizeList = Array.from({
        length: faker.number.int({
          min: 1,
          max: 1,
        }),
      })
        .map((_, index) => {
          const type = faker.helpers.arrayElement([
            "Dry",
            "Reefer",
            "Open Top",
            "Flat Rack",
            "Tank",
          ]);
          const size = faker.helpers.arrayElement(["20", "40", "45"]);
          return `${type} ${size}ft`;
        })
        // remove duplicate
        .filter((value, index, self) => self.indexOf(value) === index);

      return {
        bookingNumber,
        weight: faker.number.int({
          min: 1000,
          max: 100000,
        }),
        containers: typeSizeList.map((typeSize, index) => {
          return {
            slot: index + 1,
            typeSize,
            quantity: faker.number.int({
              min: 1,
              max: 5,
            }),
          };
        }),
      };
    },
    []
  );

  const initializeSplitTableData = useCallback(
    (originBooking: BookingSplitType, splitCount: number) => {
      return [
        {
          bookingNumber: originBooking.bookingNumber,
          weight: originBooking.weight,
          containers: [
            {
              typeSize: undefined,
              slot: undefined,
              quantity: undefined,
            },
          ],
        },
        ...Array.from({ length: splitCount - 1 }).map(() => {
          return {
            bookingNumber: undefined,
            weight: undefined,
            containers: [
              {
                typeSize: undefined,
                slot: undefined,
                quantity: undefined,
              },
            ],
          };
        }),
      ];
    },
    []
  );

  useEffect(() => {
    if (currentBookingData?.bookingNo) {
      const newOriginBooking = makeOriginBooking(currentBookingData.bookingNo);
      setOriginBooking(newOriginBooking);
      setSplitTableData(initializeSplitTableData(newOriginBooking, splitCount));
    }
  }, [
    currentBookingData,
    initializeSplitTableData,
    makeOriginBooking,
    setSplitTableData,
    isDialogOpen,
    splitCount,
  ]);

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
            setCurrentStep("process");
          }}
          cancel={(e) => {
            e.preventDefault();
          }}
          className="min-w-[1200px]"
        >
          {currentStep === "process" && originBooking ? (
            <BookingSplitProcess
              splitCount={splitCount}
              setSplitCount={setSplitCount}
              originBooking={originBooking}
              handleAction={(action) => {
                if (action === "split") {
                  setCurrentStep("result");
                } else {
                  setIsDialogOpen(false);
                }
              }}
            />
          ) : (
            originBooking && (
              <BookingSplitConfirmation
                originBooking={originBooking}
                handleAction={(action) => {
                  if (action === "back") {
                    setCurrentStep("process");
                  } else {
                    setIsDialogOpen(false);
                  }
                }}
              />
            )
          )}
        </MdDialog>
      </Portal>
    );
  }

  return {
    setIsDialogOpen,
    renderDialog,
  };
}
