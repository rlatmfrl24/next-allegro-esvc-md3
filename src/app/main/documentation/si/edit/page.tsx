"use client";
import PageTitle from "@/app/components/title-components";
import { SIEditStepState } from "@/app/store/si.store";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import StepItem from "./components/step-item";
import StepParties from "./step-parties";
import StepRouteBL from "./step-routeBL";
import StepContainer from "./step-container";
import StepMarkDescription from "./step-mark-description";
import StepContactInformation from "./step-contact-information";

export default function SIEdit() {
  const cx = classNames.bind(styles);
  const [siEditStep, setSiEditStep] = useRecoilState(SIEditStepState);

  function handleStepClick(stepId: string) {
    setSiEditStep((prev) => {
      const newArray = Object.keys(prev).map((k) => {
        return {
          ...prev[k as keyof typeof prev],
          isSelected: k === stepId,
        };
      });
      const newObject: typeof prev = newArray.reduce((prev, curr) => {
        prev[curr.id as keyof typeof prev] = curr;
        return prev;
      }, {} as typeof prev);

      return newObject;
    });
  }
  function getSelectedStepId() {
    // return keyof typeof bookingRequestState
    return Object.keys(siEditStep).find((key) => {
      return siEditStep[key as keyof typeof siEditStep].isSelected;
    });
  }

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Shipping Instruction" />
      <div
        className={cx(
          styles["area"],
          styles["no-padding"],
          styles["row-direction"],
          "min-h-[792px] mb-12"
        )}
      >
        <div className="flex flex-col gap-4 py-6 px-4 border-r border-r-outlineVariant">
          {Object.keys(siEditStep).map((key) => {
            const item = siEditStep[key as keyof typeof siEditStep];
            return (
              <StepItem
                key={key}
                title={item.title}
                isSelected={item.isSelected}
                isCompleted={item.isCompleted}
                onClick={() => {
                  if (getSelectedStepId() !== key) handleStepClick(key);
                }}
              />
            );
          })}
        </div>
        <div className="flex-1 flex p-6">
          {
            {
              parties: <StepParties />,
              routeBL: <StepRouteBL />,
              container: <StepContainer />,
              markDescription: <StepMarkDescription />,
              contactInformation: <StepContactInformation />,
            }[getSelectedStepId() as keyof typeof siEditStep]
          }
        </div>
      </div>
    </div>
  );
}
