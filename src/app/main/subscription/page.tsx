"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdElevation,
  MdFilledButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
} from "@/app/util/md3";
import { CSSProperties, useEffect, useState } from "react";
import { DocumentationSubscription } from "./documentation";
import classNames from "classnames/bind";
import { VesselSubscription } from "./vessel";
import { VisibilitySubscription } from "./visibility";
import { ReportSubscription } from "./report";
import { ScheduleSubscription } from "./schedule";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { BottomFloatingState } from "@/app/store/subscription.store";
import { BottomFloatingBar } from "@/app/components/bottom-floating-bar";
import NaOutlinedSegmentedButton from "@/app/components/na-outlined-segmented-button";

export default function SubscriptionPage() {
  const [currentTabe, setCurrentTab] = useState("Documentation");
  const cx = classNames.bind(styles);

  const [isBottomFloatingVisible, setIsBottomFloatingVisible] =
    useRecoilState(BottomFloatingState);

  useEffect(() => {
    setIsBottomFloatingVisible(false);
  }, [currentTabe, setIsBottomFloatingVisible]);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle title="e-Subscription" hasFavorite={false} />
      <div className={cx(styles.area, "flex-1 mb-12")}>
        <MdOutlinedSegmentedButtonSet>
          <NaOutlinedSegmentedButton
            label="Documentation"
            onClick={() => setCurrentTab("Documentation")}
            selected={currentTabe === "Documentation"}
          />
          <NaOutlinedSegmentedButton
            label="Vessel"
            onClick={() => setCurrentTab("Vessel")}
            selected={currentTabe === "Vessel"}
          />
          <NaOutlinedSegmentedButton
            label="Schedule"
            onClick={() => setCurrentTab("Schedule")}
            selected={currentTabe === "Schedule"}
          />
          <NaOutlinedSegmentedButton
            label="Report"
            onClick={() => setCurrentTab("Report")}
            selected={currentTabe === "Report"}
          />
          <NaOutlinedSegmentedButton
            label="Visibility"
            onClick={() => setCurrentTab("Visibility")}
            selected={currentTabe === "Visibility"}
          />
        </MdOutlinedSegmentedButtonSet>
        {
          {
            Documentation: <DocumentationSubscription />,
            Vessel: <VesselSubscription />,
            Schedule: <ScheduleSubscription />,
            Report: <ReportSubscription />,
            Visibility: <VisibilitySubscription />,
          }[currentTabe]
        }
      </div>
      <BottomFloatingBar
        open={isBottomFloatingVisible}
        onOpenChange={setIsBottomFloatingVisible}
      >
        <MdFilledButton onClick={() => setIsBottomFloatingVisible(false)}>
          Save
        </MdFilledButton>
      </BottomFloatingBar>
    </div>
  );
}
