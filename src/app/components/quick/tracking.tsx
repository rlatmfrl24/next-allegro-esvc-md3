import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import { MdTypography } from "../typography";
import Link from "next/link";

export default function QuickTracking() {
  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex flex-col flex-1">
        <MdTypography variant="body" size="medium">
          {`It's fast and easy to track your shipment.`}
        </MdTypography>
        <MdOutlinedTextField
          label=""
          placeholder="B/Ls, Bookings or Container No."
          type="textarea"
          className="resize-none h-full mb-2"
        />
      </div>
      <Link href="/main/tracking/cargo" className="self-end justify-self-end">
        <MdFilledButton className="w-fit ">Search</MdFilledButton>
      </Link>
    </div>
  );
}
