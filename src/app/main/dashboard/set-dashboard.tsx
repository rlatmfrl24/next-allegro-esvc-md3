import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton, MdOutlinedTextField } from "@/app/util/md3";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SetDashboard(props: {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) {
  return (
    <Portal selector="#main-container">
      <AnimatePresence>
        {props.isDrawerOpen && (
          <motion.div
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="absolute right-0 top-0 w-[360px] h-[calc(100%-2.5rem)] bg-white z-10 flex flex-col p-3 border-l border-surfaceVariant"
          >
            <div className="flex py-3 items-center">
              <MdTypography
                variant="title"
                size="large"
                className="flex-1 text-primary"
              >
                Set Dashboard
              </MdTypography>
              <MdIconButton onClick={props.toggleDrawer}>
                <MdIcon>
                  <CloseIcon />
                </MdIcon>
              </MdIconButton>
            </div>

            <MdOutlinedTextField placeholder="Search">
              <MdIcon slot="leading-icon">
                <SearchIcon />
              </MdIcon>
            </MdOutlinedTextField>

            <div className="flex items-center">
              <MdIcon className="h-12 w-12 flex items-center justify-center">
                <ArrowDropDownIcon />
              </MdIcon>
              <MdTypography variant="label" size="medium" className="flex-1">
                Dashboard Item
              </MdTypography>
              <MdTypography
                variant="label"
                size="medium"
                className="text-primary mx-8"
              >
                On/Off
              </MdTypography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
