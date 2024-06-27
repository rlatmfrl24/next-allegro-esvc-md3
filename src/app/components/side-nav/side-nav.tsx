"use client";

import { MdFilledIconButton, MdIcon, MdIconButton } from "@/app/util/md3";
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import NavOverlay from "./nav-overlay";
import { DrawerState, UserState } from "@/app/store/global.store";
import MenuIcon from "@mui/icons-material/Menu";
import { DropdownMenu } from "./nav-dropdown";
import { ClassOutlined, Favorite, MapOutlined } from "@mui/icons-material";
import { CSSProperties, useEffect } from "react";
import { MenuIconButton } from "./menu-button";
import path from "path";

export default function SideNavigation() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useRecoilState(DrawerState);
  const [userData] = useRecoilState(UserState);
  const router = useRouter();

  function handleDrawer() {
    setDrawer({
      ...drawer,
      isNavOpen: !drawer.isNavOpen,
    });
  }

  return (
    <>
      <aside
        className={`flex items-center flex-col py-3
      ${
        pathname.split("/").includes("main") && userData.isAuthenticated
          ? "w-20 visible"
          : "w-0 invisible"
      }`}
      >
        <MdFilledIconButton aria-label="drawer-toggler" onClick={handleDrawer}>
          <MdIcon>
            <MenuIcon />
          </MdIcon>
        </MdFilledIconButton>
        <div className="flex flex-col mt-3 gap-5 h-full">
          <DropdownMenu />
          <div className="flex-1"></div>
          <MenuIconButton
            icon={<Favorite />}
            isSelected={drawer.isFavoriteOpen}
            onClick={() => {
              setDrawer({
                ...drawer,
                isFavoriteOpen: !drawer.isFavoriteOpen,
              });
            }}
          />
          <MenuIconButton
            icon={<ClassOutlined />}
            isSelected={pathname === "/main/guide"}
            onClick={() => {
              router.push("/main/guide");
            }}
          />
          <MenuIconButton
            icon={<MapOutlined />}
            isSelected={pathname === "/main/sitemap"}
            onClick={() => {
              router.push("/main/sitemap");
            }}
          />
        </div>
      </aside>
      <AnimatePresence>
        {drawer.isNavOpen && <NavOverlay handleDrawer={handleDrawer} />}
      </AnimatePresence>
    </>
  );
}
