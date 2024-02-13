"use client";

import { usePathname } from "next/navigation";

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <aside
      className={`
    ${pathname.split("/").includes("main") ? "w-20" : "w-0"}`}
    ></aside>
  );
}
