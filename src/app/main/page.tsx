"use client";

import { MdTypography } from "../components/typography";
import { MdFilterChip, MdIcon, MdIconButton } from "../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridLayout from "react-grid-layout";
import styles from "./main.module.css";

import "react-grid-layout/css/styles.css";
import { useSetRecoilState } from "recoil";
import { currentPathState } from "./store";
import { useEffect, useState } from "react";
import InputCard from "./dashboard/input-card";

export default function MainPage() {
  const setCurrentPath = useSetRecoilState(currentPathState);
  const [customizabled, setCustomizabled] = useState(false);

  const layout = [
    {
      i: "bl-status",
      x: 0,
      y: 0,
      w: 1,
      h: 12,
      minW: 1,
      maxW: 2,
      isResizable: false,
    },
    {
      i: "surrender-bl",
      x: 1,
      y: 0,
      w: 1,
      h: 12,
      minW: 1,
      maxW: 2,
      isResizable: false,
    },
    { i: "c", x: 4, y: 0, w: 1, h: 12, minW: 1, maxW: 2, isResizable: false },
  ];

  useEffect(() => {
    setCurrentPath(["Dashboard"]);
  }, [setCurrentPath]);

  return (
    <div className="max-w-[1400px] w-full">
      <div className="flex p-6 pb-0 items-center gap-1">
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
      <GridLayout
        className="layout"
        layout={layout}
        cols={4}
        width={1400}
        rowHeight={1}
        margin={[24, 24]}
        isDraggable={customizabled}
        onLayoutChange={(layout) => {
          console.log(layout);
        }}
      >
        <div key="bl-status" className="flex items-center">
          <InputCard
            title="B/L Status"
            description="Enter a B/L number to inquiry the B/L status"
            placeholder="B/L number"
            buttonText="Inquiry"
          />
        </div>
        <div key="surrender-bl" className="flex items-center">
          <InputCard
            title="Surrender B/L"
            description="Enter a B/L number to inquiry the B/L status"
            placeholder="B/L number"
            buttonText="Inquiry"
          />
        </div>
      </GridLayout>
    </div>
  );
}
