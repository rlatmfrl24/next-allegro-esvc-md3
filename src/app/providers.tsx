"use client";

import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { applyPresetTheme, createMDTheme } from "./util/theme";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // createMDTheme("#008E86");
    applyPresetTheme("default");
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
