import { MdDialog, MdFilledButton, MdTextButton } from "@/app/util/md3";
import { Dispatch, SetStateAction } from "react";

export const HandlingInstructionDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <MdDialog open={open} closed={() => onOpenChange(false)}>
      <div slot="headline">B/L Handling Instruction</div>
      <div slot="content"></div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Cancel
        </MdTextButton>
        <MdFilledButton>Save</MdFilledButton>
      </div>
    </MdDialog>
  );
};
