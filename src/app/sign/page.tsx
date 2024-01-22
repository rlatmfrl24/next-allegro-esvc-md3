"use client";

import { useSetRecoilState } from "recoil";
import { isSigningState } from "./store";
import { useEffect } from "react";

export default function Sign() {
  const setIsSigning = useSetRecoilState(isSigningState);

  useEffect(() => {
    setIsSigning(false);
  }, [setIsSigning]);

  return <div className="flex-1">11</div>;
}
