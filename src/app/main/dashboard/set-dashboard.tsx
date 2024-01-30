import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton, MdSwitch } from "@/app/util/md3";
import { cardList } from "../util";
import { useRecoilState } from "recoil";
import { dashboardCardState } from "../store";

export default function SetDashboard(props: {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) {
  const [enabledCardIds, setEnabledCardIds] =
    useRecoilState(dashboardCardState);

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

            <div className="flex flex-col">
              {cardList.map((item) => (
                <div key={item.id} className="h-12 flex items-center px-6">
                  <MdTypography variant="body" size="large" className="flex-1">
                    {item.title}
                  </MdTypography>
                  <MdSwitch
                    selected={enabledCardIds.includes(item.id)}
                    onClick={() => {
                      if (enabledCardIds.includes(item.id)) {
                        setEnabledCardIds(
                          enabledCardIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setEnabledCardIds([...enabledCardIds, item.id]);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
