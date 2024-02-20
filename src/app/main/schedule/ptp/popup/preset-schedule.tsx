import { PresetListState } from "@/app/store/ptp.store";
import { MdDialog, MdTextButton } from "@/app/util/md3";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function PresetScheduleDialog({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
}) {
  const [presetList, setPresetList] = useRecoilState(PresetListState);
  const [isTestOpen, setIsTestOpen] = useState(false);

  return (
    <MdDialog
      className="w-[720px]"
      open={open}
      closed={() => {
        handleOpen(false);
      }}
    >
      <div slot="headline">Preset Schedule</div>
      <div slot="content">
        <AnimatePresence>
          {isTestOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {presetList.map((preset, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center"
                  >
                    <div>{preset.name}</div>
                    <div>
                      {preset.condition.startDate.toFormat("yyyy-MM-dd")}
                    </div>
                    <div>{preset.condition.endDate.toFormat("yyyy-MM-dd")}</div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div slot="actions">
        <MdTextButton
          onClick={() => {
            setIsTestOpen(!isTestOpen);
          }}
        >
          Test
        </MdTextButton>
        <MdTextButton
          onClick={() => {
            handleOpen(false);
          }}
        >
          Close
        </MdTextButton>
      </div>
    </MdDialog>
  );
}
