import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdDialog, MdFilledButton, MdTextButton } from "@/app/util/md3";
import { useEffect, useState } from "react";
import NaToggleButton from "@/app/components/na-toggle-button";
import { SearchConditionProps } from "@/app/util/typeDef";
import { useRecoilState } from "recoil";
import { PresetListState } from "@/app/store/ptp.store";
import { faker } from "@faker-js/faker";

export default function SavePresetDialog({
  open,
  handleOpen,
  condition,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  condition: SearchConditionProps;
}) {
  const [isMailingServiceToggled, setIsMailingServiceToggled] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetList, setPresetList] = useRecoilState(PresetListState);

  useEffect(() => {
    if (open) {
      const defaultName = `${condition.origins
        .map((origin) => {
          return origin.split(",")[0];
        })
        .join(", ")} / ${condition.destinations
        .map((destination) => {
          return destination.split(",")[0];
        })
        .join(", ")}`;

      setPresetName(defaultName);
      setIsMailingServiceToggled(false);
    }
  }, [open, condition]);

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
        <NAOutlinedTextField
          label="Preset Name"
          className="flex-1 my-2"
          value={presetName}
          handleValueChange={(value) => {
            setPresetName(value);
          }}
        />
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
        <MdFilledButton
          onClick={() => {
            setPresetList([
              ...presetList,
              {
                id: faker.string.uuid(),
                name: presetName,
                condition: condition,
                useMailingService: isMailingServiceToggled,
              },
            ]);
            handleOpen(false);
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
}
