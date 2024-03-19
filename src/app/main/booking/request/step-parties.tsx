import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import { MdFilledButton } from "@/app/util/md3";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  BookingRequestStepState,
  PartiesState,
} from "@/app/store/booking.store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { SubTitle } from "@/app/components/title-components";

export default function PartiesStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [partiesData, setPartiesData] = useRecoilState(PartiesState);

  const tempCompaniesData = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => ({
      name: faker.company.name(),
      address:
        faker.location.streetAddress() +
        ", " +
        faker.location.city() +
        ", " +
        faker.location.state() +
        ", " +
        faker.location.zipCode() +
        ", " +
        faker.location.country(),
    }));
  }, []);

  const ValidateRequired = useCallback(() => {
    if (partiesData.shipper.name === "" || partiesData.shipper.address === "") {
      return false;
    } else {
      return true;
    }
  }, [partiesData.shipper.address, partiesData.shipper.name]);

  const moveToCargoStep = useCallback(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        isSelected: false,
      },
      cargoPickUpReturn: {
        ...prev.cargoPickUpReturn,
        isSelected: true,
      },
    }));
  }, [setBookingRequestStep]);

  useEffect(() => {
    if (ValidateRequired()) {
      setBookingRequestStep((prev) => ({
        ...prev,
        parties: {
          ...prev.parties,
          isCompleted: true,
        },
      }));
    } else {
      setBookingRequestStep((prev) => ({
        ...prev,
        parties: {
          ...prev.parties,
          isCompleted: false,
        },
      }));
    }
  }, [ValidateRequired, partiesData, setBookingRequestStep]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Parties
      </MdTypography>
      <SubTitle title="Shipper" className="mb-4" />
      <div className="flex gap-4">
        <NAMultiAutoComplete
          label="Company Name"
          itemList={tempCompaniesData}
          required
          initialValue={{
            name: partiesData.shipper.name,
            address: partiesData.shipper.address,
          }}
          isAllowOnlyListItems={false}
          onQueryChange={(query) => {
            setPartiesData((prev) => ({
              ...prev,
              shipper: {
                ...prev.shipper,
                name: query,
              },
            }));
          }}
          onItemSelection={(item) => {
            setPartiesData((prev) => ({
              ...prev,
              shipper: {
                ...prev.shipper,
                name: item.name,
                address: item.address,
              },
            }));
          }}
        />

        <NAOutlinedTextField
          className="flex-1"
          label="Address"
          placeholder="Address (State Name, City, State & Zip Code, Country Name)"
          required
          value={partiesData.shipper.address}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              shipper: {
                ...prev.shipper,
                address: value,
              },
            }));
          }}
        />
      </div>
      <SubTitle title="Freight Forwarder" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAMultiAutoComplete
          label="Company Name"
          itemList={tempCompaniesData}
          initialValue={{
            name: partiesData.freightForwarder.name,
            address: partiesData.freightForwarder.address,
          }}
          isAllowOnlyListItems={false}
          onQueryChange={(query) => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                name: query,
              },
            }));
          }}
          onItemSelection={(item) => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                name: item.name,
                address: item.address,
              },
            }));
          }}
        />

        <NAOutlinedTextField
          className="flex-1"
          label="Address"
          placeholder="Address (State Name, City, State & Zip Code, Country Name)"
          value={partiesData.freightForwarder.address}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                address: value,
              },
            }));
          }}
        />
        <NaToggleButton
          label="Same as Shipper"
          state={
            partiesData.shipper.name !== "" &&
            partiesData.shipper.address !== "" &&
            partiesData.freightForwarder.name === partiesData.shipper.name &&
            partiesData.freightForwarder.address === partiesData.shipper.address
              ? "checked"
              : "unchecked"
          }
          onClick={(isChecked) => {
            if (isChecked) {
              setPartiesData((prev) => ({
                ...prev,
                freightForwarder: {
                  ...prev.freightForwarder,
                  address: "",
                  name: "",
                },
              }));
            } else {
              setPartiesData((prev) => ({
                ...prev,
                freightForwarder: {
                  ...prev.freightForwarder,
                  address: prev.shipper.address,
                  name: prev.shipper.name,
                },
              }));
            }
          }}
        />
      </div>
      <SubTitle title="Consignee" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAMultiAutoComplete
          label="Company Name"
          itemList={tempCompaniesData}
          initialValue={{
            name: partiesData.consignee.name,
            address: partiesData.consignee.address,
          }}
          isAllowOnlyListItems={false}
          onQueryChange={(query) => {
            setPartiesData((prev) => ({
              ...prev,
              consignee: {
                ...prev.consignee,
                name: query,
              },
            }));
          }}
          onItemSelection={(item) => {
            setPartiesData((prev) => ({
              ...prev,
              consignee: {
                ...prev.consignee,
                name: item.name,
                address: item.address,
              },
            }));
          }}
        />

        <NAOutlinedTextField
          className="flex-1"
          label="Address"
          placeholder="Address (State Name, City, State & Zip Code, Country Name)"
          value={partiesData.consignee.address}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              consignee: {
                ...prev.consignee,
                address: value,
              },
            }));
          }}
        />
      </div>
      <SubTitle title="Actual" className="mt-8 mb-4" />
      <NAOutlinedTextField
        label="Shipper Name"
        value={partiesData.actualShipper}
        handleValueChange={(value) => {
          setPartiesData((prev) => ({
            ...prev,
            actualShipper: value,
          }));
        }}
      />
      <MdFilledButton
        className="self-end mt-4"
        onClick={() => moveToCargoStep()}
      >
        Next
      </MdFilledButton>
    </div>
  );
}
