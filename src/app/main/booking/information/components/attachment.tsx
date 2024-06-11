import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { MdChipSet } from "@/app/util/md3";
import LabelChip from "@/app/components/label-chip";
import { useSetRecoilState } from "recoil";
import { BookingRequestStepState } from "@/app/store/booking.store";
import { useRouter } from "next/navigation";

export default function AttachmentSection({
  file,
  specialInstruction,
  hasEdit,
}: {
  hasEdit?: boolean;
  file: File[];
  specialInstruction: string;
}) {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const router = useRouter();

  function moveToAdditionalInformationStep() {
    setBookingRequestStep((prev) => ({
      ...prev,
      additionalInformation: {
        ...prev.additionalInformation,
        isSelected: true,
      },
    }));
    router.push("/main/booking/request");
  }

  return (
    <Section
      title="Attachment & Special Instruction"
      hasEdit={hasEdit}
      editAction={() => {
        moveToAdditionalInformationStep();
      }}
    >
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Attachment
        </MdTypography>
        <MdChipSet>
          {file &&
            file.map((file, index) => (
              <LabelChip key={index} label={file.name} />
            ))}
        </MdChipSet>
        <MdTypography variant="body" size="medium" className="text-outline">
          Special Instruction
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {specialInstruction.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </MdTypography>
      </div>
    </Section>
  );
}
