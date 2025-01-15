"use client";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { useMergeSelectionTable } from "@/app/main/booking/status/components/dialog/merge-selection-table";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import {
  BookingMergeSelector,
  BookingMergeState,
  CurrentBookingDataState,
  LocationScheduleState,
} from "@/app/store/booking.store";
import { MdDialog, MdFilledButton, MdOutlinedButton } from "@/app/util/md3";
import { MergeTableType } from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";

export function useBookingMergeDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"selection" | "confirmation">(
    "selection"
  );
  const [mergeData, setMergeData] = useRecoilState(BookingMergeState);
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const candidateData = useMemo(() => {
    return makeMergeCandidateData(currentBookingData?.bookingNo || "");
  }, [currentBookingData?.bookingNo]);

  useEffect(() => {
    setMergeData([candidateData[0]]);
  }, [candidateData, setMergeData]);

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setCurrentStep("selection");
            setIsDialogOpen(false);
          }}
          cancel={(e) => {
            e.preventDefault();
          }}
          className="min-w-[960px]"
        >
          {currentStep === "selection" ? (
            <BookingMergeSelection
              data={candidateData}
              handleAction={(action) => {
                if (action === "merge") {
                  setCurrentStep("confirmation");
                } else {
                  setIsDialogOpen(false);
                }
              }}
            />
          ) : (
            <BookingMergeConfirmation
              handleAction={(action) => {
                if (action === "back") {
                  setCurrentStep("selection");
                } else {
                  setIsDialogOpen(false);
                }
              }}
            />
          )}
        </MdDialog>
      </Portal>
    );
  }

  return {
    renderDialog,
    setIsDialogOpen,
  };
}

const BookingMergeSelection = ({
  data,
  handleAction,
}: {
  data: MergeTableType[];
  handleAction: (action: string) => void;
}) => {
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const currentLocationScheduleData = useRecoilValue(LocationScheduleState);
  const [selectedData, setSelectedData] = useRecoilState(BookingMergeState);
  const { renderTable, resetSelection } = useMergeSelectionTable({
    candidateData: data,
  });

  return (
    <>
      <div slot="headline">Booking Merge</div>
      <div slot="content">
        <div className="grid grid-cols-[128px_1fr_128px_1fr] gap-2 mb-6">
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking No.
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.bookingNo}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking Office
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentLocationScheduleData?.bookingOffice}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Vessel Voyage
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.vessel.vesselName}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Shipper
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.actualShipper}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            POL/ETD
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.origin +
              ", " +
              currentBookingData?.estimatedTimeofDeparture.date.toFormat(
                "yyyy. MM. dd"
              )}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            POD/ETA
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.destination +
              ", " +
              currentLocationScheduleData?.departureDate.toFormat(
                "yyyy. MM. dd"
              )}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Term
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentLocationScheduleData?.originType.toUpperCase() +
              " - " +
              currentLocationScheduleData?.destinationType.toUpperCase()}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking Date
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.requestDate.toFormat("yyyy. MM. dd")}
          </MdTypography>
        </div>
        <DetailTitle title="Container Information" />
        {renderTable()}
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            resetSelection();
            handleAction("close");
          }}
        >
          Close
        </MdOutlinedButton>
        <MdFilledButton
          disabled={selectedData.length < 2}
          onClick={() => {
            handleAction("merge");
          }}
        >
          Merge
        </MdFilledButton>
      </div>
    </>
  );
};

