import { DateTime } from "luxon";
import { MdTypography, Typography } from "../components/typography";
import { MdElevation } from "../util/md3";
import style from "./sign.module.css";

export default function QuickMenu() {
  return (
    <div className="flex flex-col gap-6 h-full absolute z-10 right-0 p-16 w-[848px]">
      <QuickSearch />
      <Notice />
    </div>
  );
}

const QuickSearch = () => {
  return (
    <div className={style.card + ` p-12`}>
      <MdElevation />
      Quick Search
    </div>
  );
};

const Notice = () => {
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
          target="label"
          size="large"
          className="text-primary font-semibold"
        >
          {category}
        </MdTypography>
        <div className="w-px h-4 bg-gray-200">&nbsp;</div>
        <MdTypography target="label" size="large" className="flex-1">
          {content}
        </MdTypography>
        <MdTypography target="label" size="large">
          {dateObject.toFormat("LLLL dd, yyyy")}
        </MdTypography>
      </div>
    );
  };
  return (
    <div className={style.card + ` p-12`}>
      <MdElevation />
      <MdTypography target="title" size="large" className="mb-4">
        Notice
      </MdTypography>

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
    </div>
  );
};
