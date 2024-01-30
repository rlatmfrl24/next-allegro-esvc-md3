import { DateTime } from "luxon";
import { MdTypography } from "../typography";

export default function QuickNotice() {
  // TODO: this is a dummy data, replace it with real data
  return (
    <>
      <NoticeItem
        category="BULK"
        date="2021-09-27"
        content="Notice of change of call surcharge (CAF) for Hanil route.."
      />
      <NoticeItem
        category="Other Charge"
        date="2021-09-27"
        content="Container Cargo Port Safety Management Fee.."
      />

      <NoticeItem
        category="BULK"
        date="2021-09-27"
        content="Notice of change of call surcharge (CAF) for Hanil route.."
      />

      <NoticeItem
        category="Other Charge"
        date="2021-09-27"
        content="Container Cargo Port Safety Management Fee.."
      />
      <NoticeItem
        category="BULK"
        date="2021-09-27"
        content="Notice of change of call surcharge (CAF) for Hanil route.."
      />

      <NoticeItem
        category="Other Charge"
        date="2021-09-27"
        content="Container Cargo Port Safety Management Fee.."
      />
    </>
  );
}

const NoticeItem = ({
  category,
  date,
  content,
}: {
  category: string;
  date: string;
  content: string;
}) => {
  const dateObject = DateTime.fromISO(date);

  return (
    <div className="flex items-center gap-2">
      <MdTypography
        variant="label"
        size="large"
        className="text-primary font-semibold"
      >
        {category}
      </MdTypography>
      <div className="w-px h-4 bg-gray-200">&nbsp;</div>
      <MdTypography variant="label" size="large" className="flex-1">
        {content}
      </MdTypography>
      <MdTypography
        variant="label"
        size="medium"
        className="text-onSurface opacity-35"
      >
        {dateObject.toFormat("LLLL dd, yyyy")}
      </MdTypography>
    </div>
  );
};
