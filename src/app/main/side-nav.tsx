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

// TODO: 추후에 API로 받아올 예정
const meunItems: MenuItemType[] = [
  {
    name: "Dashboard",
    children: [],
    isLeaf: true,
  },
  {
    name: "Schedule",
    children: [
      {
        name: "Point to Point Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "Vessel Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "Port Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "Long Range Schedule",
        children: [],
        isLeaf: true,
      },
      {
        name: "My Schedule",
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    name: "Booking",
    children: [
      {
        name: "Booking Request",
        children: [],
        isLeaf: true,
      },
      {
        name: "Booking Status",
        children: [],
        isLeaf: true,
      },
      {
        name: "Booking Template",
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    name: "Documentation",
    children: [
      {
        name: "Shipping Instruction",
        children: [
          {
            name: "SI Submission & Amendment",
            children: [],
            isLeaf: true,
          },
          {
            name: "SI Template",
            children: [],
            isLeaf: true,
          },
        ],
        isLeaf: false,
      },
      {
        name: "B/L Processing",
        children: [
          {
            name: "Draft N/N B/L",
            children: [],
            isLeaf: true,
          },
          {
            name: "Sea Waybill Print",
            children: [],
            isLeaf: true,
          },
        ],
        isLeaf: false,
      },
    ],
    isLeaf: false,
  },
  {
    name: "Tracking",
    children: [
      {
        name: "Cargo Tracking",
        children: [],
        isLeaf: true,
      },
    ],
    isLeaf: false,
  },
  {
    name: "Manage Shipment",
    children: [
      {
        name: "Shipment Overview",
        children: [],
        isLeaf: true,
      },
    ],
    isLeaf: false,
  },
];

export default function SideNav() {
  return (
    <>
      <MdTypography variant="title" size="small" className="px-4 py-2 mb-5">
        Menu
      </MdTypography>
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
