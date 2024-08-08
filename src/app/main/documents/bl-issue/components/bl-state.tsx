import LabelChip from "@/app/components/label-chip";
import { MdIconButton } from "@/app/util/md3";
import { ManageSearch } from "@mui/icons-material";

export const BLStateCell = ({
  state,
}: {
  state: "Requested" | "Confirmed" | "Pending" | "Rejected";
}) => {
  return (
    <div className="flex gap-2 items-center">
      <LabelChip
        size="medium"
        label={state}
        className={
          state === "Requested"
            ? "bg-surfaceContainerHigh text-onSurface"
            : state === "Confirmed"
            ? "bg-extendGoodContainer text-extendOnGoodContainer"
            : state === "Pending"
            ? "bg-extendPendingContainer text-extendOnPendingContainer"
            : "bg-errorContainer text-error"
        }
      />
    </div>
  );
};
