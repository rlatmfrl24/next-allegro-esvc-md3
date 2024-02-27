"use client";

import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "@/app/styles/base.module.css";

export default function LongRangeSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");

  return (
    <div
      aria-label="container"
      className="max-w-[1400px] w-full m-6 flex flex-col gap-4 "
    >
      <div
        aria-label="page-title"
        className="flex justify-start items-center gap-3"
      >
        <MdTypography variant="title" size="large">
          Long Range Schedule
        </MdTypography>
        <MdIconButton>
          <MdIcon>
            <FavoriteBorderIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <div className={styles.area}>11</div>
    </div>
  );
}
