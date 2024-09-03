import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import {
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdSwitch,
} from "@/app/util/md3";
import { cardList } from "../../util/constants";
import { useRecoilState } from "recoil";
import { dashboardCardState } from "../../store/dashboard.store";
import { DividerComponent } from "@/app/components/divider";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useEffect, useRef } from "react";

export default function SetDashboard(props: {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) {
  const [enabledCardIds, setEnabledCardIds] =
    useRecoilState(dashboardCardState);
  const drawerRef = useRef<HTMLDivElement>(null);

  // close drawer when click outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        props.toggleDrawer();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef, props]);

  return (
    <Portal selector="#main-container">
      <AnimatePresence>
        {props.isDrawerOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="absolute right-0 top-0 w-[360px] h-full bg-white z-10 flex flex-col border-l border-surfaceVariant"
          >
            <div className="flex items-center px-6 py-5">
              <MdTypography variant="title" size="large" className="flex-1 ">
                Setting
              </MdTypography>
            </div>

            <div className="flex flex-col flex-1">
              {cardList.map((item) => (
                <div key={item.id} className="h-12 flex items-center px-6">
                  <MdTypography variant="body" size="large" className="flex-1">
                    {item.title}
                  </MdTypography>
                  <MdIconButton
                    onClick={() => {
                      if (enabledCardIds.includes(item.id)) {
                        setEnabledCardIds(
                          enabledCardIds.filter((id) => id !== item.id)
                        );
                      } else {
                        setEnabledCardIds([...enabledCardIds, item.id]);
                      }
                    }}
                  >
                    <MdIcon>
                      {enabledCardIds.includes(item.id) ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </MdIcon>
                  </MdIconButton>
                </div>
              ))}
            </div>
            <DividerComponent />
            <div className="m-4 text-right">
              <MdOutlinedButton className="w-fit" onClick={props.toggleDrawer}>
                Close
              </MdOutlinedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
