"use client";

import { MdOutlinedCard } from "@/app/util/md3";
import TitleIndicator from "@/../public/title_indicator.svg";
import { MdTypography } from "@/app/components/typography";

export default function PointToPointListResult() {
  return (
    <div className="relative mx-6">
      <div className="flex py-6 gap-4 items-center text-primary">
        <TitleIndicator title="Point to Point Search" />
        <MdTypography variant="title" size="large">
          Result
        </MdTypography>
      </div>

      <MdOutlinedCard className="p-6">List Result</MdOutlinedCard>
    </div>
  );
}
