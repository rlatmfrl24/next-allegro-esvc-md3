import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { useCallback, useState } from "react";
import { PolicyContent } from "./policy-content";
import { set } from "lodash";
import { SubTitle } from "@/app/components/title-components";
import { DividerComponent } from "@/app/components/divider";
import { Check } from "@mui/icons-material";

export const useRegister = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "policy" | "form" | "preview" | "complete"
  >("policy");

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  function renderRegisterDialog() {
    return (
      <Portal selector="#nav-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
            setCurrentStep("policy");
            setAgreePolicy(false);
          }}
          className="relative z-20 w-fit max-w-[960px]"
        >
          <div slot="headline" className="flex flex-col items-start">
            {
              {
                policy: <>Sign Up</>,
                form: (
                  <>
                    Sign Up
                    <MdTypography variant="body" size="medium">
                      Please enter all information in English. (Required field
                      is indicated by <span className="text-error">* </span>)
                    </MdTypography>
                  </>
                ),
                preview: <>Sign Up</>,
                complete: <></>,
              }[currentStep]
            }
          </div>
          <div slot="content">
            {
              {
                policy: (
                  <>
                    <PolicyContent />
                  </>
                ),
                form: <></>,
                preview: (
                  <>
                    <SubTitle title="Company Information" />
                    <DividerComponent className="my-4" />
                    <SubTitle title="User Information" />
                    <DividerComponent className="my-4 border-dotted" />
                  </>
                ),
                complete: (
                  <>
                    <div className="flex flex-col items-center">
                      <Check className="text-secondary mb-2" />
                      <MdTypography variant="title" size="large">
                        Subscription application completed
                      </MdTypography>
                      <MdTypography
                        variant="body"
                        size="medium"
                        className="text-onSurfaceVariant mt-4"
                      >
                        The inputted information is not correct. Please check
                        and try again.
                      </MdTypography>
                    </div>
                  </>
                ),
              }[currentStep]
            }
          </div>
          <div slot="actions">
            {
              {
                policy: (
                  <>
                    <MdTypography
                      tag="label"
                      variant="label"
                      size="large"
                      className={`flex items-center gap-2 cursor-pointer whitespace-nowrap px-4 rounded-full ${
                        agreePolicy ? "bg-secondaryContainer" : ""
                      }`}
                    >
                      <MdCheckbox
                        checked={agreePolicy}
                        onClick={() => setAgreePolicy(!agreePolicy)}
                      />
                      I have read, understood and agree to the ‘Privacy and
                      Security Policy’
                    </MdTypography>
                    <div className="flex-1"></div>
                    <MdOutlinedButton
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </MdOutlinedButton>
                    <MdFilledButton
                      disabled={!agreePolicy}
                      onClick={() => {
                        setCurrentStep("form");
                      }}
                    >
                      Next
                    </MdFilledButton>
                  </>
                ),
                form: (
                  <>
                    <MdOutlinedButton
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </MdOutlinedButton>
                    <MdFilledButton
                      disabled={!agreePolicy}
                      onClick={() => {
                        setCurrentStep("preview");
                      }}
                    >
                      Next
                    </MdFilledButton>
                  </>
                ),
                preview: (
                  <>
                    <MdOutlinedButton
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </MdOutlinedButton>
                    <MdFilledButton
                      disabled={!agreePolicy}
                      onClick={() => {
                        setCurrentStep("complete");
                      }}
                    >
                      Register
                    </MdFilledButton>
                  </>
                ),
                complete: (
                  <>
                    <MdFilledButton
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                    >
                      {" "}
                      Close
                    </MdFilledButton>
                  </>
                ),
              }[currentStep]
            }
          </div>
        </MdDialog>
      </Portal>
    );
  }

  return {
    openDialog,
    renderRegisterDialog,
  };
};
