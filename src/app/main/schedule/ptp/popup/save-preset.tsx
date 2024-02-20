import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdDialog, MdFilledButton, MdTextButton } from "@/app/util/md3";
import { useState } from "react";
import NaToggleButton from "@/app/components/na-toggle-button";

export default function SavePreset({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
}) {
  const [isMailingServiceToggled, setIsMailingServiceToggled] = useState(false);

  return (
    <MdDialog
      className="w-[560px]"
      open={open}
      closed={() => {
        handleOpen(false);
      }}
    >
      <div slot="headline">Save Preset</div>
      <div slot="content" className="flex flex-1 flex-col gap-2">
        <NAOutlinedTextField label="Preset Name" className="flex-1 my-2" />
        <NaToggleButton
          label="Mailing Service"
          state={isMailingServiceToggled ? "checked" : "unchecked"}
          onChange={(state) => {
            setIsMailingServiceToggled(state === "checked");
          }}
        />
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            handleOpen(false);
          }}
        >
          Close
        </MdTextButton>
        <MdFilledButton>Save</MdFilledButton>
      </div>
    </MdDialog>
  );
}
