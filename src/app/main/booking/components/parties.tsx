import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";

export default function PartiesSection({ hasEdit }: { hasEdit?: boolean }) {
  return (
    <Section title="Parties" hasEdit={hasEdit}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Shipper
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          Cyberlogitec
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Freight Forwarder
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Consignee
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          Jane Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Actual Shipper
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
      </div>
    </Section>
  );
}
