"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Portal from "../components/portal";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex p-2">
      <OverlayScrollbarsComponent defer className="flex-1">
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
}
