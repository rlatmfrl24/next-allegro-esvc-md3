"use client";

import { MdTypography } from "../../components/typography";
import { MdFilterChip, MdIcon, MdIconButton } from "../../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRecoilState } from "recoil";
import { draggableState } from "../store";
import { useState } from "react";
import Dashboard from "./dashboard";
import TitleIndicator from "@/../public/title_indicator.svg";
import SetDashboard from "./set-dashboard";

export default function MainPage() {
  const [customizabled, setCustomizabled] = useRecoilState(draggableState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function toggleDrawer() {
    setIsDrawerOpen((prev) => !prev);
  }

  return (
    <div id="main-container" className="w-full p-4 relative overflow-x-hidden">
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
