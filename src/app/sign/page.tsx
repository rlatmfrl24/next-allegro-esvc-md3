"use client";

import { useSetRecoilState } from "recoil";
import { isSigningState } from "./store";
import { useEffect } from "react";
import CatchPhrase from "./catch-phrase";
import BackgroundSwiper from "./background-swiper";
import QuickMenu from "./quick-menu/quick-menu";

export default function Sign() {
  const setIsSigning = useSetRecoilState(isSigningState);

  useEffect(() => {
    setIsSigning(false);
    return () => {
      setIsSigning(false);
    };
  }, [setIsSigning]);

  return (
    <div className="flex-1 flex relative">
      <QuickMenu />
      <CatchPhrase />
      <BackgroundSwiper />
    </div>
  );
}
