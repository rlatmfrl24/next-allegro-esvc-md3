import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import { MdTypography } from "../typography";

export default function QuickInquiry(props: {
  description?: string;
  placeholder?: string;
  buttonText: string;
}) {
  return (
    <div className="px-6 pb-6 flex flex-col gap-4 ">
      <MdTypography variant="body" size="medium" className="mt-4">
        {props.description}
      </MdTypography>
      <MdOutlinedTextField className="flex-1" label={props.placeholder} />
      <MdFilledButton className="w-fit self-end">
        {props.buttonText}
      </MdFilledButton>
    </div>
  );
}
