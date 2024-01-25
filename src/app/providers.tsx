"use client";

import { useEffect } from "react";
import { createMDTheme } from "./util/md3";
import { RecoilRoot } from "recoil";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   createMDTheme("#009FE8", "#009FE8");
  // }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
