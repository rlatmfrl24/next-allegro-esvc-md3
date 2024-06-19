"use client";

import { SurchargeSearch } from "@/app/main/pricing/surcharge/body";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function QuickSurchargeSearch() {
  return (
    <OverlayScrollbarsComponent defer className="h-full">
      <div className="h-full flex flex-col">
        <SurchargeSearch />
      </div>
    </OverlayScrollbarsComponent>
  );
}
