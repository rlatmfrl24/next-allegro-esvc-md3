"use client";

import { useEffect } from "react";
import { createMDTheme } from "./util/md3";
import { RecoilRoot } from "recoil";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    createMDTheme("#f44336", "#000000");
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
