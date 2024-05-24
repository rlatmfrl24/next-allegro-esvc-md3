import { MdIcon, MdRippleEffect } from "@/app/util/md3";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdTypography } from "../typography";
import { AnimatePresence, motion } from "framer-motion";
import styles from "@/app/styles/side-nav.module.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PlaceholdeIcon from "@/../public/icon_tracking_outlined.svg";
import { MenuItemType } from "@/app/util/typeDef/generic";

import DashboardIcon from "@/../public/icon_menu_dashboard.svg";
import ScheduleIcon from "@/../public/icon_menu_schedule.svg";
import BookingIcon from "@/../public/icon_menu_booking.svg";
import PricingIcon from "@/../public/icon_menu_pricing.svg";
import DocumentsIcon from "@/../public/icon_menu_documents.svg";
import TrackTraceIcon from "@/../public/icon_menu_tracktrace.svg";
import ImportIcon from "@/../public/icon_menu_import.svg";
import ManageShipmentIcon from "@/../public/icon_menu_manage_shipment.svg";
import DententionIcon from "@/../public/icon_menu_dentention.svg";

const NavItem = ({
  item,
  depth,
  path,
  className,
  handleDrawer,
}: Readonly<{
  item: MenuItemType;
  depth: number;
  path: string[];
  className?: string;
  handleDrawer?: () => void;
}>) => {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const currentPath = usePathname().split("/");
  const [open, setOpen] = useState(
    currentPath.includes(path[depth - 1]) || false
  );

  const itemIcon = {
    Dashboard: <DashboardIcon />,
    Schedule: <ScheduleIcon />,
    Booking: <BookingIcon />,
    Pricing: <PricingIcon />,
    Documents: <DocumentsIcon />,
    "Track & Trace": <TrackTraceIcon />,
    "Import (Inbound)": <ImportIcon />,
    "Manage Shipment": <ManageShipmentIcon />,
    "Detention & Demurrage": <DententionIcon />,
  }[item.name];

  const isCurrentPath = path.every((p, i) => currentPath.includes(p));

  return (
    <>
      <div
        key={item.id}
        className={cx(
          styles.navItem,
          isCurrentPath && styles["selected"],
          className
        )}
        onClick={() => {
          if (item.subMenu && item.subMenu.length > 0) {
            setOpen(!open);
          } else {
            router.push("/main/" + path.join("/"));
            handleDrawer && handleDrawer();
          }
        }}
      >
        <MdRippleEffect />
        {depth === 1 && <MdIcon>{itemIcon ? itemIcon : <></>}</MdIcon>}
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
                  handleDrawer={handleDrawer}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavItem;
