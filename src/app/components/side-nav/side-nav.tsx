"use client";

import { meunItems } from "@/app/util/constants";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import NavOverlay from "./nav-overlay";
import { DrawerState } from "@/app/store";
import MenuIcon from "@mui/icons-material/Menu";
import PlaceholdeIcon from "@/../public/icon_tracking_outlined.svg";
import { FloatingNode, FloatingTree } from "@floating-ui/react";
import { Menu, MenuItem } from "./dropdown-menu";

export default function SideNavigation() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useRecoilState(DrawerState);

  function handleDrawer() {
    setDrawer({
      open: !drawer.open,
    });
  }

  return (
    <>
      <aside
        className={`flex items-center flex-col py-3
      ${
        pathname.split("/").includes("main") ? "w-20 visible" : "w-0 invisible"
      }`}
      >
        <MdIconButton
          aria-label="drawer-toggler"
          onClick={() => handleDrawer()}
        >
          <MdIcon>
            <MenuIcon />
          </MdIcon>
        </MdIconButton>
        <div className="flex flex-col mt-10 gap-5">
          {/* {meunItems.map((item) => (
            <MdIconButton
              key={item.id}
              className={
                item.link && pathname.split("/").includes(item.link)
                  ? "bg-secondaryContainer rounded-full"
                  : ""
              }
            >
              <MdIcon>
                <PlaceholdeIcon />
              </MdIcon>
            </MdIconButton>
          ))} */}
        </div>
      </aside>
      <AnimatePresence>
        {drawer.open && <NavOverlay handleDrawer={handleDrawer} />}
      </AnimatePresence>
    </>
  );
}
