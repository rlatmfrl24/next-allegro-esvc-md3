import TitleIndicator from "@/../public/title_indicator.svg";
import { MdTypography } from "@/app/components/typography";

export default function PointToPointSchedule() {
  return (
    <div className="flex-1 w-full max-w-[1400px]">
      <div className="flex py-6 gap-4 items-center text-primary mx-6">
        <TitleIndicator title="Point to Point Schedule" />
        <MdTypography variant="title" size="large">
          Point to Point
        </MdTypography>
      </div>
    </div>
  );
}
