import { MdDialog, MdFilledButton, MdOutlinedButton } from "@/app/util/md3";
import { Dispatch, SetStateAction } from "react";

export const ContractUpdateDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onRequestUpdate?: () => void;
}) => {
  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
    >
      <div slot="headline">Contract No. Update</div>
      <div slot="content"></div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onRequestUpdate && props.onRequestUpdate();
          }}
        >
          Request for Update
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
