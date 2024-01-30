import { MdOutlinedButton } from "@/app/util/md3";
import AttachmentPlaceholder from "@/../public/img_attachment_placeholder.svg";

export default function QuickAttachment() {
  return (
    <div className="flex flex-col items-center">
      <AttachmentPlaceholder className="my-4" />
      <MdOutlinedButton className="w-full">Add Quick Link</MdOutlinedButton>
    </div>
  );
}
