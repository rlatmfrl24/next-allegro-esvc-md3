import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  ContainerState,
  CurrentBookingDataState,
  LocationScheduleState,
} from "@/app/store/booking.store";
import {
  MdFilledButton,
  MdFilledTonalButton,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { BookingSplitType } from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SplitInputTable, SplitValidationTable } from "./booking-split-table";

const BookingSplitInformation = ({
  originBooking,
}: {
  originBooking: BookingSplitType;
}) => {
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const currentLocationScheduleData = useRecoilValue(LocationScheduleState);

  return (
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
          currentLocationScheduleData?.departureDate.toFormat("yyyy. MM. dd")}
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
      <MdTypography variant="body" size="medium" className="text-outline">
        Container
      </MdTypography>
      <MdTypography
        variant="body"
        size="medium"
        className="text-onSurface col-span-3"
      >
        {originBooking?.containers
          .map((container) => {
            return `${container.typeSize} x ${container.quantity}`;
          })
          .join(", ")}
      </MdTypography>
    </div>
  );
};

export const BookingSplitProcess = ({
  handleAction,
}: {
  handleAction: (action: string) => void;
}) => {
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const [originBooking, setOriginBooking] = useState<BookingSplitType>();
  const [splitCountQuery, setSplitCountQuery] = useState<string>("2");
  const [splitCount, setSplitCount] = useState<number>(2);

  const makeOriginBooking = useCallback(
    (bookingNumber: string): BookingSplitType => {
      const typeSizeList = Array.from({
        length: faker.number.int({
          min: 1,
          max: 5,
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

  useEffect(() => {
    if (currentBookingData?.bookingNo) {
      setOriginBooking(makeOriginBooking(currentBookingData.bookingNo));
    }
  }, [currentBookingData?.bookingNo, makeOriginBooking]);

  return (
    <>
      <div slot="headline">Booking Split</div>
      <div slot="content">
        {originBooking && (
          <>
            <BookingSplitInformation originBooking={originBooking} />
            <div className="bg-white p-4 rounded-lg">
              <DetailTitle title="Container Information & Split Result" />
              <SplitValidationTable originBooking={originBooking} />
            </div>
          </>
        )}
        <div className="bg-white p-4 rounded-lg mt-5">
          <div className="flex items-center justify-between">
            <DetailTitle title="Split Information" />
            <div className="flex gap-2 relative">
              <MdTypography
                variant="label"
                size="medium"
                className="text-onSurface absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white pr-2"
              >
                Split
              </MdTypography>
              <MdOutlinedTextField
                style={
                  {
                    "--md-sys-typescale-body-large-size": "14px",
                    "--md-outlined-field-top-space": "0px",
                    "--md-outlined-field-bottom-space": "0px",
                  } as CSSProperties
                }
                className="text-right w-28 pt-0"
                type="number"
                noSpinner
                value={splitCountQuery}
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  if (value === "") {
                    setSplitCountQuery(value);
                    return;
                  }
                  if (value.match(/^[0-9]*$/)) {
                    setSplitCountQuery(value);
                  }
                }}
              />
              <MdFilledTonalButton
                className="h-fit"
                onClick={() => {
                  setSplitCount(
                    parseInt(splitCountQuery) > 0
                      ? parseInt(splitCountQuery)
                      : 2
                  );
                }}
              >
                Apply
              </MdFilledTonalButton>
            </div>
          </div>
          {originBooking && (
            <SplitInputTable
              originBooking={originBooking}
              splitCount={splitCount}
            />
          )}
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            handleAction("cancel");
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            handleAction("split");
          }}
        >
          Split
        </MdFilledButton>
      </div>
    </>
  );
};

export const BookingSplitConfirmation = ({
  handleAction,
}: {
  handleAction: (action: string) => void;
}) => {
  return (
    <>
      <div slot="headline">Split Information</div>
      <div slot="content" className="gap-4 flex flex-col">
        <div className="bg-white p-4 rounded-lg">
          <DetailTitle title="Before" />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <DetailTitle title="After" />
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
              handleAction("split");
            }}
          >
            Split
          </MdFilledButton>
        </div>
      </div>
    </>
  );
};
