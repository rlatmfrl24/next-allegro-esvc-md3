"use client";

import { useLayoutEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { applyPresetTheme } from "./util/theme";
import { MdCircularProgress } from "./util/md3";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // When mounted on client, now we can show the UI
  const [isMounted, setIsMounted] = useState(false);
  useLayoutEffect(() => {
    applyPresetTheme("NA", false, () => {
      setIsMounted(true);
    });
  }, []);

  return isMounted ? (
    <RecoilRoot>{children}</RecoilRoot>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <MdCircularProgress indeterminate />
    </div>
  );
}
