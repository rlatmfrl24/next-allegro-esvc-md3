import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import { MdTypography } from "../typography";

export default function QuickTracking() {
  return (
    <>
      <MdTypography variant="body" size="medium">
        {`It's fast and easy to track your shipment.`}
      </MdTypography>
      <MdOutlinedTextField
        label=""
        placeholder="B/Ls, Bookings or Container No."
      />
      <MdFilledButton className="w-fit self-end">Search</MdFilledButton>
    </>
  );
}
