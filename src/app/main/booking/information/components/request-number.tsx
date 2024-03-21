import { BookingStatus } from "@/app/util/typeDef/boooking";
import BookingStatusChip from "../../status/components/booking-status-chip";
import { MdTypography } from "@/app/components/typography";

export default function RequestNumberSection({
  bookingStatus,
  requestNumber,
  specialInstruction,
}: {
  bookingStatus: BookingStatus;
  requestNumber: string;
  specialInstruction: string;
}) {
  return (
    <div className="flex justify-center items-center flex-col border-b border-outlineVariant mx-6 gap-2 pt-4 pb-4">
      <div className="flex gap-4 items-center">
        <BookingStatusChip status={bookingStatus} />
        <MdTypography
          variant="title"
          size="large"
          className="text-outlineVariant"
        >
          Booking Request No.
          <span className="text-primary ml-2">{requestNumber}</span>
        </MdTypography>
      </div>
      <MdTypography variant="body" size="medium" className="text-outline mt-2">
        Special Instruction on Booking
      </MdTypography>
      <MdTypography
        variant="body"
        size="medium"
        className="text-onSurface mb-4"
      >
        {specialInstruction || "-"}
      </MdTypography>
    </div>
  );
}
