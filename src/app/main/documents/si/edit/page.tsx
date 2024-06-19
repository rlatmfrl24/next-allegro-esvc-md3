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
import { CSSProperties, Suspense, useEffect, useMemo, useState } from "react";
import {
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdOutlinedButton,
} from "@/app/util/md3";
import { useRouter, useSearchParams } from "next/navigation";
import { SIEditDataType, SIState } from "@/app/util/typeDef/si";
import { ChevronLeft } from "@mui/icons-material";
import SIStateChip from "../si-state-chip";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/components/divider";

export default function SIEditPage() {
  return (
    <Suspense>
      <SIEdit />
    </Suspense>
  );
}

function SIEdit() {
  const cx = classNames.bind(styles);
  const searchParams = useSearchParams();
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
  const [currentStep, setCurrentStep] = useState("parties");
  const router = useRouter();

  useEffect(() => {
    //set current step by siEditStep
    const currentStep = Object.keys(siEditStep).find((key) => {
      return siEditStep[key as keyof typeof siEditStep].isSelected;
    });
    if (currentStep) {
      setCurrentStep(currentStep);
    }
  }, [siEditStep]);

  useEffect(() => {
    return () => {
      // set all step to visited false
      setSiEditStep((prev) => {
        const newArray = Object.keys(prev).map((k) => {
          return {
            ...prev[k as keyof typeof prev],
            visited: false,
          };
        });
        const newObject: typeof prev = newArray.reduce((prev, curr) => {
          prev[curr.id as keyof typeof prev] = curr;
          return prev;
        }, {} as typeof prev);

        return newObject;
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          visited:
            prev[k as keyof typeof prev].visited ||
            prev[k as keyof typeof prev].isSelected,
        };
      });
      const newObject: typeof prev = newArray.reduce((prev, curr) => {
        prev[curr.id as keyof typeof prev] = curr;
        return prev;
      }, {} as typeof prev);

      return newObject;
    });
  }

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <MdOutlinedButton
            onClick={() => {
              router.back();
            }}
          >
            <MdIcon slot="icon">
              <ChevronLeft fontSize="small" />
            </MdIcon>
            Back
          </MdOutlinedButton>
          <PageTitle title="Shipping Instruction (Edit)" hasFavorite={false} />
        </div>
        <div className="flex items-center">
          <SIStateChip state={searchParams.get("status") as SIState} />
          {searchParams.get("requestNumber") && (
            <>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline mr-1 ml-4"
              >
                Request No.
              </MdTypography>
              <MdTypography variant="body" size="medium" prominent>
                {searchParams.get("requestNumber")}
              </MdTypography>
            </>
          )}
          {searchParams.get("bookingNumber") && (
            <>
              <DividerComponent orientation="vertical" className="mx-4 h-5" />
              <MdTypography
                variant="body"
                size="medium"
                className="mr-1 text-outline"
              >
                Booking No.
              </MdTypography>
              <MdTypography variant="body" size="medium" prominent>
                {searchParams.get("bookingNumber")}
              </MdTypography>
            </>
          )}
          <MdFilledTonalButton className="ml-4">
            Temporary Save{" "}
          </MdFilledTonalButton>
        </div>
      </div>
      <div
        className={cx(
          styles["area"],
          styles["no-padding"],
          styles["row-direction"],
          "min-h-[720px]"
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
                  if (currentStep !== key) {
                    setCurrentStep(key);
                    handleStepClick(key);
                  }
                }}
              />
            );
          })}
        </div>
        <div className="flex-1 flex p-6 min-h-fit">
          {
            {
              parties: <StepParties />,
              routeBL: <StepRouteBL />,
              container: <StepContainer />,
              markDescription: <StepMarkDescription />,
              contactInformation: <StepContactInformation />,
            }[currentStep]
          }
        </div>
        <AnimatePresence>
          {AllStepsComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring" }}
              className="fixed bottom-0 left-20 w-[calc(100%-80px)] px-4 pb-2 z-50"
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
