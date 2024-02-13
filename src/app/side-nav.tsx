"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideNavigation() {
  const pathname = usePathname();
  const [isMain, setIsMain] = useState(false);

  pathname.split("/").includes("main");

  useEffect(() => {
    setIsMain(pathname.split("/").includes("main"));
  }, [pathname]);

  return (
    <aside
      className={`
    ${isMain ? "w-20" : "w-0"}`}
    ></aside>
  );
}
