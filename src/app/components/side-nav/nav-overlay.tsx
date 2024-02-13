import { motion } from "framer-motion";
import { MdTypography } from "../typography";
import { meunItems } from "@/app/util/constants";
import NavItem from "./nav-item";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const NavOverlay = ({ handleDrawer }: { handleDrawer: () => void }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        aria-label="overlay"
        className={`fixed h-screen w-screen bg-black bg-opacity-50 z-40 `}
        onClick={() => handleDrawer && handleDrawer()}
      ></motion.div>
      <motion.div
        initial={{ x: -360 }}
        animate={{ x: 0 }}
        exit={{ x: -360 }}
        transition={{ type: "spring", bounce: 0, duration: 0.25 }}
        className="fixed h-screen w-[360px] bg-surfaceContainerLow p-3 z-50 rounded-r-2xl flex flex-col overflow-y-auto"
      >
        <OverlayScrollbarsComponent defer>
          <MdTypography
            variant="title"
            size="small"
            className="h-14 px-3.5 items-center w-full flex text-onSurfaceVariant"
          >
            Menu
          </MdTypography>
          {meunItems.map((item) => (
            <NavItem
              item={item}
              key={item.id}
              depth={1}
              path={[item.link || ""]}
              handleDrawer={() => handleDrawer && handleDrawer()}
            />
          ))}
        </OverlayScrollbarsComponent>
      </motion.div>
    </>
  );
};

export default NavOverlay;
