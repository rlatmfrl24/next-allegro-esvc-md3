import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { useCallback, useEffect } from "react";
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

  const ValidateRequired = useCallback(() => {
    if (
      contactInformationData.name === "" ||
      contactInformationData.address === "" ||
      contactInformationData.telNo === "" ||
      contactInformationData.email === ""
    ) {
      return false;
    } else {
      return true;
    }
  }, [contactInformationData]);

  useEffect(() => {
    if (ValidateRequired()) {
      setBookingRequestStep((prev) => ({
        ...prev,
        contactInformation: {
          ...prev.contactInformation,
          isCompleted: true,
        },
      }));
    } else {
      setBookingRequestStep((prev) => ({
        ...prev,
        contactInformation: {
          ...prev.contactInformation,
          isCompleted: false,
        },
      }));
    }
  }, [ValidateRequired, contactInformationData, setBookingRequestStep]);

  return (
    <div className="w-full">
      <MdTypography variant="title" size="large" className="mb-6">
        Contact Information
      </MdTypography>
      <div className="grid grid-cols-2 gap-4 w-full">
        <NAOutlinedTextField
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.name === ""
          }
          errorText="Name is required"
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
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.email === ""
          }
          errorText="Email is required"
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
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.telNo === ""
          }
          errorText="Tel No. is required"
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
          required
          error={
            bookingRequestStep.contactInformation.visited &&
            contactInformationData.address === ""
          }
          errorText="Address is required"
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
