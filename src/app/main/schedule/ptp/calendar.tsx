"use client";

import { MdOutlinedCard } from "@/app/util/md3";
import TitleIndicator from "@/../public/title_indicator.svg";
import { MdTypography } from "@/app/components/typography";

export default function PointToPointCalendarResult() {
  return (
    <div className="mx-6">
      <div className="flex py-6 gap-4 items-center text-primary">
        <TitleIndicator title="Point to Point Search" />
        <MdTypography variant="title" size="large">
          Result
        </MdTypography>
      </div>

      <MdOutlinedCard className="p-6">Calendar Result</MdOutlinedCard>
    </div>
  );
}
