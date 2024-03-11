import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { MdAssistChip, MdChipSet, MdFilterChip } from "@/app/util/md3";
import LabelChip from "@/app/components/label-chip";
import { BookingRequestorInterface } from "@/app/util/typeDef";

export default function BookingRequestorSection({
  data,
  hasEdit,
}: {
  data: BookingRequestorInterface;
  hasEdit?: boolean;
}) {
  return (
    <Section title="Booking Requestor" hasEdit={hasEdit}>
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
          {data.fax || "N/A"}
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
