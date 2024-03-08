import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";

export default function CargoSection({ hasEdit }: { hasEdit?: boolean }) {
  return (
    <Section title="Cargo" hasEdit={hasEdit}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Commodty
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          Cyberlogitec
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Total Estimated Gross Weight
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Empty Pick Up Date
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          Jane Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Empty Pick Up CY/Depot (Prefered)
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Full Cargo Return Date
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Full Container Return CY
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
      </div>
    </Section>
  );
}
