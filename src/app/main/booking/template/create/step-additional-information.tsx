import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  AdditionalInformationState,
  BookingRequestStepState,
} from "@/app/store/booking.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";

export default function AdditionalInformationStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [AdditionalInformationData, setAdditionalInformationData] =
    useRecoilState(AdditionalInformationState);

  useEffect(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      additionalInformation: {
        ...prev.additionalInformation,
        isCompleted: true,
      },
    }));
  }, [setBookingRequestStep]);

  const moveToContactInformationStep = () => {
    setBookingRequestStep((prev) => ({
      ...prev,
      additionalInformation: {
        ...prev.additionalInformation,
        isSelected: false,
        visited: true,
      },
      contactInformation: {
        ...prev.contactInformation,
        isSelected: true,
      },
    }));
  };

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Additional Information
      </MdTypography>
      <div className="flex flex-col">
        <SubTitle title="Special Instruction" className="mb-4" />
        <MdOutlinedTextField
          type="textarea"
          className="resize-y"
          rows={5}
          placeholder="Special Instruction on Booking"
          value={AdditionalInformationData.specialInstruction}
          onInput={(e) => {
            setAdditionalInformationData((prev) => {
              return {
                ...prev,
                specialInstruction: e.currentTarget.value,
              };
            });
          }}
        />
      </div>

      <div className="flex-1 flex items-end justify-end">
        <MdFilledButton onClick={() => moveToContactInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
