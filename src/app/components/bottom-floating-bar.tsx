import { AnimatePresence, motion } from "framer-motion";
import { MdElevation, MdFilledButton } from "../util/md3";
import { CSSProperties, Dispatch, SetStateAction } from "react";

export const BottomFloatingBar = (props: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={
            {
              "--md-elevation-level": 2,
            } as CSSProperties
          }
          className="fixed bottom-3 left-24 w-[calc(100%-7rem)] p-2 rounded-full flex justify-end bg-surfaceContainer z-10"
        >
          <MdElevation />
          {props.children}
          {/* <MdFilledButton onClick={() => props.onOpenChange(false)}>
            Save
          </MdFilledButton> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
