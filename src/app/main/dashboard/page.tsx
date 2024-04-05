"use client";

import { MdTypography } from "../../components/typography";
import { MdFilledTonalIconButton, MdFilterChip, MdIcon } from "../../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRecoilState } from "recoil";
import { draggableState } from "../../store/dashboard.store";
import { useState } from "react";
import Dashboard from "./dashboard";
import SetDashboard from "./set-dashboard";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PageTitle from "@/app/components/title-components";

export default function MainPage() {
  const [customizabled, setCustomizabled] = useRecoilState(draggableState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function toggleDrawer() {
    setIsDrawerOpen((prev) => !prev);
  }

  return (
    <OverlayScrollbarsComponent className="flex-1 w-full">
      <div className="w-full p-4 relative overflow-x-hidden">
        <div className="flex items-center justify-between gap-3 pb-6">
          <PageTitle title="Dashboard" />
          <div className="flex items-center gap-4">
            <MdFilterChip
              label="Custom"
              defaultChecked={customizabled}
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
