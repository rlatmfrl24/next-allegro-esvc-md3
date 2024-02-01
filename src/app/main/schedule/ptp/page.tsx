import PointToPointCalendarResult from "./calendar";
import PointToPointListResult from "./list";
import PointToPointSearchPanel from "./search";

export default function PointToPointSchedule() {
  return (
    <div className="flex-1 w-full max-w-[1400px]">
      <PointToPointSearchPanel />
      <PointToPointListResult />
      <PointToPointCalendarResult />
    </div>
  );
}
