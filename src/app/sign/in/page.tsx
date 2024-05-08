"use client";

import {
  MdCheckbox,
  MdElevatedCard,
  MdFilledButton,
  MdIconButton,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { useState } from "react";
import { MdTypography } from "@/app/components/typography";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { UserState } from "@/app/store/global.store";
import Image from "next/image";
import { useRegister } from "../up/main";

export default function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();
  const setUserData = useSetRecoilState(UserState);
  const { renderRegisterDialog, openDialog } = useRegister();

  function DemoSignIn() {
    setUserData({
      isAuthenticated: true,
      name: "Demo User",
      email: "test@mail.kr",
    });
  }

  const [errors, setErrors] = useState<Record<string, string>>({
    key: "",
    errorText: "",
  });

  const errorTest = (key: string, errorText: string) => {
    setErrors({
      key: key,
      errorText: errorText,
    });
  };

  return (
    <div className="h-full flex justify-center items-center">
      {renderRegisterDialog()}
      <MdElevatedCard className="w-[483px] p-12 flex flex-col items-center">
        <Image
          src="/logo_clt.svg"
          width={120}
          height={50}
          alt="logo"
          className="m-4"
        />
        <MdTypography variant="headline" size="medium">
          Login to your Account
        </MdTypography>

        <MdOutlinedTextField
          className={`mt-12 w-full`}
          label="ID"
          value={id}
          onInput={(event) => {
            setId((event.target as HTMLInputElement).value);
          }}
          error={errors.key === "id"}
          errorText={errors.errorText}
        >
          {id.length > 0 && (
            <MdIconButton
              slot="trailing-icon"
              onClick={() => {
                setId("");
              }}
            >
              <CancelIcon />
            </MdIconButton>
          )}
        </MdOutlinedTextField>
        <MdOutlinedTextField
          className={`mt-8 w-full`}
          label="PW"
          type="password"
          value={pw}
          onInput={(event) => {
            setPw((event.target as HTMLInputElement).value);
          }}
          error={errors.key === "pw"}
          errorText={errors.errorText}
        >
          {pw.length > 0 && (
            <MdIconButton
              slot="trailing-icon"
              onClick={() => {
                setPw("");
              }}
            >
              <CancelIcon />
            </MdIconButton>
          )}
        </MdOutlinedTextField>
        <div className="flex justify-between w-full mt-4">
          <label className="flex items-center font-pretendard font-medium text-sm">
            <MdCheckbox touch-target="wrapper"></MdCheckbox>
            Remember me
          </label>

          <MdTextButton
            onClick={() => {
              router.push("/sign/find");
            }}
          >
            Forgot ID/Password?
          </MdTextButton>
        </div>
        <MdFilledButton
          className="mt-6 w-full"
          type="submit"
          disabled={id.length === 0 || pw.length === 0}
          onClick={() => {
            DemoSignIn();
            router.push("/main/dashboard");
          }}
        >
          Sign In
        </MdFilledButton>
        <div className="flex items-center justify-center mt-8">
          <MdTypography variant="body" size="medium">
            {"Don't have an account?"}
          </MdTypography>
          <MdTextButton
            onClick={() => {
              openDialog();
            }}
          >
            Sign Up Here
          </MdTextButton>
        </div>
      </MdElevatedCard>
    </div>
  );
}
