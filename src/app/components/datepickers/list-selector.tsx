import { MdIcon, MdRippleEffect } from "@/app/util/md3";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { MdTypography } from "../typography";
import CheckIcon from "@mui/icons-material/Check";
import { motion } from "framer-motion";

export const ListSelector = ({
  list,
  selectedValue,
  selectionHandler,
}: {
  list: string[];
  selectedValue?: string;
  selectionHandler: (value: string) => void;
}) => {
  return (
    <OverlayScrollbarsComponent
      defer
      events={{
        initialized: (instance) => {
          // move to selected
          const selected = instance
            .elements()
            .viewport.querySelector(".bg-surfaceVariant");
          if (!selected) return;
          instance.elements().viewport.scroll({
            top: (selected as HTMLElement).offsetTop - 100,
          });
        },
      }}
    >
      <motion.div
        layout
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
        }}
        className="overflow-auto"
      >
        {list.map((value, index) => {
          return (
            <div
              key={index}
              className={`h-12 relative flex items-center ${
                selectedValue === value ? "bg-surfaceVariant" : ""
              }`}
              onClick={() => {
                selectionHandler(value);
              }}
            >
              <MdRippleEffect />
              {selectedValue === value && (
                <MdIcon className="absolute left-4">
                  <CheckIcon />
                </MdIcon>
              )}

              <MdTypography variant="body" size="medium" className={`pl-14`}>
                {value}
              </MdTypography>
            </div>
          );
        })}
      </motion.div>
    </OverlayScrollbarsComponent>
  );
};

export default ListSelector;
