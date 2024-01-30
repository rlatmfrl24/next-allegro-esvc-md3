import { MdOutlinedTextField } from "@/app/util/md3";
import { MdTypography } from "../typography";

export default function QuickTracking(props: { rows?: number }) {
  return (
    <>
      <MdTypography variant="body" size="medium">
        {`It's fast and easy to track your shipment.`}
      </MdTypography>
      <MdOutlinedTextField
        label=""
        placeholder="B/Ls, Bookings and/or Container numbers"
        supportingText="Enter up to 10 numbers, separately by a space or comma."
        type="textarea"
        className="resize-none"
        rows={props.rows ?? 5}
      />
    </>
  );
}
