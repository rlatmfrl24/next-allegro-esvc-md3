"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import PageTitle from "@/app/components/title-components";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { draggableState } from "../../store/dashboard.store";
import { MdFilledTonalIconButton, MdFilterChip, MdIcon } from "../../util/md3";
import Dashboard from "./dashboard";
import SetDashboard from "./set-dashboard";

export default function MainPage() {
  const [customizabled, setCustomizabled] = useRecoilState(draggableState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function toggleDrawer() {
    setIsDrawerOpen((prev) => !prev);
  }

  return (
    <OverlayScrollbarsComponent className="flex-1 w-full">
      <div className="w-full p-4 pt-2 relative overflow-x-hidden">
        <div className="flex items-center justify-between gap-3 pb-4">
          <PageTitle title="Dashboard" category="Dashboard" href="/main" />
          <div className="flex items-center gap-4">
            <MdFilterChip
              label="Custom"
              selected={customizabled}
              onClick={() => {
                setCustomizabled(!customizabled);
              }}
            />
            <MdFilledTonalIconButton onClick={toggleDrawer}>
              <MdIcon>
                <SettingsOutlinedIcon />
              </MdIcon>
            </MdFilledTonalIconButton>
          </div>
        </div>
        <Dashboard />
        <SetDashboard isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
    </OverlayScrollbarsComponent>
  );
}
