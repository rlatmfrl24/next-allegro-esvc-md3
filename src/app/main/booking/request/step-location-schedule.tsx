import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
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

import { createDummyPlaceInformation } from "../../schedule/util";
import SearchScheduleDialog from "./components/search-schedule-dialog";

export default function LoactionScheduleStep() {
  const [locationScheduleData, setLoactionScheduleData] = useRecoilState(
    LocationScheduleState
  );
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [isContractNumberManuallyInput, setIsContractNumberManuallyInput] =
    useState(locationScheduleData.contractNumber === "");
  const [isSearchScheduleDialogOpen, setIsSearchScheduleDialogOpen] =
    useState(false);

  const portList = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) =>
      createDummyPlaceInformation(
        (faker.location.city() + ", " + faker.location.country()).toUpperCase()
      )
    );
  }, []);

  // use Quote Data
  const params = useSearchParams();
  const quotationTerms = useRecoilValue(QuotationTermsState);

  useEffect(() => {
    if (params.has("quoteNumber")) {
      setLoactionScheduleData((prev) => ({
        ...prev,
        searchType: "earliest",
        originPort: quotationTerms.origin,
        destinationPort: quotationTerms.destination,
        originType: quotationTerms.originServiceTerm.toLowerCase() as
          | "cy"
          | "door",
        destinationType: quotationTerms.destinationServiceTerm.toLowerCase() as
          | "cy"
          | "door",
        pol: quotationTerms.pol,
        pod: quotationTerms.pod,
        departureDate: quotationTerms.departureDate,
      }));
    }
  }, [params, quotationTerms, setLoactionScheduleData]);

  const bookingOfficeList = useMemo(() => {
    const newList = Array.from({ length: 5 }, (_, i) => faker.company.name());
    return locationScheduleData.bookingOffice !== ""
      ? [locationScheduleData.bookingOffice, ...newList]
      : newList;
  }, [locationScheduleData.bookingOffice]);

  const randomContractList = useMemo(() => {
    const newList = Array.from(
      { length: 5 },
      (_, i) => "C" + faker.string.numeric(10)
    );
    return locationScheduleData.contractNumber !== ""
      ? [locationScheduleData.contractNumber, ...newList]
      : newList;
  }, [locationScheduleData.contractNumber]);

  const ValidateRequired = useCallback(() => {
    if (
      locationScheduleData.originPort.yardName === undefined ||
      locationScheduleData.destinationPort.yardName === undefined ||
      locationScheduleData.bookingOffice === ""
    ) {
      return false;
    }
    return true;
  }, [locationScheduleData]);

  const moveToParties = useCallback(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      locationSchedule: {
        ...prev.locationSchedule,
        isSelected: false,
      },
      parties: {
        ...prev.parties,
        isSelected: true,
      },
    }));
  }, [setBookingRequestStep]);

  useEffect(() => {
    if (ValidateRequired()) {
      setBookingRequestStep((prev) => ({
        ...prev,
        locationSchedule: {
          ...prev.locationSchedule,
          isCompleted: true,
        },
      }));
    } else {
      setBookingRequestStep((prev) => ({
        ...prev,
        locationSchedule: {
          ...prev.locationSchedule,
          isCompleted: false,
        },
      }));
    }
  }, [ValidateRequired, locationScheduleData, setBookingRequestStep]);

  return (
    <div className="flex flex-col flex-1">
      <MdTypography variant="title" size="large" className="mb-6">
        Location & Schedule
      </MdTypography>
      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col gap-6">
          <form className="flex gap-8">
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="cursor-pointer"
            >
              <MdRadio
                name="location-type"
                value="schedule"
                className="mr-2"
                checked={locationScheduleData.searchType === "schedule"}
                disabled={params.has("quoteNumber")}
                onClick={() => {
                  setLoactionScheduleData({
                    ...locationScheduleData,
                    searchType: "schedule",
                  });
                }}
              />
              By Schedule Search
            </MdTypography>
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="cursor-pointer"
            >
              <MdRadio
                name="location-type"
                value="earliest"
                checked={locationScheduleData.searchType === "earliest"}
                disabled={params.has("quoteNumber")}
                onClick={() => {
                  setLoactionScheduleData({
                    ...locationScheduleData,
                    searchType: "earliest",
                  });
                }}
                className="mr-2"
              />
              By The Earliest Available Schedule
            </MdTypography>
          </form>
          <div className="flex gap-4">
            <NAOutlinedAutoComplete
              itemList={portList.map((port) => port.yardName)}
              required
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
              required
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
          {locationScheduleData.searchType === "schedule" && (
            <div className="flex gap-4">
              <NAOutlinedTextField
                readOnly
                className="bg-surfaceContainer rounded"
                label="Estimated Time of Departure"
                required
                value={locationScheduleData.departureDate.toFormat(
                  "yyyy-MM-dd"
                )}
              />
              <NAOutlinedTextField
                readOnly
                label="Vessel Voyage"
                required
                value={locationScheduleData.vessel.consortiumVoyage || ""}
              />
            </div>
          )}
          {locationScheduleData.searchType === "earliest" && (
            <div className="flex">
              <MdSingleDatePicker
                label="Departure Date"
                readonly={params.has("quoteNumber")}
                defaultDate={locationScheduleData.departureDate}
                handleDateChange={(date) => {
                  setLoactionScheduleData((prev) => ({
                    ...prev,
                    departureDate: date,
                  }));
                }}
              />
            </div>
          )}
          <div className="flex gap-4">
            <NAOutlinedListBox
              required
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

            <NAOutlinedListBox
              label="Contract Number"
              options={[
                "Manually Input",
                ...randomContractList.map((contract) => {
                  return contract;
                }),
              ]}
              initialValue={
                isContractNumberManuallyInput
                  ? "Manually Input"
                  : locationScheduleData.contractNumber
              }
              onSelection={(value) => {
                if (value === "Manually Input") {
                  setIsContractNumberManuallyInput(true);
                  setLoactionScheduleData((prev) => ({
                    ...prev,
                    contractNumber: "",
                  }));
                } else {
                  setIsContractNumberManuallyInput(false);
                  setLoactionScheduleData((prev) => ({
                    ...prev,
                    contractNumber: value,
                  }));
                }
              }}
            />
            {isContractNumberManuallyInput && (
              <NAOutlinedTextField
                placeholder="Contract Number"
                value={locationScheduleData.contractNumber}
                handleValueChange={(value) => {
                  setLoactionScheduleData((prev) => ({
                    ...prev,
                    contractNumber: value,
                  }));
                }}
              />
            )}
          </div>
        </div>
        {locationScheduleData.searchType === "schedule" && (
          <MdFilledTonalButton
            className="mt-[50px] h-fit"
            onClick={() => {
              setIsSearchScheduleDialogOpen(true);
            }}
          >
            Search Schedule
          </MdFilledTonalButton>
        )}
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
        onSelection={(vaule) => {
          setLoactionScheduleData((prev) => ({
            ...prev,
            originPort: vaule.origin,
            destinationPort: vaule.destination,
            pol: vaule.origin,
            pod: vaule.destination,
            departureDate: vaule.departureDate,
            vessel: vaule.vesselInfo,
          }));
        }}
      />
    </div>
  );
}
