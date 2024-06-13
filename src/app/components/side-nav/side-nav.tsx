"use client";

import { MdIcon, MdIconButton } from "@/app/util/md3";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import NavOverlay from "./nav-overlay";
import { DrawerState } from "@/app/store/global.store";
import MenuIcon from "@mui/icons-material/Menu";
import { DropdownMenu } from "./nav-dropdown";
import {
  Class,
  ClassOutlined,
  Favorite,
  Map,
  MapOutlined,
} from "@mui/icons-material";

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
        <MdIconButton aria-label="drawer-toggler" onClick={handleDrawer}>
          <MdIcon>
            <MenuIcon />
          </MdIcon>
        </MdIconButton>
        <div className="flex flex-col mt-3 gap-5 h-full">
          <DropdownMenu />
          <div className="flex-1"></div>
          <MdIconButton>
            <MdIcon>
              <Favorite />
            </MdIcon>
          </MdIconButton>
          <MdIconButton>
            <MdIcon>
              <ClassOutlined />
            </MdIcon>
          </MdIconButton>
          <MdIconButton>
            <MdIcon>
              <MapOutlined />
            </MdIcon>
          </MdIconButton>
        </div>
      </aside>
      <AnimatePresence>
        {drawer.open && <NavOverlay handleDrawer={handleDrawer} />}
      </AnimatePresence>
    </>
  );
}
