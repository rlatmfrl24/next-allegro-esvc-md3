"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdIcon,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { create } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoticePage() {
  const cx = classNames.bind(styles);
  const [searchType, setSearchType] = useState<"title" | "contents">("title");
  const router = useRouter();

  const columnHelper = createColumnHelper<{}>();

  return (
    <div aria-label="container" className={cx(styles.container, "h-full")}>
      <div className="flex items-center h-fit gap-4">
        <MdOutlinedButton
          onClick={() => {
            router.back();
          }}
        >
          <MdIcon slot="icon">
            <KeyboardArrowLeft fontSize="small" />
          </MdIcon>
          Back
        </MdOutlinedButton>
        <PageTitle title="e-Service Notice" />
      </div>
      <div className={cx(styles.area)}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={searchType === "title"}
            label="Title"
            onClick={() => setSearchType("title")}
          />
          <MdOutlinedSegmentedButton
            selected={searchType === "contents"}
            label="Contents"
            onClick={() => {
              console.log("contents");
              setSearchType("contents");
            }}
          />
        </MdOutlinedSegmentedButtonSet>
        {searchType === "title" ? (
          <MdOutlinedTextField label="Title" className="w-[640px]" />
        ) : (
          <MdOutlinedTextField label="Contents" className="w-[640 px]" />
        )}
      </div>
      <div className={cx(styles.area, "flex-1")}></div>
    </div>
  );
}
