"use client";

import { MdTypography } from "../components/typography";
import { MdFilterChip, MdIcon, MdIconButton } from "../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import styles from "./main.module.css";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentPathState } from "./store";

export default function MainPage() {
  const setCurrentPath = useSetRecoilState(currentPathState);

  useEffect(() => {
    setCurrentPath(["Dashboard"]);
  }, [setCurrentPath]);

  return (
    <>
      <div className="flex p-6 items-center gap-1">
        <MdTypography
          variant="title"
          size="large"
          className="text-primary flex-1"
        >
          Dashboard
        </MdTypography>
        <MdFilterChip label="Custom" />
        <MdIconButton>
          <MdIcon>
            <SettingsOutlinedIcon />
          </MdIcon>
        </MdIconButton>
      </div>
    </>
  );
}
