import { MdTypography } from "@/app/components/typography";
import { SubTitle } from "./components";
import {
  MdChipSet,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";

export default function EtcStep() {
  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Attachment & Special Instruction & Duplicate Bookings
      </MdTypography>
      <SubTitle title="Attachment" className="mb-4 mt-6" />
      <div className="flex gap-4">
        <MdOutlinedButton>File Upload</MdOutlinedButton>
        <MdChipSet>
          <MdInputChip label="list.txt" selected />
          <MdInputChip label="image.jpg" selected />
        </MdChipSet>
      </div>
      <SubTitle title="Special Instruction" className="mb-4 mt-6" />
      <MdOutlinedTextField
        type="textarea"
        className="resize-y"
        rows={3}
        placeholder="Special Instruction on Booking"
      />
    </div>
  );
}
