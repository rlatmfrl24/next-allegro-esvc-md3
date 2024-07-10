import { BookingStatus } from "@/app/util/typeDef/booking";
import BookingStatusChip from "../../status/components/booking-status-chip";
import { MdTypography } from "@/app/components/typography";

export default function RequestNumberSection({
  title = "Booking Request No.",
  bookingStatus,
  requestNumber,
}: {
  bookingStatus: BookingStatus | undefined;
  requestNumber: string;
  title?: string;
}) {
  return (
    <div className="flex justify-center items-center flex-col mx-6 gap-2 py-4">
      <div className="flex gap-4 items-center">
        {bookingStatus && <BookingStatusChip status={bookingStatus} />}
        <MdTypography variant="title" size="large" className="text-outline">
          {title}
          <span className="text-primary ml-2">{requestNumber}</span>
        </MdTypography>
      </div>
    </div>
  );
}
