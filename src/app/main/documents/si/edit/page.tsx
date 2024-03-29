"use client";
import PageTitle from "@/app/components/title-components";
import {
  CurrentSIConditionState,
  SIEditContactInformationState,
  SIEditContainerState,
  SIEditMarkDescriptionState,
  SIEditPartiesState,
  SIEditRouteBLState,
  SIEditStepState,
} from "@/app/store/si.store";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import StepItem from "./components/step-item";
import StepParties from "./step-parties";
import StepRouteBL from "./step-routeBL";
import StepContainer from "./step-container";
import StepMarkDescription from "./step-mark-description";
import StepContactInformation from "./step-contact-information";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useMemo } from "react";
import {
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
} from "@/app/util/md3";
import { useRouter } from "next/navigation";
import { SIEditDataType } from "@/app/util/typeDef/si";

export default function SIEdit() {
  const cx = classNames.bind(styles);
  const setCurrentSICondition = useSetRecoilState(CurrentSIConditionState);
  const currentPartiesInputData = useRecoilValue(SIEditPartiesState);
  const currentRouteBLInputData = useRecoilValue(SIEditRouteBLState);
  const currentSIContainerInputData = useRecoilValue(SIEditContainerState);
  const currentMarkDescriptionInputData = useRecoilValue(
    SIEditMarkDescriptionState
  );
  const currentContactInformationInputData = useRecoilValue(
    SIEditContactInformationState
  );

  const [siEditStep, setSiEditStep] = useRecoilState(SIEditStepState);
  const router = useRouter();

  const AllStepsComplete = useMemo(() => {
    return Object.keys(siEditStep).every((key) => {
      return siEditStep[key as keyof typeof siEditStep].isCompleted;
    });
  }, [siEditStep]);

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
        <AnimatePresence>
          {AllStepsComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring" }}
              className="fixed bottom-0 left-20 w-[calc(100%-80px)] px-4 pb-2 z-10"
            >
              <div
                className="relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
                style={
                  {
                    "--md-elevation-level": 4,
                  } as CSSProperties
                }
              >
                <MdElevation />
                <MdFilledTonalButton
                  onClick={() => {
                    router.push("/main/documents/si/preview");
                  }}
                >
                  Preview
                </MdFilledTonalButton>
                <MdFilledButton
                  onClick={() => {
                    const newSICondition = {
                      parties: currentPartiesInputData,
                      routeBL: currentRouteBLInputData,
                      container: currentSIContainerInputData,
                      markDescription: currentMarkDescriptionInputData,
                      contactInformation: currentContactInformationInputData,
                    } as SIEditDataType;
                    console.log(newSICondition);
                    setCurrentSICondition(newSICondition);
                    router.push("/main/documents/si");
                  }}
                >
                  Submit
                </MdFilledButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
