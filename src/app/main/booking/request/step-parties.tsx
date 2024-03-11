import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import { MdFilledButton } from "@/app/util/md3";
import { SubTitle } from "./components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  BookingRequestStepState,
  PartiesState,
} from "@/app/store/booking-request.store";
import { useCallback, useEffect } from "react";

export default function PartiesStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [partiesData, setPartiesData] = useRecoilState(PartiesState);

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
    console.log(partiesData);
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
        <NAOutlinedTextField
          label="Company Name"
          required
          value={partiesData.shipper.name}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              shipper: {
                ...prev.shipper,
                name: value,
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
        <NAOutlinedTextField
          label="Company Name"
          value={partiesData.freightForwarder.name}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                name: value,
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
            partiesData.freightForwarder.address ===
              partiesData.shipper.address &&
            partiesData.freightForwarder.name === partiesData.shipper.name
              ? "checked"
              : "unchecked"
          }
          onClick={() => {
            setPartiesData((prev) => ({
              ...prev,
              freightForwarder: {
                ...prev.freightForwarder,
                address: prev.shipper.address,
                name: prev.shipper.name,
              },
            }));
          }}
        />
      </div>
      <SubTitle title="Consignee" className="mt-8 mb-4" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Company Name"
          value={partiesData.consignee.name}
          handleValueChange={(value) => {
            setPartiesData((prev) => ({
              ...prev,
              consignee: {
                ...prev.consignee,
                name: value,
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
