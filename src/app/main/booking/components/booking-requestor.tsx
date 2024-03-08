import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";

export default function BookingRequestorSection({
  hasEdit,
}: {
  hasEdit?: boolean;
}) {
  return (
    <Section title="Booking Requestor" hasEdit={hasEdit}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Name
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Cell Phone
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          010-1234-5678
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Fax
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          02-1234-5678
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Email
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          Test@cyberlogitec.com
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Address
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          dldldldldldddddddddddddddddd
        </MdTypography>
      </div>
    </Section>
  );
}
