import { DateTime } from "luxon";
import { MdTypography } from "../typography";

export default function QuickNotice() {
  // TODO: this is a dummy data, replace it with real data
  return (
    <>
      <NoticeItem
        date="2021-09-27"
        content="Notice of change of call surcharge (CAF) for Hanil route.."
      />
      <NoticeItem
        date="2021-09-27"
        content="Container Cargo Port Safety Management Fee.."
      />

      <NoticeItem
        date="2021-09-27"
        content="Notice of change of call surcharge (CAF) for Hanil route.."
      />

      <NoticeItem
        date="2021-09-27"
        content="Container Cargo Port Safety Management Fee.."
      />
      <NoticeItem
        date="2021-09-27"
        content="Notice of change of call surcharge (CAF) for Hanil route.."
      />
    </>
  );
}

const NoticeItem = ({ date, content }: { date: string; content: string }) => {
  const dateObject = DateTime.fromISO(date);

  return (
    <div className="flex items-center gap-2">
      <MdTypography variant="body" size="medium" className="flex-1">
        {content}
      </MdTypography>
      <MdTypography variant="body" size="small" className="text-outline">
        {dateObject.toFormat("yyyy-MM-dd ")}
      </MdTypography>
    </div>
  );
};
