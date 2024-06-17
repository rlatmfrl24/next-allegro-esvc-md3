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
import { DividerComponent } from "@/app/components/divider";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import { UserProfileState } from "@/app/store/global.store";

export default function PartiesStep() {
  // const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
    BookingRequestStepState
  );
  const [partiesData, setPartiesData] = useRecoilState(PartiesState);

  const [userData] = useRecoilState(UserProfileState);
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
        visited: true,
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
      <SubTitle title="Person Placing Request" className="mb-4" />
      <SimpleRadioGroup
        groupName="person-placing-request"
        selected={partiesData.placeOfReceipt}
        options={["Shipper", "Forwarder"]}
        onChange={(value) => {
          if (value === "Shipper") {
            setPartiesData((prev) => ({
              ...prev,
              placeOfReceipt: value as "Shipper" | "Forwarder",
              shipper: {
                name: userData.companyName,
                address:
                  userData.address.street +
                  ", " +
                  userData.address.city +
                  ", " +
                  userData.address.country +
                  ", " +
                  userData.address.zipCode,
              },
              freightForwarder: {
                name: "",
                address: "",
              },
            }));
          } else {
            setPartiesData((prev) => ({
              ...prev,
              placeOfReceipt: value as "Shipper" | "Forwarder",
              shipper: {
                name: "",
                address: "",
              },
              freightForwarder: {
                name: userData.companyName,
                address:
                  userData.address.street +
                  ", " +
                  userData.address.city +
                  ", " +
                  userData.address.country +
                  ", " +
                  userData.address.zipCode,
              },
            }));
          }
        }}
      />
      <DividerComponent className="my-6" />
      <SubTitle title="Shipper" className="mb-4" />
      <div className="flex gap-4">
        <NAMultiAutoComplete
          label="Company Name"
          itemList={tempCompaniesData}
          required
          maxLength={70}
          error={
            bookingRequestStep.parties.visited &&
            partiesData.shipper.name === ""
          }
          errorText="Company Name is required"
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
          maxLength={105}
          placeholder="Address (State Name, City, State & Zip Code, Country Name)"
          required
          error={
            bookingRequestStep.parties.visited &&
            partiesData.shipper.address === ""
          }
          errorText="Address is required"
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
      <div className="flex gap-4 items-start">
        <NAMultiAutoComplete
          label="Company Name"
          maxLength={70}
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
          maxLength={105}
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
          className="mt-4"
          label="Same as Shipper"
          state={
            partiesData.shipper.name === "" &&
            partiesData.shipper.address === ""
              ? "disabled"
              : partiesData.freightForwarder.name ===
                  partiesData.shipper.name &&
                partiesData.freightForwarder.address ===
                  partiesData.shipper.address
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
          maxLength={70}
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
          maxLength={105}
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
        maxLength={105}
        value={partiesData.actualShipper}
        handleValueChange={(value) => {
          setPartiesData((prev) => ({
            ...prev,
            actualShipper: value,
          }));
        }}
      />
      <div className="flex-1 flex justify-end items-end">
        <MdFilledButton
          className="self-end mt-4"
          onClick={() => moveToCargoStep()}
        >
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
