"use client";

import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { MdIcon, MdIconButton } from "./util/md3";
import { meunItems } from "./util/constants";
import PlaceholdeIcon from "@/../public/icon_tracking_outlined.svg";
import Portal from "./components/portal";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { DrawerState } from "./store";

export default function SideNavigation() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useRecoilState(DrawerState);

  return (
    <>
      <aside
        className={`flex items-center flex-col py-3
    ${pathname.split("/").includes("main") ? "w-20" : "w-0"}`}
      >
        <MdIconButton
          onClick={() => {
            setDrawer({
              open: true,
            });
          }}
        >
          <MdIcon>
            <MenuIcon />
          </MdIcon>
        </MdIconButton>
        <div className="flex flex-col mt-10 gap-5">
          {meunItems.map((item) => (
            <MdIconButton key={item.name}>
              <MdIcon>
                <PlaceholdeIcon />
              </MdIcon>
            </MdIconButton>
          ))}
        </div>
      </aside>
      <AnimatePresence>
        {drawer.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="overlay"
            className={`fixed h-screen w-screen bg-black bg-opacity-50 z-40 `}
            onClick={() =>
              setDrawer({
                open: false,
              })
            }
          ></motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ x: drawer.open ? 0 : -360 }}
        transition={{ type: "spring", bounce: 0, duration: 0.25 }}
        className="fixed h-screen w-[360px] bg-surface z-50 rounded-r-2xl"
      >
        TEST
      </motion.div>
    </>
  );
}
