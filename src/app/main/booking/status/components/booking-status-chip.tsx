import { MdTypography } from "@/app/components/typography";
import { BookingStatus } from "@/app/util/typeDef";

export default function BookingStatusChip({
  status,
}: {
  status: BookingStatus;
}) {
  return (
    <MdTypography
      variant="label"
      size="medium"
      className={`px-2 py-1 rounded-lg whitespace-nowrap m-2 w-fit ${
        {
          Requested: "bg-surfaceContainerHigh text-onSurface",
          "Change Requested": "bg-surfaceContainerHigh text-onSurface",
          "Cancel Requested": "bg-surfaceContainerHigh text-onSurface",
          Cancelled: "bg-surfaceContainerHigh",
          Accepted: "bg-extendGoodContainer text-extendOnGoodContainer",
          Rejected: "bg-errorContainer text-onErrorContainer",
          Pending: "bg-extendPendingContainer text-extendOnPendingContainer",
        }[status]
      }`}
    >
      {status}
    </MdTypography>
  );
}
