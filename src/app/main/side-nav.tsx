"use client";

import classNames from "classnames";
import { MdTypography } from "../components/typography";
import { MdRippleEffect } from "../util/md3";
import { MenuItemType } from "../util/typeDef";
import styles from "@/app/components/components.module.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const currentPath = ["Schedule", "Point to Point Schedule"];

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
        children: [
          {
            name: "Bulk Schedule",
            children: [],
            isLeaf: true,
          },
          {
            name: "Initial Schedule",
            children: [],
            isLeaf: true,
          },
        ],
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
            label={item.name}
            childs={item.children}
            isLeaf={item.isLeaf}
          />
        );
      })}

      {/* <NavItem variant="primary" selected>
        Primary Selected
      </NavItem>
      <NavItem variant="primary">Primary</NavItem>
      <NavItem variant="secondary" selected>
        Secondary Selected
      </NavItem>
      <NavItem variant="secondary">Secondary</NavItem> */}
    </>
  );
}

const NavItem = ({
  variant,
  selected,
  label,
  childs,
  isLeaf,
  className,
}: Readonly<{
  variant: "primary" | "secondary";
  selected?: boolean;
  depth: number;
  isLeaf?: boolean;
  label: string;
  childs: MenuItemType[];
  className?: string;
}>) => {
  const cx = classNames.bind(styles);

  return (
    <>
      <div
        className={cx(
          styles["navItem"],
          variant === "primary" && styles["primary"],
          variant === "secondary" && styles["secondary"],
          selected && styles["selected"]
        )}
      >
        <MdRippleEffect />
        <MdTypography
          variant="label"
          size="large"
          className="text-onSecondaryContainer flex-1"
        >
          {label}
        </MdTypography>
        <ArrowDropDownOutlinedIcon className="text-primary" />
      </div>
    </>
  );
};
