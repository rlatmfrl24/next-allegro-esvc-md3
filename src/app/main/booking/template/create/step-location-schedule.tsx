import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  LocationScheduleState,
} from "@/app/store/booking.store";
import { QuotationTermsState } from "@/app/store/pricing.store";
import { MdFilledButton, MdFilledTonalButton, MdRadio } from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { FmdGoodOutlined } from "@mui/icons-material";

import { DatePicker } from "@/app/components/datepickers/date-picker";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import SearchScheduleDialog from "../../request/components/search-schedule-dialog";

export default function LoactionScheduleStep() {
  const [locationScheduleData, setLoactionScheduleData] = useRecoilState(
    LocationScheduleState
  );
  const [isSearchScheduleDialogOpen, setIsSearchScheduleDialogOpen] =
    useState(false);

  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  // const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
  //   BookingRequestStepState
  // );

  const portList = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) =>
      createDummyPlaceInformation(
        (faker.location.city() + ", " + faker.location.country()).toUpperCase()
      )
    );
  }, []);

  const params = useSearchParams();

  const bookingOfficeList = useMemo(() => {
    const newList = Array.from({ length: 5 }, (_, i) => faker.company.name());
    return locationScheduleData.bookingOffice !== ""
      ? [locationScheduleData.bookingOffice, ...newList]
      : newList;
  }, [locationScheduleData.bookingOffice]);

  const moveToParties = useCallback(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      locationSchedule: {
        ...prev.locationSchedule,
        isSelected: false,
        visited: true,
      },
      parties: {
        ...prev.parties,
        isSelected: true,
      },
    }));
  }, [setBookingRequestStep]);

  return (
    <div className="flex flex-col flex-1">
      <MdTypography variant="title" size="large" className="mb-6">
        Location & Schedule
      </MdTypography>
      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-4">
            <NAOutlinedAutoComplete
              itemList={portList.map((port) => port.yardName)}
              label="Origin"
              readOnly={params.has("quoteNumber")}
              icon={<FmdGoodOutlined />}
              className="flex-1"
              recentCookieKey="recent-port"
              initialValue={locationScheduleData.originPort.yardName}
              onItemSelection={(value) => {
                let selectedPort = portList.find(
                  (port) => port.yardName === value
                );
                if (value !== "" && selectedPort === undefined) {
                  selectedPort = createDummyPlaceInformation(value);
                }
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  originPort: selectedPort || ({} as PlaceInformationType),
                }));
              }}
            />
            <NAOutlinedListBox
              className="w-40"
              readOnly={params.has("quoteNumber")}
              initialValue={
                locationScheduleData.originType === "cy" ? "CY" : "Door"
              }
              options={["CY", "Door"]}
              onSelection={(value) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  originType: value === "CY" ? "cy" : "door",
                }));
              }}
            />
            <NAOutlinedAutoComplete
              itemList={portList.map((port) => port.yardName)}
              placeholder="Port of Loading"
              label="POL"
              readOnly={params.has("quoteNumber")}
              initialValue={locationScheduleData.pol.yardName}
              recentCookieKey="recent-port"
              onItemSelection={(value) => {
                let selectedPort = portList.find(
                  (port) => port.yardName === value
                );
                if (value !== "" && selectedPort === undefined) {
                  selectedPort = createDummyPlaceInformation(value);
                }
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  pol: selectedPort || ({} as PlaceInformationType),
                }));
              }}
            />
          </div>
          <div className="flex gap-4">
            <NAOutlinedAutoComplete
              itemList={portList.map((port) => port.yardName)}
              readOnly={params.has("quoteNumber")}
              label="Destination"
              icon={<FmdGoodOutlined />}
              className="flex-1"
              recentCookieKey="recent-port"
              initialValue={locationScheduleData.destinationPort.yardName}
              onItemSelection={(value) => {
                let selectedPort = portList.find(
                  (port) => port.yardName === value
                );

                if (value !== "" && selectedPort === undefined) {
                  selectedPort = createDummyPlaceInformation(value);
                }

                setLoactionScheduleData((prev) => ({
                  ...prev,
                  destinationPort: selectedPort || ({} as PlaceInformationType),
                }));
              }}
            />
            <NAOutlinedListBox
              className="w-40"
              readOnly={params.has("quoteNumber")}
              initialValue={
                locationScheduleData.destinationType === "cy" ? "CY" : "Door"
              }
              options={["CY", "Door"]}
              onSelection={(value) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  destinationType: value === "CY" ? "cy" : "door",
                }));
              }}
            />
            <NAOutlinedAutoComplete
              itemList={portList.map((port) => port.yardName)}
              placeholder="Port of Discharging"
              label="POD"
              readOnly={params.has("quoteNumber")}
              initialValue={locationScheduleData.pod.yardName}
              recentCookieKey="recent-port"
              onItemSelection={(value) => {
                let selectedPort = portList.find(
                  (port) => port.yardName === value
                );

                if (value !== "" && selectedPort === undefined) {
                  selectedPort = createDummyPlaceInformation(value);
                }

                setLoactionScheduleData((prev) => ({
                  ...prev,
                  pod: selectedPort || ({} as PlaceInformationType),
                }));
              }}
            />
          </div>
          <NAOutlinedListBox
            className="w-96"
            label="Booking Office"
            initialValue={locationScheduleData.bookingOffice}
            options={bookingOfficeList}
            onSelection={(value) => {
              setLoactionScheduleData((prev) => ({
                ...prev,
                bookingOffice: value,
              }));
            }}
          />
        </div>
      </div>
      <MdFilledButton className="self-end" onClick={() => moveToParties()}>
        Next
      </MdFilledButton>
      <SearchScheduleDialog
        open={isSearchScheduleDialogOpen}
        handleOpen={setIsSearchScheduleDialogOpen}
        condition={{
          origins: [
            (
              faker.location.city() +
              ", " +
              faker.location.country()
            ).toUpperCase(),
          ],
          destinations: [
            (
              faker.location.city() +
              ", " +
              faker.location.country()
            ).toUpperCase(),
          ],
          searchOn: "departure",
          startDate: DateTime.now().minus({ days: 7 }),
          endDate: DateTime.now(),
        }}
        onSelection={(value) => {
          console.log(value);
          value &&
            setLoactionScheduleData((prev) => ({
              ...prev,
              originPort: value.origin,
              destinationPort: value.destination,
              pol: value.origin,
              pod: value.destination,
              departureDate: value.departureDate,
              vessel: value.vesselInfo,
            }));
        }}
      />
    </div>
  );
}
