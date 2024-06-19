import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const PasswordUpdateDialog = (props: {
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

  // useEffect(() => {
  //   console.log("Current Password: ", props.currentPassword);
  // }, [props.currentPassword]);

  return (
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
  );
};