const BookingMergeConfirmation = ({
  handleAction,
}: {
  handleAction: (action: string) => void;
}) => {
  const [mergeData, setMergeData] = useRecoilState(BookingMergeState);
  // const mergedData = useMemo(() => {
  //   const result = mergeData.reduce(
  //     (acc, cur) => {
  //       const mergedContainers = cur.containers.reduce((acc, cur) => {
  //         const index = acc.findIndex(
  //           (t) => t.type === cur.type && t.size === cur.size
  //         );
  //         if (index !== -1) {
  //           acc.splice(index, 1, {
  //             ...acc[index],
  //             quantity: acc[index].quantity + cur.quantity,
  //           });
  //         } else {
  //           acc.push(cur);
  //         }
  //         return acc;
  //       }, acc.containers);

  //       acc.bookingNumber = cur.bookingNumber;
  //       acc.totalWeight = (
  //         parseInt(acc.totalWeight) + parseInt(cur.totalWeight)
  //       ).toString();
  //       acc.containers = mergedContainers;
  //       acc.emptyPickupPlace = cur.emptyPickupPlace;
  //       acc.emptyPickupDate =
  //         acc.emptyPickupDate > cur.emptyPickupDate
  //           ? acc.emptyPickupDate
  //           : cur.emptyPickupDate;
  //       return acc;
  //     },
  //     {
  //       bookingNumber: mergeData[0].bookingNumber,
  //       totalWeight: "0",
  //       containers: [],
  //       emptyPickupPlace: mergeData[0].emptyPickupPlace,
  //       emptyPickupDate: mergeData[0].emptyPickupDate,
  //     } as MergeTableType
  //   );
  //   return result;
  // }, [mergeData]);

  const mergedData = useRecoilValue(BookingMergeSelector);

  const { renderTable: beforeRenderTable } = useMergeSelectionTable({
    candidateData: mergeData,
  });
  const { renderTable: afterRenderTable } = useMergeSelectionTable({
    candidateData: mergedData,
  });

  return (
    <>
      <div slot="headline">Merge Information</div>
      <div slot="content" className="flex flex-col gap-4">
        <div className="p-4 bg-white rounded-lg">
          <DetailTitle title="Before" />
          {beforeRenderTable()}
        </div>
        <div className="p-4 bg-white rounded-lg">
          <DetailTitle title="After" />
          {afterRenderTable()}
        </div>
      </div>
      <div slot="actions" className="justify-between">
        <MdOutlinedButton
          onClick={() => {
            handleAction("back");
          }}
        >
          Back
        </MdOutlinedButton>
        <div className="flex gap-2">
          <MdOutlinedButton
            onClick={() => {
              handleAction("close");
            }}
          >
            Close
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              handleAction("confirm");
            }}
          >
            Confirm
          </MdFilledButton>
        </div>
      </div>
    </>
  );
};

function makeMergeCandidateData(sourceBookingNumber: string) {
  return Array.from({ length: 10 }).map((_, index) => {
    const containers = Array.from({
      length: faker.number.int({
        min: 1,
        max: 5,
      }),
    }).map(() => {
      return {
        type: faker.helpers.arrayElement([
          "Dry",
          "Reefer",
          "Open Top",
          "Flat Rack",
          "Tank",
        ]),
        size: faker.helpers.arrayElement(["20", "40"]),
        quantity: faker.number.int({
          min: 1,
          max: 10,
        }),
      };
    });

    //remove data if type and size are duplicated and sort by type and size
    const uniqueContainers = containers
      .filter(
        (container, index, self) =>
          index ===
          self.findIndex(
            (t) => t.type === container.type && t.size === container.size
          )
      )
      .sort((a, b) => {
        if (a.type > b.type) {
          return 1;
        } else if (a.type < b.type) {
          return -1;
        } else {
          return parseInt(a.size) - parseInt(b.size);
        }
      });

    return {
      bookingNumber:
        index === 0
          ? sourceBookingNumber
          : faker.string.alphanumeric(10).toUpperCase(),
      totalWeight: faker.number
        .int({
          min: 1000,
          max: 100000,
        })
        .toString(),
      containers: uniqueContainers,
      emptyPickupPlace: createDummyPlaceInformation(faker.location.city()),
      emptyPickupDate: DateTime.fromJSDate(faker.date.recent()),
    } as MergeTableType;
  });
}
