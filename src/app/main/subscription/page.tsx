"use client";

import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
} from "@/app/util/md3";
import { useState } from "react";
import { DocumentationSubscription } from "./documentation";
import classNames from "classnames/bind";
import { VesselSubscription } from "./vessel";
import { Visibility } from "@tanstack/react-table";
import { VisibilitySubscription } from "./visibility";
import { ReportSubscription } from "./report";

export default function SubscriptionPage() {
  const [currentTabe, setCurrentTab] = useState("Documentation");
  const cx = classNames.bind(styles);

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
            Schedule: "Schedule",
            Report: <ReportSubscription />,
            Visibility: <VisibilitySubscription />,
          }[currentTabe]
        }
      </div>
    </div>
  );
}
