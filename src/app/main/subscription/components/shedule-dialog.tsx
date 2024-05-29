import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { DetailTitle, SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { InfoOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import { CycleSelector } from "./component";
import { DividerComponent } from "@/app/components/divider";
import { RemovableChip } from "@/app/components/removable-chip";

export const AddPtpScheduleDialog = (props: {
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
      <div slot="headline">Add Point to Point Schedule</div>
      <div slot="content"></div>
      <div slot="actions">
        <MdOutlinedButton>Cancel</MdOutlinedButton>
        <MdFilledButton>Save</MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const AddLongRangeScheduleDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onScheduleSave?: (data: any) => void;
}) => {
  const [recipients, setRecipients] = useState<string[]>([]);

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
        setRecipients([]);
      }}
      className="min-w-fit "
    >
      <div slot="headline">Add Long Range Schedule</div>
      <div slot="content" className="min-h-fit overflow-y-auto">
        <input className="h-0" autoFocus />
        <div className="flex gap-4 mb-6">
          <NAOutlinedListBox
            label="Origin"
            options={["ASIA", "EUROPE", "AMERICA", "AFRICA", "OCEANIA"]}
          />
          <NAOutlinedListBox
            label="Destination"
            options={["ASIA", "EUROPE", "AMERICA", "AFRICA", "OCEANIA"]}
          />
        </div>
        <SubTitle title="Notification Setting" className="mb-4" />
        <div className="border border-outline rounded-lg px-4 py-6">
          <MdTypography variant="body" size="medium" className="text-outline ">
            <InfoOutlined fontSize="small" className="mr-1" />
            To enter multiple values, separated by a comma or space.
          </MdTypography>
          <div className="flex gap-4 mt-4 relative">
            <CycleSelector />
            <DividerComponent orientation="vertical" />
            <div className="flex-1">
              <MdOutlinedTextField
                label="Recipients"
                className="w-full mb-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.currentTarget.value === "") {
                      return;
                    }
                    if (recipients.includes(e.currentTarget.value)) {
                      return;
                    }
                    setRecipients([...recipients, e.currentTarget.value]);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <MdChipSet>
                {recipients.map((recipient, index) => (
                  <RemovableChip
                    key={recipient}
                    label={recipient}
                    onRemove={() => {
                      setRecipients((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  />
                ))}
              </MdChipSet>
            </div>
          </div>
        </div>
      </div>
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
            props.onOpenChange(false);
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
