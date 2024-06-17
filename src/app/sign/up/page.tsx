"use client";

import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { PolicyContent } from "./policy-content";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Check } from "@mui/icons-material";

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className, icon } = props;

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        active
          ? "bg-primary"
          : completed
          ? "bg-primary"
          : "border border-outlineVariant"
      }`}
    >
      {completed ? (
        <>
          <Check className="text-white" />
        </>
      ) : (
        <MdTypography
          variant="label"
          size="large"
          className={active || completed ? "text-white" : "text-outlineVariant"}
        >
          {"0" + icon?.toString()}
        </MdTypography>
      )}
    </div>
  );
};

export default function Register() {
  const cx = classNames.bind(styles);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <OverlayScrollbarsComponent defer className="h-full overflow-auto m-2">
      <div className={cx(styles.container, "items-center")}>
        <div
          className={cx(
            styles.area,
            styles["no-padding"],
            "w-full max-w-[1240px] overflow-hidden"
          )}
        >
          <div className="h-3 bg-secondaryContainer"></div>

          <Stepper
            activeStep={currentStep}
            alternativeLabel
            connector={
              <StepConnector
                sx={{
                  mt: 0.5,
                  px: 1,
                }}
              />
            }
          >
            <Step key={"policy"}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <MdTypography
                  variant="label"
                  size="large"
                  className="-translate-y-3 text-primary"
                >
                  Privacy and Security Policy
                </MdTypography>
              </StepLabel>
            </Step>
            <Step key={"form"}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <MdTypography
                  variant="label"
                  size="large"
                  className="-translate-y-3 text-primary"
                >
                  Registration info
                </MdTypography>
              </StepLabel>
            </Step>
          </Stepper>

          <DividerComponent />
          {currentStep === 0 ? <PolicyContent /> : <></>}
        </div>
        <div className="border w-full bg-white">123123</div>
      </div>
    </OverlayScrollbarsComponent>
  );
}
