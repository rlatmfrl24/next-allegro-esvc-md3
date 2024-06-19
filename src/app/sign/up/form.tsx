import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdElevation,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { SignUpFormProps } from "@/app/util/typeDef/sign";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ComponentProps, useEffect, useState } from "react";

export const RegisterForm = (props: {
  onFormChange?: (form: SignUpFormProps) => void;
  onStepChange?: (step: number) => void;
}) => {
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
    comment: "",
  });
  const [isValidationFilled, setIsValidationFilled] = useState(false);

  useEffect(() => {
    const isValidationFilled =
      signUpForm.userId !== "" &&
      signUpForm.password !== "" &&
      signUpForm.confirmPassword !== "" &&
      signUpForm.firstName !== "" &&
      signUpForm.lastName !== "" &&
      signUpForm.tel !== "" &&
      signUpForm.fax !== "" &&
      signUpForm.email !== "" &&
      signUpForm.companyName !== "" &&
      signUpForm.companyType !== "" &&
      signUpForm.contactOffice !== "" &&
      signUpForm.trade !== "" &&
      signUpForm.address.country !== "" &&
      signUpForm.address.city !== "" &&
      signUpForm.address.street !== "" &&
      signUpForm.password === signUpForm.confirmPassword;
    setIsValidationFilled(isValidationFilled);
    props.onFormChange?.(signUpForm);
  }, [props, signUpForm]);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className="flex flex-col px-6 pb-6 pt-2 gap-6">
      <AnimatePresence>
        {
          // Show the submit button only when all required fields are filled
          isValidationFilled ? (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 w-full px-4 py-2 z-10"
            >
              <div
                style={
                  {
                    "--md-elevation-level": "2",
                  } as CSSProperties
                }
                className="relative w-full p-2 rounded-full text-right bg-surfaceContainerLow "
              >
                <MdElevation />
                <MdFilledButton
                  onClick={() => {
                    setIsConfirmDialogOpen(true);
                  }}
                >
                  Submit
                </MdFilledButton>
                <MdDialog
                  open={isConfirmDialogOpen}
                  closed={() => setIsConfirmDialogOpen(false)}
                >
                  <div slot="headline" className="text-pretty text-left">
                    Are you sure you want to submit your registration?
                  </div>
                  <div slot="actions">
                    <MdOutlinedButton
                      onClick={() => setIsConfirmDialogOpen(false)}
                    >
                      Cancel
                    </MdOutlinedButton>
                    <MdFilledButton
                      onClick={() => {
                        setIsConfirmDialogOpen(false);
                        props.onStepChange?.(2);
                      }}
                    >
                      Submit
                    </MdFilledButton>
                  </div>
                </MdDialog>
              </div>
            </motion.div>
          ) : null
        }
      </AnimatePresence>
      <MdTypography variant="body" size="medium">
        Please enter all information in English. (Required field is indicated by
        <span className="text-error">*</span>)
      </MdTypography>
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="User ID"
          required
          value={signUpForm.userId}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, userId: value }));
          }}
        />
        <PassWordTextField
          label="Password"
          required
          value={signUpForm.password}
          onInput={(e) => {
            const value = e.currentTarget.value;
            setSignUpForm((prev) => ({
              ...prev,
              password: value,
            }));
          }}
        />
        <PassWordTextField
          label="Confirm Password"
          required
          value={signUpForm.confirmPassword}
          error={signUpForm.password !== signUpForm.confirmPassword}
          errorText="Password does not match"
          onInput={(e) => {
            const value = e.currentTarget.value;
            setSignUpForm((prev) => ({
              ...prev,
              confirmPassword: value,
            }));
          }}
        />
      </div>
      <DividerComponent className="border-dashed" />
      <DetailTitle title="User Information" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="First Name"
          required
          value={signUpForm.firstName}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, firstName: value }));
          }}
        />
        <NAOutlinedTextField
          label="Last Name"
          required
          value={signUpForm.lastName}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, lastName: value }));
          }}
        />
        <NAOutlinedTextField
          label="Tel No."
          required
          value={signUpForm.tel}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, tel: value }));
          }}
        />
        <NAOutlinedTextField
          label="Fax No."
          required
          value={signUpForm.fax}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, fax: value }));
          }}
        />
        <NAOutlinedTextField
          label="Email"
          required
          className="w-96"
          value={signUpForm.email}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, email: value }));
          }}
        />
      </div>
      <DividerComponent className="border-dashed" />
      <DetailTitle title="Company Information" />
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Company Name"
          required
          className="flex-1"
          value={signUpForm.companyName}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({ ...prev, companyName: value }));
          }}
        />
        <NAOutlinedListBox
          label="Company Type"
          required
          options={[
            "Shipper or Consignee",
            "Forwarder",
            "Carrier",
            "NVOCC",
            "Customs Broker",
            "Warehouse",
            "Trucking",
            "Other",
          ]}
          value={signUpForm.companyType}
          onSelection={(value) => {
            setSignUpForm((prev) => ({ ...prev, companyType: value }));
          }}
        />
        <NAOutlinedListBox
          label="Contact Office"
          required
          options={[
            "Brand Office, Shanghai (China)",
            "Brand Office, Tokyo (Japan)",
            "Brand Office, Seoul (Korea)",
          ]}
          value={signUpForm.contactOffice}
          onSelection={(value) => {
            setSignUpForm((prev) => ({ ...prev, contactOffice: value }));
          }}
        />
        <NAOutlinedListBox
          label="Trade"
          required
          options={["Export & Import", "Export", "Import"]}
          value={signUpForm.trade}
          onSelection={(value) => {
            setSignUpForm((prev) => ({ ...prev, trade: value }));
          }}
        />
      </div>
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Zip Code"
          className="w-40"
          value={signUpForm.address.zipCode}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({
              ...prev,
              address: { ...prev.address, zipCode: value },
            }));
          }}
        />
        <NAOutlinedTextField
          required
          label="Country"
          className="w-48"
          value={signUpForm.address.country}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({
              ...prev,
              address: { ...prev.address, country: value },
            }));
          }}
        />
        <NAOutlinedTextField
          required
          label="City"
          className="flex-1"
          value={signUpForm.address.city}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({
              ...prev,
              address: { ...prev.address, city: value },
            }));
          }}
        />
        <NAOutlinedTextField
          required
          label="Address"
          className="flex-1"
          value={signUpForm.address.street}
          handleValueChange={(value) => {
            setSignUpForm((prev) => ({
              ...prev,
              address: { ...prev.address, street: value },
            }));
          }}
        />
      </div>
      <NAOutlinedTextField
        label="Comment"
        type="textarea"
        rows={5}
        value={signUpForm.comment}
        handleValueChange={(value) => {
          setSignUpForm((prev) => ({ ...prev, comment: value }));
        }}
      />
    </div>
  );
};

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
