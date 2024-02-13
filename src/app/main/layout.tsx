"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">
      <OverlayScrollbarsComponent defer className="flex-1">
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
}
