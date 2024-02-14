"use client";

import PointToPointCalendarResult from "./calendar";
import PointToPointListResult from "./list";
import PointToPointSearchPanel from "./search";

export default function PointToPointSchedule() {
  return (
    <div className="relative flex-1 flex justify-center">
      <div aria-label="container" className="max-w-[1400px]">
        <PointToPointSearchPanel />
        <PointToPointListResult />
        <PointToPointCalendarResult />
      </div>
    </div>
  );
}
