import { MdTypography } from "@/app/components/typography";
import { MdElevation } from "@/app/util/md3";
import { DateTime } from "luxon";
import styles from "@/app/components/components.module.css";

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
        <MdTypography
          target="label"
          size="medium"
          className="text-onSurface opacity-35"
        >
          {dateObject.toFormat("LLLL dd, yyyy")}
        </MdTypography>
      </div>
    );
  };
  return (
    <div className={styles.card + ` p-12`}>
      <MdElevation />
      <MdTypography target="title" size="large" className="mb-4">
        Notice
      </MdTypography>

      {/*
       * TODO: this is a dummy data, replace it with real data
       */}
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
    </div>
  );
};

export default Notice;
