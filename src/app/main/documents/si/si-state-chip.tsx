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
          "B/L Issue Request":
            "bg-secondaryContainer text-onSecondaryContainer",
          "B/L Issue Confirm":
            "bg-secondaryContainer text-onSecondaryContainer",
          "B/L Issue Rejected":
            "bg-secondaryContainer text-onSecondaryContainer",
          "B/L Issue Pending":
            "bg-secondaryContainer text-onSecondaryContainer",
          "B/L Issue Closed": "bg-secondaryContainer text-onSecondaryContainer",
        }[state]
      }`}
    >
      {state}
    </MdTypography>
  );
}
