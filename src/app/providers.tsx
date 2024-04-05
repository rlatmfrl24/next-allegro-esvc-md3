"use client";

import { Suspense, useEffect, useLayoutEffect } from "react";
import { RecoilRoot } from "recoil";
import { applyPresetTheme, createMDTheme } from "./util/theme";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLayoutEffect(() => {
    applyPresetTheme("default");
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
