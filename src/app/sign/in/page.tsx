"use client";

import {
  MdCheckbox,
  MdElevatedCard,
  MdFilledButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import Link from "next/link";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { useState } from "react";
import { MdTypography } from "@/app/components/typography";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { UserState } from "@/app/store/global.store";

export default function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();
  const setUserData = useSetRecoilState(UserState);

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
      <MdElevatedCard className="w-[483px] p-12">
        <span className="font-pretendard text-xl">Welcome!</span>
        <span
          className="font-pretendard text-3xl"
          onClick={() => {
            // Test Function
            errorTest(
              "pw",
              "Wrong password. Try again or click forgot password to reset it."
            );
          }}
        >
          Login to your Account
        </span>
        <MdOutlinedTextField
          className={`mt-12`}
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
          className={`mt-8`}
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
        <div className="flex justify-between">
          <label className="flex items-center font-pretendard font-medium text-sm">
            <MdCheckbox touch-target="wrapper"></MdCheckbox>
            Remember me
          </label>

          <Link href={`/sign`} className="cursor-pointer flex items-center">
            <MdTypography variant="label" size="large" className="text-primary">
              Forgot Password?
            </MdTypography>
          </Link>
        </div>
        <MdFilledButton
          className="mt-12"
          type="submit"
          disabled={id.length === 0 || pw.length === 0}
          onClick={() => {
            DemoSignIn();
            router.push("/main/dashboard");
          }}
        >
          Sign In
        </MdFilledButton>
        <div className="flex items-center justify-center mt-12">
          <MdTypography variant="body" size="medium">
            {"Don't have an account?"}
          </MdTypography>
          <Link href={`/sign/up`} className="cursor-pointer text-primary px-3">
            <MdTypography variant="label" size="large">
              Sign Up Here
            </MdTypography>
          </Link>
        </div>
      </MdElevatedCard>
    </div>
  );
}
