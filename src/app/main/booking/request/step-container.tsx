import { MdTypography } from "@/app/components/typography";
import { BookingRequestStepState } from "@/app/store/booking-request.store";
import { MdFilledButton } from "@/app/util/md3";
import { useSetRecoilState } from "recoil";

export default function ContainerStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);

  const moveToAdditionalInformationStep = () => {
    setBookingRequestStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isSelected: false,
      },
      additionalInformation: {
        ...prev.additionalInformation,
        isSelected: true,
      },
    }));
  };
  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large">
        Container
      </MdTypography>
      <div className="flex-1 flex items-end justify-end">
        <MdFilledButton onClick={() => moveToAdditionalInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
