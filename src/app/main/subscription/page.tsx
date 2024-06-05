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

export default function SubscriptionPage() {
  const [currentTabe, setCurrentTab] = useState("Documentation");
  const cx = classNames.bind(styles);

  const [isBottomFloatingVisible, setIsBottomFloatingVisible] =
    useRecoilState(BottomFloatingState);

  useEffect(() => {
    setIsBottomFloatingVisible(false);
  }, [currentTabe, setIsBottomFloatingVisible]);

  return (
    <div aria-label="container" className={cx(styles.container, "flex-1")}>
      <PageTitle title="e-Subscription" />
      <div className={cx(styles.area, "flex-1 mb-12")}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="Documentation"
            onClick={() => setCurrentTab("Documentation")}
            selected={currentTabe === "Documentation"}
          />
          <MdOutlinedSegmentedButton
            label="Vessel"
            onClick={() => setCurrentTab("Vessel")}
            selected={currentTabe === "Vessel"}
          />
          <MdOutlinedSegmentedButton
            label="Schedule"
            onClick={() => setCurrentTab("Schedule")}
            selected={currentTabe === "Schedule"}
          />
          <MdOutlinedSegmentedButton
            label="Report"
            onClick={() => setCurrentTab("Report")}
            selected={currentTabe === "Report"}
          />
          <MdOutlinedSegmentedButton
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
      <AnimatePresence>
        {isBottomFloatingVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={
              {
                "--md-elevation-level": 2,
              } as CSSProperties
            }
            className="fixed bottom-3 left-24 w-[calc(100%-7rem)] p-2 rounded-full flex justify-end bg-surfaceContainer z-10"
          >
            <MdElevation />
            <MdFilledButton onClick={() => setIsBottomFloatingVisible(false)}>
              Save
            </MdFilledButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
