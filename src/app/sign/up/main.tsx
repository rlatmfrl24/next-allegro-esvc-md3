import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { useState } from "react";
import { PolicyContent } from "./policy-content";
import { DetailTitle, SubTitle } from "@/app/components/title-components";
import { DividerComponent } from "@/app/components/divider";
import { Check } from "@mui/icons-material";
import { SignUpForm } from "./form";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";

type SignUpFormProps = {
  companyName: string;
  companyType: string;
  address: {
    country: string;
    zipCode: string;
    city: string;
    street: string;
  };
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

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
                form: (
                  <div className="flex flex-col gap-4">
                    <DetailTitle title="Company Information" />
                    <div className="flex gap-2">
                      <NAOutlinedTextField
                        label="Company Name"
                        required
                        value=""
                        className="flex-1"
                      />
                      <NAOutlinedListBox
                        options={[
                          "Company Type 1",
                          "Company Type 2",
                          "Company Type 3",
                        ]}
                        required
                        label="Company Type"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <NAOutlinedListBox
                        label="Country"
                        options={["Korea, Japan"]}
                        className="flex-1"
                      />
                      <NAOutlinedTextField
                        label="Zip Code"
                        value=""
                        className="flex-1"
                      />
                      <NAOutlinedTextField
                        label="City"
                        value=""
                        className="flex-1"
                      />
                    </div>
                    <NAOutlinedTextField
                      label="Address"
                      value=""
                      className="w-full"
                    />
                    <DividerComponent className="my-2" />
                    <DetailTitle title="User Information" />
                    <div className="flex gap-2">
                      <NAOutlinedTextField
                        label="User ID"
                        required
                        value=""
                        className="flex-1"
                      />
                      <NAOutlinedTextField
                        label="First Name"
                        required
                        value=""
                        className="flex-1"
                      />
                      <NAOutlinedTextField
                        label="Last Name"
                        required
                        value=""
                        className="flex-1"
                      />
                    </div>
                    <div></div>
                  </div>
                ),
                preview: (
                  <>
                    <DetailTitle title="Company Information" />
                    <DividerComponent className="my-4" />
                    <DetailTitle title="User Information" />
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
