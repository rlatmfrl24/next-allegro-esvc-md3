import { MdDialog, MdFilledButton, MdOutlinedButton } from "@/app/util/md3";
import { Dispatch, SetStateAction } from "react";

export const SummaryDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
    >
      <div slot="headline">Visibility Summary</div>
      <div slot="content"></div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const EventDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
    >
      <div slot="headline">Event Notification</div>
      <div slot="content"></div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const VesselDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
    >
      <div slot="headline">Vessel Schedule Updates</div>
      <div slot="content"></div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
