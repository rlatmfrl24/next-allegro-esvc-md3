import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { MdChipSet } from "@/app/util/md3";

export default function AttachmentSection({ hasEdit }: { hasEdit?: boolean }) {
  return (
    <Section title="Attachment & Special Instruction" hasEdit={hasEdit}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Attachment
        </MdTypography>
        <MdChipSet></MdChipSet>
        <MdTypography variant="body" size="medium" className="text-outline">
          Special Instruction
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          John Doe
        </MdTypography>
      </div>
    </Section>
  );
}
