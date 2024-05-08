import { ComponentProps, useMemo, useState } from "react";

import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { SignUpFormProps } from "@/app/util/typeDef/sign";
import {
  Check,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { PolicyContent } from "./policy-content";
import { SignUpPreview } from "./preview";

const PassWordTextField = ({
  className,
  ...props
}: {
  className?: string;
} & ComponentProps<typeof MdOutlinedTextField>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={`relative flex h-fit ${className ? className : ""}`}>
      <MdOutlinedTextField
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        required={false}
        hasTrailingIcon
        className="flex-1"
      >
        <MdIconButton
          aria-label="toggle-password-visibility"
          slot="trailing-icon"
          onClick={() => {
            setIsPasswordVisible(!isPasswordVisible);
          }}
        >
          <MdIcon>
            {isPasswordVisible ? (
              <VisibilityOffOutlined />
            ) : (
              <VisibilityOutlined />
            )}
          </MdIcon>
        </MdIconButton>
      </MdOutlinedTextField>
      {props.required && (
        <MdTypography
          variant="label"
          size="large"
          className="text-error absolute top-0.5 left-1.5"
        >
          *
        </MdTypography>
      )}
    </div>
  );
};

export const useRegister = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "policy" | "form" | "preview" | "complete"
  >("policy");

  const [signUpForm, setSignUpForm] = useState<SignUpFormProps>({
    companyName: "",
    companyType: "",
    address: {
      country: "",
      zipCode: "",
      city: "",
      street: "",
    },
    userId: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    tel: "",
    fax: "",
    email: "",
    trade: "",
    contactOffice: "",
    recentBLNumber: "",
    comment: "",
  });
  const isRequiredFilled = useMemo(() => {
    return (
      signUpForm.companyName &&
      signUpForm.companyType &&
      signUpForm.address.country &&
      signUpForm.address.city &&
      signUpForm.address.street &&
      signUpForm.userId &&
      signUpForm.firstName &&
      signUpForm.lastName &&
      signUpForm.password &&
      signUpForm.confirmPassword &&
      signUpForm.password === signUpForm.confirmPassword &&
      signUpForm.tel &&
      signUpForm.email &&
      signUpForm.trade &&
      signUpForm.contactOffice &&
      signUpForm.recentBLNumber
    );
  }, [signUpForm]);

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
            setSignUpForm({
              companyName: "",
              companyType: "",
              address: {
                country: "",
                zipCode: "",
                city: "",
                street: "",
              },
              userId: "",
              firstName: "",
              lastName: "",
              password: "",
              confirmPassword: "",
              tel: "",
              fax: "",
              email: "",
              trade: "",
              contactOffice: "",
              recentBLNumber: "",
              comment: "",
            });
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
                policy: <PolicyContent />,
                form: (
                  <div className="flex flex-col gap-4">
                    <DetailTitle title="Company Information" />
                    <div className="flex gap-4">
                      <NAOutlinedTextField
                        label="Company Name"
                        required
                        value={signUpForm.companyName}
                        className="flex-1"
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            companyName: value,
                          }))
                        }
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
                        onSelection={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            companyType: value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex gap-4">
                      <NAOutlinedListBox
                        required
                        label="Country"
                        options={["Korea", "Japan"]}
                        className="flex-1"
                        onSelection={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              country: value,
                            },
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        label="Zip Code"
                        value={signUpForm.address.zipCode}
                        className="flex-1"
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              zipCode: value,
                            },
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        required
                        label="City"
                        value={signUpForm.address.city}
                        className="flex-1"
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              city: value,
                            },
                          }))
                        }
                      />
                    </div>
                    <NAOutlinedTextField
                      label="Address"
                      required
                      value={signUpForm.address.street}
                      className="w-full"
                      handleValueChange={(value) =>
                        setSignUpForm((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            street: value,
                          },
                        }))
                      }
                    />
                    <DividerComponent className="my-2" />
                    <DetailTitle title="User Information" />
                    <div className="flex gap-4">
                      <NAOutlinedTextField
                        label="User ID"
                        required
                        value={signUpForm.userId}
                        className="flex-1"
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            userId: value,
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        label="First Name"
                        required
                        value={signUpForm.firstName}
                        className="flex-1"
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            firstName: value,
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        label="Last Name"
                        required
                        value={signUpForm.lastName}
                        className="flex-1"
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            lastName: value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex gap-4">
                      <PassWordTextField
                        required
                        label="Password"
                        className="basis-1/2"
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          value &&
                            setSignUpForm((prev) => ({
                              ...prev,
                              password: value,
                            }));
                        }}
                      />
                      <PassWordTextField
                        required
                        label="Confirm Password"
                        error={
                          signUpForm.password !== signUpForm.confirmPassword
                        }
                        errorText="Password does not match"
                        className="basis-1/2"
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          value &&
                            setSignUpForm((prev) => ({
                              ...prev,
                              confirmPassword: value,
                            }));
                        }}
                      />
                    </div>
                    <DividerComponent className="my-2 border-dotted" />
                    <div className="grid grid-cols-4 gap-4">
                      <NAOutlinedTextField
                        required
                        label="Tel No."
                        value={signUpForm.tel}
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            tel: value,
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        label="Fax No."
                        value={signUpForm.fax}
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            fax: value,
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        required
                        label="Email"
                        className="col-span-2"
                        value={signUpForm.email}
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            email: value,
                          }))
                        }
                      />
                      <NAOutlinedListBox
                        required
                        initialValue="Select Trade"
                        options={["Export & Import", "Export", "Import"]}
                        onSelection={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            trade: value,
                          }))
                        }
                      />
                      <NAOutlinedListBox
                        required
                        className="col-span-3"
                        initialValue="Select Contact Office"
                        options={["Office 1", "Office 2", "Office 3"]}
                        onSelection={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            contactOffice: value,
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        required
                        className="col-span-4"
                        label="Recent BL Number"
                        value={signUpForm.recentBLNumber}
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            recentBLNumber: value,
                          }))
                        }
                      />
                      <NAOutlinedTextField
                        label="Comment"
                        type="textarea"
                        className="col-span-4"
                        value={signUpForm.comment}
                        handleValueChange={(value) =>
                          setSignUpForm((prev) => ({
                            ...prev,
                            comment: value,
                          }))
                        }
                      />
                    </div>
                  </div>
                ),
                preview: <SignUpPreview formData={signUpForm} />,
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
                        and try again
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
                      disabled={!isRequiredFilled}
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
