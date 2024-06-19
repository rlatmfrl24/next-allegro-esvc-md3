"use client";

import classNames from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import type { OverlayScrollbarsComponentRef } from "overlayscrollbars-react";

import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdDialog,
  MdElevation,
  MdFilledButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { Check } from "@mui/icons-material";
import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@mui/material";

import { PolicyContent } from "./policy-content";
import { RegisterForm } from "./form";
import { SignUpPreview } from "./preview";
import { SignUpFormProps } from "@/app/util/typeDef/sign";
import { access } from "fs";
import { useEventObserver } from "@/app/util/useEventObserver";

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
  const [formData, setFormData] = useState({} as SignUpFormProps);
  const [activeEvents, activateEvent] = useEventObserver();
  const osRef = useRef<OverlayScrollbarsComponentRef>(null);

  function scrollTop() {
    const { current } = osRef;
    const osInstance = current?.osInstance();

    if (!osInstance) {
      return;
    }

    const { overflowAmount } = osInstance.state();
    const { scrollOffsetElement } = osInstance.elements();
    const { scrollLeft, scrollTop } = scrollOffsetElement;

    scrollOffsetElement.scrollTo({
      left: scrollLeft,
      top: scrollTop - overflowAmount.y,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollTop();
  }, [currentStep]);

  return (
    <OverlayScrollbarsComponent
      defer
      className="h-full overflow-auto m-2"
      ref={osRef}
      events={{
        scroll: () => activateEvent("scroll"),
      }}
    >
      <div
        id="signup-container"
        className={cx(styles.container, "items-center")}
      >
        <div
          className={cx(
            styles.area,
            styles["no-padding"],
            "w-full max-w-[1240px] overflow-hidden",
            currentStep > 0 && "mb-16"
          )}
        >
          <div className="h-3 bg-secondaryContainer"></div>

          {currentStep < 2 && (
            <>
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
              <DividerComponent className="border-dotted" />
            </>
          )}

          {currentStep === 2 && (
            <div className="bg-surfaceContainerLow flex flex-col items-center mx-8 gap-2 py-6 rounded-lg">
              <Check
                className="bg-primary text-white rounded-full"
                sx={{
                  fontSize: 36,
                  p: 1,
                }}
              />
              <MdTypography variant="title" size="large">
                Your registration has been completed.
              </MdTypography>
              <MdTypography
                variant="label"
                size="large"
                className="text-outline"
              >
                Your registration has been completed.
              </MdTypography>
            </div>
          )}

          {
            {
              0: <PolicyContent />,
              1: (
                <RegisterForm
                  onFormChange={(form: SignUpFormProps) => {
                    setFormData(form);
                  }}
                  onStepChange={(step: number) => {
                    setCurrentStep(step);
                  }}
                />
              ),
              2: <SignUpPreview formData={formData} />,
            }[currentStep]
          }
        </div>
        {currentStep === 0 && (
          <div
            style={
              {
                "--md-elevation-level": "2",
              } as CSSProperties
            }
            className="relative w-full p-2 rounded-full text-right"
          >
            <MdElevation />
            <MdFilledButton onClick={() => setCurrentStep(1)}>
              Agree and Continue
            </MdFilledButton>
          </div>
        )}
      </div>
    </OverlayScrollbarsComponent>
  );
}
