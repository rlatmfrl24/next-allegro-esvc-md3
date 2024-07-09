import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { MdChipSet } from "@/app/util/md3";
import LabelChip from "@/app/components/label-chip";
import { useSetRecoilState } from "recoil";
import { BookingRequestStepState } from "@/app/store/booking.store";
import { useRouter } from "next/navigation";
import { ContactInformationType } from "@/app/util/typeDef/booking";

export default function ContactInformationSection({
  data,
  hasEdit,
}: {
  data: ContactInformationType;
  hasEdit?: boolean;
}) {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const router = useRouter();

  function moveToContactInformationStep() {
    setBookingRequestStep((prev) => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        isSelected: true,
      },
    }));
    router.push("/main/booking/request");
  }

  return (
    <Section
      title="Contact Information"
      hasEdit={hasEdit}
      editAction={() => {
        moveToContactInformationStep();
      }}
    >
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Name
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.name}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Cell Phone
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.telNo}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Fax
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.faxNo || "N/A"}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Email
        </MdTypography>
        <MdChipSet>
          <LabelChip
            label={data.email}
            size="medium"
            className="bg-pointColor text-onSurface"
          />
          {data.emailRecipient.map((email, index) => (
            <LabelChip
              size="medium"
              key={index}
              label={email}
              className="bg-pointColor text-onSurface"
            />
          ))}
        </MdChipSet>
        <MdTypography variant="body" size="medium" className="text-outline">
          Address
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.address}
        </MdTypography>
      </div>
    </Section>
  );
}
