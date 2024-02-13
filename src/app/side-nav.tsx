"use client";

import { usePathname, useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { MdIcon, MdIconButton, MdRippleEffect } from "./util/md3";
import { meunItems } from "./util/constants";
import PlaceholdeIcon from "@/../public/icon_tracking_outlined.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { DrawerState } from "./store";
import { MdTypography } from "./components/typography";
import { MenuItemType } from "./util/typeDef";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import classNames from "classnames";
import styles from "./styles/side-nav.module.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

export default function SideNavigation() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useRecoilState(DrawerState);

  const NavItem = ({
    item,
    depth,
    path,
    className,
  }: Readonly<{
    item: MenuItemType;
    depth: number;
    path: string[];
    className?: string;
  }>) => {
    const cx = classNames.bind(styles);
    const router = useRouter();
    const currentPath = usePathname().split("/");
    const [open, setOpen] = useState(currentPath.includes(path[depth - 1]));

    return (
      <>
        <div
          key={item.id}
          className={cx(
            styles.navItem,
            currentPath.includes(path[depth - 1]) && styles["selected"],
            className
          )}
          onClick={() => {
            if (item.subMenu && item.subMenu.length > 0) {
              setOpen(!open);
            } else {
              router.push("/main/" + path.join("/"));
              setDrawer({
                open: false,
              });
            }
          }}
        >
          <MdRippleEffect />
          {depth === 1 && (
            <MdIcon>
              <PlaceholdeIcon />
            </MdIcon>
          )}
          <MdTypography
            variant="label"
            size="large"
            prominent={currentPath.includes(path[depth - 1])}
            className={`flex-1 ${depth === 1 ? "" : "px-2"}`}
          >
            {item.name}
          </MdTypography>
          {item.subMenu && item.subMenu.length > 0 && (
            <ArrowDropDownOutlinedIcon
              className={`text-primary ${open ? "rotate-180" : ""}`}
            />
          )}
        </div>
        <AnimatePresence>
          {open && item.subMenu && (
            <motion.div
              className={`pl-4 overflow-hidden`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
                type: "spring",
                bounce: 0,
              }}
            >
              {item.subMenu &&
                item.subMenu.map((subItem) => (
                  <NavItem
                    item={subItem}
                    key={subItem.id}
                    depth={depth + 1}
                    path={subItem.link ? [...path, subItem.link] : path}
                  />
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

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
        className="fixed h-screen w-[360px] bg-surfaceContainerLow p-3 z-50 rounded-r-2xl flex flex-col overflow-y-auto"
      >
        <OverlayScrollbarsComponent defer>
          <MdTypography
            variant="title"
            size="small"
            className="h-14 px-3.5 items-center w-full flex"
          >
            Menu
          </MdTypography>
          {meunItems.map((item) => (
            <NavItem
              item={item}
              key={item.id}
              depth={1}
              path={[item.link || ""]}
            />
          ))}
        </OverlayScrollbarsComponent>
      </motion.div>
    </>
  );
}
