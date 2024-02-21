import { PresetListState } from "@/app/store/ptp.store";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdTextButton,
} from "@/app/util/md3";
import { useState } from "react";
import { useRecoilState } from "recoil";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function PresetScheduleDialog({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
}) {
  const [presetList, setPresetList] = useRecoilState(PresetListState);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view");

  return (
    <MdDialog
      className="w-[720px]"
      open={open}
      closed={() => {
        handleOpen(false);
        setMode("view");
      }}
    >
      <div slot="headline">
        {
          {
            view: "Preset Schedule",
            edit: "Edit Schedule",
            delete: "Are you sure you want to delete this preset?",
          }[mode]
        }
      </div>
      <div slot="content">
        {
          {
            view: (
              <MdList className="bg-surfaceContainerHigh">
                {presetList.map((preset) => {
                  return (
                    <MdListItem
                      key={preset.id}
                      className="relative hover:bg-surfaceDim cursor-pointer "
                      onClick={() => {
                        console.log(preset);
                        handleOpen(false);
                      }}
                      onMouseEnter={(e) => {
                        setActiveIndex(presetList.indexOf(preset));
                      }}
                      onMouseLeave={() => {
                        setActiveIndex(-1);
                      }}
                    >
                      <div slot="headline">
                        {preset.name}
                        {activeIndex === presetList.indexOf(preset) && (
                          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-1">
                            <MdIconButton
                              className="bg-secondaryContainer rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("delete");
                                setMode("delete");
                              }}
                            >
                              <MdIcon>
                                <DeleteOutlineOutlinedIcon />
                              </MdIcon>
                            </MdIconButton>
                            <MdIconButton
                              className="bg-secondaryContainer rounded-full z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("edit");
                                setMode("edit");
                              }}
                            >
                              <MdIcon>
                                <ModeEditOutlineOutlinedIcon />
                              </MdIcon>
                            </MdIconButton>
                          </div>
                        )}
                      </div>
                      <div slot="trailing-supporting-text">
                        {preset.createDateTime.toLocaleString()}
                      </div>

                      <MdIcon slot="end">
                        {preset.useMailingService && <FavoriteBorderIcon />}
                      </MdIcon>
                    </MdListItem>
                  );
                })}
              </MdList>
            ),
            edit: <></>,
            delete: <>{<span>{presetList[activeIndex]?.name}</span>}</>,
          }[mode]
        }
      </div>

      <div slot="actions">
        {
          {
            view: (
              <MdTextButton
                onClick={() => {
                  handleOpen(false);
                }}
              >
                Close
              </MdTextButton>
            ),
            edit: (
              <MdTextButton
                onClick={() => {
                  setMode("view");
                }}
              >
                Cancel
              </MdTextButton>
            ),
            delete: (
              <>
                <MdTextButton
                  onClick={() => {
                    setMode("view");
                  }}
                >
                  Cancel
                </MdTextButton>
                <MdFilledButton
                  onClick={() => {
                    setPresetList(
                      presetList.filter((_, i) => i !== activeIndex)
                    );
                    setMode("view");
                  }}
                >
                  Delete
                </MdFilledButton>
              </>
            ),
          }[mode]
        }
      </div>
    </MdDialog>
  );
}
