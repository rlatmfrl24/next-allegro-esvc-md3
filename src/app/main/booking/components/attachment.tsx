import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { MdChipSet } from "@/app/util/md3";
import { Label } from "recharts";
import LabelChip from "@/app/components/label-chip";

export default function AttachmentSection({
  files,
  specialInstruction,
  hasEdit,
}: {
  hasEdit?: boolean;
  files: File[];
  specialInstruction: string;
}) {
  return (
    <Section title="Attachment & Special Instruction" hasEdit={hasEdit}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Attachment
        </MdTypography>
        <MdChipSet>
          {files.map((file, index) => (
            <LabelChip key={index} label={file.name} />
          ))}
        </MdChipSet>
        <MdTypography variant="body" size="medium" className="text-outline">
          Special Instruction
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {specialInstruction}
        </MdTypography>
      </div>
    </Section>
  );
}
