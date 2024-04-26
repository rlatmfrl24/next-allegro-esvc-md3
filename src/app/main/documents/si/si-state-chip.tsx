import { MdTypography } from "@/app/components/typography";
import { SIState } from "@/app/util/typeDef/si";

export default function SIStateChip({ state }: { state: SIState }) {
  return (
    <MdTypography
      variant="label"
      size="medium"
      className={`px-2 py-1 text-left rounded-lg w-fit ${
        {
          None: "bg-surfaceContainerHigh text-onSurface",
          "Temporary Saved": "bg-surfaceContainerHigh text-onSurface",
          Submit: "bg-surfaceContainerHigh text-onSurface",
          "Change Requested": "bg-surfaceContainerHigh text-onSurface",
          "Change Requested Rejected":
            "bg-errorContainer text-onErrorContainer",
          Confirmed: "bg-extendGoodContainer text-extendOnGoodContainer",
          Rejected: "bg-errorContainer text-onErrorContainer",
          Pending: "bg-extendPendingContainer text-extendOnPendingContainer",
          "B/L Issue Request": "bg-primaryContainer text-onSurface",
          "B/L Issue Confirm": "bg-primaryContainer text-extendOnGoodContainer",
          "B/L Issue Rejected": "bg-primaryContainer text-onErrorContainer",
          "B/L Issue Pending":
            "bg-primaryContainer text-extendOnPendingContainer",
          "B/L Issue Closed": "bg-primaryContainer text-onSurface",
        }[state]
      }`}
    >
      {state}
    </MdTypography>
  );
}
