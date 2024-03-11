import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { MdChipSet } from "@/app/util/md3";
import LabelChip from "@/app/components/label-chip";
import { ContactInformationType } from "@/app/util/typeDef";

export default function ContactInformationSection({
  data,
  hasEdit,
}: {
  data: ContactInformationType;
  hasEdit?: boolean;
}) {
  return (
    <Section title="Contact Information" hasEdit={hasEdit}>
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
          {data.email.map((email, index) => (
            <LabelChip key={index} label={email} />
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
