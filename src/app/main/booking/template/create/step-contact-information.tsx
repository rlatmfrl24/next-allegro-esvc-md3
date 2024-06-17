import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { faker } from "@faker-js/faker";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import {
  BookingRequestStepState,
  ContactInformationState,
} from "@/app/store/booking.store";
import { UserProfileState } from "@/app/store/global.store";

export default function ContactInformationStep() {
  // const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
    BookingRequestStepState
  );
  const [contactInformationData, setContactInformationData] = useRecoilState(
    ContactInformationState
  );
  const [userData] = useRecoilState(UserProfileState);

  useEffect(() => {
    if (bookingRequestStep.contactInformation.visited) {
      return;
    }

    setContactInformationData((prev) => {
      return {
        ...prev,
        name:
          prev.name === ""
            ? userData.firstName + " " + userData.lastName
            : prev.name,
        email: prev.email === "" ? userData.email : prev.email,
        telNo: prev.telNo === "" ? userData.tel : prev.telNo,
        faxNo: prev.faxNo === "" ? userData.fax : prev.faxNo,
        address:
          prev.address === ""
            ? userData.address.street +
              ", " +
              userData.address.city +
              ", " +
              userData.address.country +
              ", " +
              userData.address.zipCode
            : prev.address,
      };
    });
  }, [
    bookingRequestStep.contactInformation.visited,
    setContactInformationData,
    userData.address.city,
    userData.address.country,
    userData.address.street,
    userData.address.zipCode,
    userData.email,
    userData.fax,
    userData.firstName,
    userData.lastName,
    userData.tel,
  ]);

  return (
    <div className="w-full">
      <MdTypography variant="title" size="large" className="mb-6">
        Contact Information
      </MdTypography>
      <div className="grid grid-cols-2 gap-4 w-full">
        <NAOutlinedTextField
          value={contactInformationData.name}
          label="Name"
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                name: value,
              };
            });
          }}
        />
        <NAOutlinedTextField
          value={contactInformationData.email}
          label="Email"
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                email: value,
              };
            });
          }}
        />

        <NAOutlinedTextField
          value={contactInformationData.telNo}
          label="Tel No."
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                telNo: value,
              };
            });
          }}
        />
        <NAOutlinedTextField
          value={contactInformationData.faxNo}
          label="Fax No."
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                faxNo: value,
              };
            });
          }}
        />
        <NAOutlinedTextField
          className="col-span-2"
          type="textarea"
          value={contactInformationData.address}
          label="Address"
          handleValueChange={(value) => {
            setContactInformationData((prev) => {
              return {
                ...prev,
                address: value,
              };
            });
          }}
        />
      </div>
    </div>
  );
}
