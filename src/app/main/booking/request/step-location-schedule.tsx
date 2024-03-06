import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedSelect from "@/app/components/na-outlined-select";
import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  LocationScheduleState,
} from "@/app/store/booking-request.store";
import {
  MdFilledButton,
  MdFilledTonalButton,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdRadio,
  MdSelectOption,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { FmdGoodOutlined } from "@mui/icons-material";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

export default function LoactionScheduleStep() {
  const [locationScheduleData, setLoactionScheduleData] = useRecoilState(
    LocationScheduleState
  );
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);

  const [originPort, setOriginPort] = useState(locationScheduleData.originPort);
  const [destinationPort, setDestinationPort] = useState(
    locationScheduleData.destinationPort
  );
  const [isContractNumberManuallyInput, setIsContractNumberManuallyInput] =
    useState(false);

  const portList = useMemo(() => {
    return Array.from(
      { length: 50 },
      (_, i) => faker.location.city() + ", " + faker.location.country()
    );
  }, []);

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

  useEffect(() => {
    setLoactionScheduleData({
      ...locationScheduleData,
      originPort,
      destinationPort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originPort, destinationPort]);

  useEffect(() => {
    setOriginPort(locationScheduleData.originPort);
    setDestinationPort(locationScheduleData.destinationPort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ValidateRequired = useCallback(() => {
    if (
      locationScheduleData.originPort === "" ||
      locationScheduleData.destinationPort === "" ||
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
              itemList={portList}
              required
              label="Origin"
              icon={<FmdGoodOutlined />}
              className="flex-1"
            />
            <MdOutlinedSelect
              selectedIndex={locationScheduleData.originType === "cy" ? 0 : 1}
              onchange={(e) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  originType: (e.target as HTMLSelectElement).value as
                    | "cy"
                    | "door",
                }));
              }}
            >
              <MdSelectOption value="cy">CY</MdSelectOption>
              <MdSelectOption value="door">Door</MdSelectOption>
            </MdOutlinedSelect>
            <MdOutlinedTextField
              placeholder="Port of Loading"
              value={locationScheduleData.pol}
              onInput={(e) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  pol: (e.target as HTMLInputElement).value,
                }));
              }}
            ></MdOutlinedTextField>
          </div>
          <div className="flex gap-4">
            <NAOutlinedAutoComplete
              itemList={portList}
              required
              label="Destination"
              icon={<FmdGoodOutlined />}
              className="flex-1"
            />
            <MdOutlinedSelect
              selectedIndex={
                locationScheduleData.destinationType === "cy" ? 0 : 1
              }
              onchange={(e) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  destinationType: (e.target as HTMLSelectElement).value as
                    | "cy"
                    | "door",
                }));
              }}
            >
              <MdSelectOption value="cy">CY</MdSelectOption>
              <MdSelectOption value="door">Door</MdSelectOption>
            </MdOutlinedSelect>
            <MdOutlinedTextField
              value={locationScheduleData.pod}
              onInput={(e) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  pod: (e.target as HTMLInputElement).value,
                }));
              }}
              placeholder="Port of Discharging"
            ></MdOutlinedTextField>
          </div>
          {locationScheduleData.searchType === "schedule" && (
            <div className="flex gap-4">
              <NAOutlinedTextField
                disabled
                className="bg-surfaceContainer rounded"
                label="Estimated Time of Departure"
                required
                value={``}
              />
              <NAOutlinedTextField
                disabled
                label="Vessel Voyage"
                required
                value=""
              />
            </div>
          )}
          {locationScheduleData.searchType === "earliest" && (
            <div className="flex">
              <MdSingleDatePicker
                label="Departure Date"
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
            <NAOutlinedSelect
              label="Booking Office"
              required
              selectedIndex={bookingOfficeList.indexOf(
                locationScheduleData.bookingOffice
              )}
              onchange={(e) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  bookingOffice: (e.target as HTMLSelectElement).value,
                }));
              }}
            >
              {bookingOfficeList.map((office, index) => (
                <MdSelectOption key={index} value={office}>
                  {office}
                </MdSelectOption>
              ))}
            </NAOutlinedSelect>
            <MdOutlinedSelect
              label="Contract Number"
              selectedIndex={
                isContractNumberManuallyInput
                  ? randomContractList.length
                  : randomContractList.indexOf(
                      locationScheduleData.contractNumber
                    )
              }
              onchange={(e) => {
                const newValue = (e.target as HTMLSelectElement).value;
                if (newValue === undefined) {
                  setIsContractNumberManuallyInput(true);
                  setLoactionScheduleData((prev) => ({
                    ...prev,
                    contractNumber: "",
                  }));
                  return;
                } else {
                  setIsContractNumberManuallyInput(false);
                  setLoactionScheduleData((prev) => ({
                    ...prev,
                    contractNumber: (e.target as HTMLSelectElement).value,
                  }));
                }
              }}
            >
              {randomContractList.map((contract, index) => (
                <MdSelectOption key={index} value={contract}>
                  {contract}
                </MdSelectOption>
              ))}
              <MdSelectOption value={undefined}>Manually Input</MdSelectOption>
            </MdOutlinedSelect>
            <MdOutlinedTextField
              className={
                isContractNumberManuallyInput ? "visible" : "invisible"
              }
              placeholder="Contract Number"
              value={locationScheduleData.contractNumber}
              onInput={(e) => {
                setLoactionScheduleData((prev) => ({
                  ...prev,
                  contractNumber: (e.target as HTMLInputElement).value,
                }));
              }}
            ></MdOutlinedTextField>
          </div>
        </div>
        {locationScheduleData.searchType === "schedule" && (
          <MdFilledTonalButton className="mt-[50px] h-fit">
            Search Schedule
          </MdFilledTonalButton>
        )}
      </div>
      <MdFilledButton className="self-end" onClick={() => moveToParties()}>
        Next
      </MdFilledButton>
    </div>
  );
}
