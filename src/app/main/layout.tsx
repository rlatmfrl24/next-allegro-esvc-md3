"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full flex px-1 py-2">{children}</div>;
}
