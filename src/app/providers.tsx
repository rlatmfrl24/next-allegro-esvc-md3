"use client";

import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { createMDTheme } from "./util/theme";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    createMDTheme("#29638A");
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
