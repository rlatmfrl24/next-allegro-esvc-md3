"use client";

import { MdTypography } from "../components/typography";
import {
  MdFilterChip,
  MdIcon,
  MdIconButton,
  MdOutlinedTextField,
} from "../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentPathState, draggableState } from "./store";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard";
import Portal from "../components/portal";
import TitleIndicator from "@/../public/title_indicator.svg";
import { AnimatePresence, motion } from "framer-motion";
import SetDashboard from "./dashboard/set-dashboard";

export default function MainPage() {
  const setCurrentPath = useSetRecoilState(currentPathState);
  const [customizabled, setCustomizabled] = useRecoilState(draggableState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function toggleDrawer() {
    setIsDrawerOpen((prev) => !prev);
  }

  useEffect(() => {
    setCurrentPath(["Dashboard"]);
  }, [setCurrentPath]);

  return (
    <div className="w-full p-6 relative">
      <div className="flex items-center gap-3 pb-6">
        <TitleIndicator className="mr-1 text-primary" />
        <MdTypography
          variant="title"
          size="large"
          className="text-primary flex-1"
        >
          Dashboard
        </MdTypography>
        <MdFilterChip
          label="Custom"
          defaultChecked={customizabled}
          onClick={() => {
            setCustomizabled(!customizabled);
          }}
        />
        <MdIconButton
          className="bg-secondaryContainer rounded-full"
          onClick={toggleDrawer}
        >
          <MdIcon>
            <SettingsOutlinedIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <Dashboard />
      <SetDashboard isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
