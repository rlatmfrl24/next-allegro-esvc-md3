"use client";

import { MdTypography } from "../components/typography";
import { MdRippleEffect } from "../util/md3";
import { MenuItemType } from "../util/typeDef";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useRecoilState } from "recoil";
import { currentPathState } from "./store";
import styles from "./main.module.css";
import { meunItems } from "./constants";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function SideNav() {
  return (
    <>
      <MdTypography
        variant="title"
        size="small"
        className="px-7 pt-5 mb-5 text-primary"
      >
        Menu
      </MdTypography>
      <OverlayScrollbarsComponent
        className="flex-auto h-0 overflow-auto p-3 flex flex-col"
        defer
      >
        {meunItems.map((item, index) => {
          return (
            <NavItem
              depth={1}
              key={index}
              variant="primary"
              path={[item.name]}
              label={item.name}
              childs={item.children}
              isLeaf={item.isLeaf}
            />
          );
        })}
      </OverlayScrollbarsComponent>
    </>
  );
}

const NavItem = ({
  variant,
  label,
  depth,
  path,
  childs,
  isLeaf,
  className,
}: Readonly<{
  variant: "primary" | "secondary";
  depth: number;
  label: string;
  path: string[];
  childs: MenuItemType[];
  isLeaf?: boolean;
  className?: string;
}>) => {
  const cx = classNames.bind(styles);
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useRecoilState(currentPathState);

  return (
    <>
      <div
        className={cx(
          styles["navItem"],
          variant === "primary" && styles["primary"],
          variant === "secondary" && styles["secondary"],
          currentPath[depth - 1] === label && styles["selected"],
          className
        )}
        onClick={() => {
          if (isLeaf) {
            setCurrentPath(path);
          } else {
            setOpen(!open);
          }
        }}
      >
        <MdRippleEffect />
        <MdTypography
          variant="label"
          size="large"
          className="text-onSecondaryContainer flex-1"
        >
          {label}
        </MdTypography>
        {!isLeaf && (
          <ArrowDropDownOutlinedIcon
            className={`text-primary ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>
      {
        <AnimatePresence>
          {open && (
            <motion.div
              className="pl-5 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {childs.map((item, index) => {
                return (
                  <NavItem
                    depth={depth + 1}
                    key={index}
                    variant="secondary"
                    path={[...path, item.name]}
                    label={item.name}
                    childs={item.children}
                    isLeaf={item.isLeaf}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      }
    </>
  );
};
