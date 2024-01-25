"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isSigningState } from "../store";

export default function SignUp() {
  const setIsSigning = useSetRecoilState<boolean>(isSigningState);

  useEffect(() => {
    setIsSigning(true);
    return () => {
      setIsSigning(false);
    };
  }, [setIsSigning]);
  return <div className="flex-1 flex justify-center items-center">Sign Up</div>;
}
