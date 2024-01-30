"use client";

import { MdTypography } from "../components/typography";
import { MdFilterChip, MdIcon, MdIconButton } from "../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentPathState, draggableState } from "./store";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard";
import TitleIndicator from "@/../public/title_indicator.svg";

export default function MainPage() {
  const setCurrentPath = useSetRecoilState(currentPathState);
  const [customizabled, setCustomizabled] = useRecoilState(draggableState);

  useEffect(() => {
    setCurrentPath(["Dashboard"]);
    const placeholder = document.querySelector(".react-grid-placeholder");
    if (placeholder) {
      placeholder.setAttribute(
        "style",
        "background-color: #F7F2FA; border-radius: 8px; border: 1px solid #E5E5E5"
      );
    }
  }, [setCurrentPath]);

  return (
    <div className="max-w-[1400px] w-full">
      <div className="flex py-6 items-center gap-3">
        <TitleIndicator className="mr-1" />
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
        <MdIconButton className="bg-secondaryContainer rounded-full">
          <MdIcon>
            <SettingsOutlinedIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <Dashboard />
      <div className="h-6"></div>
    </div>
  );
}
