"use client";

import classNames from "classnames";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { UserProfileState } from "@/app/store/global.store";
import styles from "@/app/styles/base.module.css";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
  InfoOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

const PasswordUpdateDialog = (props: {
  currentPassword: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onRequestUpdate: (password: string) => void;
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [inputCurrentPassword, setInputCurrentPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputNewPasswordConfirm, setInputNewPasswordConfirm] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [errorState, setErrorState] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  function clearInput() {
    setInputCurrentPassword("");
    setInputNewPassword("");
    setInputNewPasswordConfirm("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowNewPasswordConfirm(false);
    setErrorState({
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
  }

  // regex for Use 8 to 16 alphanumeric characters.
  const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,16}$");

  useEffect(() => {
    console.log("Current Password: ", props.currentPassword);
  }, [props.currentPassword]);

  return (
    <>
      <MdDialog
        open={props.open}
        closed={() => {
          props.onOpenChange(false);
          clearInput();
        }}
      >
        <div slot="headline">Password Update</div>
        <div slot="content" className="flex flex-col gap-8 mb-4 ">
          <MdDialog
            open={isConfirmDialogOpen}
            closed={() => {
              setIsConfirmDialogOpen(false);
            }}
          >
            <div slot="headline">
              {errorState.currentPassword === "" &&
              errorState.newPassword === "" &&
              errorState.newPasswordConfirm === ""
                ? "Successfully"
                : "Unsuccessfully"}
            </div>
            <div slot="content">
              {errorState.currentPassword === "" &&
              errorState.newPassword === "" &&
              errorState.newPasswordConfirm === "" ? (
                <MdTypography variant="body" size="medium">
                  Password has been successfully updated.
                </MdTypography>
              ) : (
                <MdTypography variant="body" size="medium">
                  Password has not been updated. Please check your password.
                </MdTypography>
              )}
            </div>
            <div slot="actions">
              <MdOutlinedButton
                onClick={() => {
                  if (
                    errorState.currentPassword === "" &&
                    errorState.newPassword === "" &&
                    errorState.newPasswordConfirm === ""
                  ) {
                    props.onOpenChange(false);
                    setIsConfirmDialogOpen(false);
                    props.onRequestUpdate(inputNewPassword);
                    clearInput();
                  } else {
                    setIsConfirmDialogOpen(false);
                  }
                }}
              >
                Close
              </MdOutlinedButton>
            </div>
          </MdDialog>
          <MdTypography variant="body" size="medium">
            Use 8 to 16 alphanumeric characters.
          </MdTypography>
          <NAOutlinedTextField
            label="Current Password"
            value={inputCurrentPassword}
            type={showCurrentPassword ? "text" : "password"}
            required
            enableClearButton={false}
            handleValueChange={setInputCurrentPassword}
            error={errorState.currentPassword !== ""}
            errorText={errorState.currentPassword}
            onBlur={() => {
              if (inputCurrentPassword !== props.currentPassword) {
                setErrorState({
                  ...errorState,
                  currentPassword: "Incorrect Password",
                });
              } else if (inputCurrentPassword === "") {
                setErrorState({
                  ...errorState,
                  currentPassword: "Please enter your password",
                });
              } else if (regex.test(inputCurrentPassword) === false) {
                setErrorState({
                  ...errorState,
                  currentPassword:
                    "Password must be at least 8 characters and 16 characters at most",
                });
              } else {
                setErrorState({
                  ...errorState,
                  currentPassword: "",
                });
              }
            }}
          >
            <MdIconButton
              slot="trailing-icon"
              onClick={() => {
                setShowCurrentPassword(!showCurrentPassword);
              }}
            >
              <MdIcon>
                {showCurrentPassword ? (
                  <VisibilityOffOutlined />
                ) : (
                  <VisibilityOutlined />
                )}
              </MdIcon>
            </MdIconButton>
          </NAOutlinedTextField>
          <NAOutlinedTextField
            label="New Password"
            value={inputNewPassword}
            type={showNewPassword ? "text" : "password"}
            required
            enableClearButton={false}
            handleValueChange={setInputNewPassword}
            error={errorState.newPassword !== ""}
            errorText={errorState.newPassword}
            onBlur={() => {
              if (inputNewPassword === "") {
                setErrorState({
                  ...errorState,
                  newPassword: "Please enter your password",
                });
              } else if (regex.test(inputNewPassword) === false) {
                setErrorState({
                  ...errorState,
                  newPassword:
                    "Password must be at least 8 characters and 16 characters at most",
                });
              } else {
                setErrorState({
                  ...errorState,
                  newPassword: "",
                });
              }
            }}
          >
            <MdIconButton
              slot="trailing-icon"
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            >
              <MdIcon>
                {showNewPassword ? (
                  <VisibilityOffOutlined />
                ) : (
                  <VisibilityOutlined />
                )}
              </MdIcon>
            </MdIconButton>
          </NAOutlinedTextField>
          <NAOutlinedTextField
            label="Confirm New Password"
            value={inputNewPasswordConfirm}
            type={showNewPasswordConfirm ? "text" : "password"}
            required
            enableClearButton={false}
            handleValueChange={setInputNewPasswordConfirm}
            error={errorState.newPasswordConfirm !== ""}
            errorText={errorState.newPasswordConfirm}
            onBlur={() => {
              if (inputNewPasswordConfirm !== inputNewPassword) {
                setErrorState({
                  ...errorState,
                  newPasswordConfirm: "Password does not match",
                });
              } else if (inputNewPasswordConfirm === "") {
                setErrorState({
                  ...errorState,
                  newPasswordConfirm: "Please enter your password",
                });
              } else {
                setErrorState({
                  ...errorState,
                  newPasswordConfirm: "",
                });
              }
            }}
          >
            <MdIconButton
              slot="trailing-icon"
              onClick={() => {
                setShowNewPasswordConfirm(!showNewPasswordConfirm);
              }}
            >
              <MdIcon>
                {showNewPasswordConfirm ? (
                  <VisibilityOffOutlined />
                ) : (
                  <VisibilityOutlined />
                )}
              </MdIcon>
            </MdIconButton>
          </NAOutlinedTextField>
        </div>
        <div slot="actions">
          <MdOutlinedButton onClick={() => props.onOpenChange(false)}>
            Cancel
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              props.onRequestUpdate("password");
              setIsConfirmDialogOpen(true);
              // props.onOpenChange(false);
            }}
          >
            Request for Update
          </MdFilledButton>
        </div>
      </MdDialog>
    </>
  );
};

export default function MyProfilePage() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const [isPasswordUpdateDialogOpen, setIsPasswordUpdateDialogOpen] =
    useState(false);
  const cx = classNames.bind(styles);
  const tempContactOffices = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      return faker.location.city() + " Agent";
    });
  }, []);
  const countryOptions = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      return faker.location.country();
    });
  }, []);
  const cityOptions = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      return faker.location.city();
    });
  }, []);
  const contractNumberOptions = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      return faker.string.alphanumeric(10).toUpperCase();
    });
  }, []);

  const companyTypeOptions = [
    "Shipper or Consignee",
    "Freight Forwarder",
    "Shipping Carrier",
    "Truck or Rail Company",
    "Others",
  ];

  return (
    <>
      <PasswordUpdateDialog
        currentPassword={userProfile.password}
        open={isPasswordUpdateDialogOpen}
        onOpenChange={setIsPasswordUpdateDialogOpen}
        onRequestUpdate={(password) => {
          console.log("Password Updated: ", password);
          setUserProfile({ ...userProfile, password: password });
        }}
      />
      <div
        aria-label="container"
        className={cx(styles.container, "flex-1 flex")}
      >
        <div className={cx(styles.area, "flex-1 flex")}>
          <div className="border-2 border-secondaryContainer flex-1 rounded-lg flex flex-col">
            <MdTypography
              variant="title"
              size="large"
              className="bg-secondaryContainer p-4"
            >
              My Profile
            </MdTypography>
            <div className="flex flex-1 flex-col gap-4 px-6 py-12">
              <div className="flex gap-4 items-center">
                <NAOutlinedTextField
                  label="User ID"
                  value={userProfile.userId}
                  readOnly
                />
                <NAOutlinedTextField
                  label="Customer ID"
                  value={faker.string.alphanumeric(10).toUpperCase()}
                  readOnly
                />
                <MdOutlinedButton
                  onClick={() => {
                    setIsPasswordUpdateDialogOpen(true);
                  }}
                >
                  Password Update
                </MdOutlinedButton>
                <MdTextButton>Withdrawal</MdTextButton>
              </div>
              <div className="flex items-center gap-4">
                <SubTitle title="User Information" className="w-fit flex-1" />
                <DividerComponent />
              </div>
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="First Name"
                  value={userProfile.firstName}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, firstName: value });
                  }}
                />
                <NAOutlinedTextField
                  label="Last Name"
                  value={userProfile.lastName}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, lastName: value });
                  }}
                />
              </div>
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="Tel No."
                  type="tel"
                  value={userProfile.tel}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, tel: value });
                  }}
                />
                <NAOutlinedTextField
                  label="Fax No."
                  type="tel"
                  value={userProfile.fax}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, fax: value });
                  }}
                />
              </div>
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="E-mail"
                  type="email"
                  value={userProfile.email}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, email: value });
                  }}
                />
                <NAOutlinedListBox
                  options={["Import", "Export", "Export & Import"]}
                  label="Trade"
                  initialValue={userProfile.trade}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, trade: value });
                  }}
                />
                <NAOutlinedListBox
                  options={tempContactOffices}
                  label="Contact Office"
                  initialValue={userProfile.contactOffice}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, contactOffice: value });
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <SubTitle title="Company Information" className="flex-1" />
                <DividerComponent />
              </div>
              <div className="flex gap-4 items-center">
                <NAOutlinedTextField
                  label="Company Name"
                  readOnly
                  required
                  className="w-96"
                  value={userProfile.companyName}
                />
                <MdOutlinedButton>Company Update</MdOutlinedButton>
              </div>
              <div className="flex gap-4 items-center">
                <NAOutlinedListBox
                  options={countryOptions}
                  label="Country"
                  initialValue={userProfile.address.country}
                  onSelection={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, country: value },
                    });
                  }}
                />
                <NAOutlinedAutoComplete
                  itemList={cityOptions}
                  label="City"
                  initialValue={userProfile.address.city}
                  onItemSelection={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, city: value },
                    });
                  }}
                />
                <NAOutlinedTextField
                  label="Zip Code"
                  className="w-36"
                  value={userProfile.address.zipCode}
                  handleValueChange={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, zipCode: value },
                    });
                  }}
                />
                <NAOutlinedTextField
                  className="flex-1"
                  label="Address"
                  value={userProfile.address.street}
                  handleValueChange={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, street: value },
                    });
                  }}
                />
              </div>
              <div className="flex gap-4 items-center">
                <NAOutlinedListBox
                  options={companyTypeOptions}
                  label="Company Type"
                  initialValue={userProfile.companyType}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, companyType: value });
                  }}
                />
                <NAOutlinedListBox
                  options={contractNumberOptions}
                  label="Contract No."
                  initialValue={userProfile.recentBLNumber}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, recentBLNumber: value });
                  }}
                />
                <MdOutlinedButton>Contra ct No. Update</MdOutlinedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
