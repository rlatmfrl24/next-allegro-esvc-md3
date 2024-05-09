"use client";

import { DividerComponent } from "@/app/components/divider";
import PageTitle, { DetailTitle } from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { MdIcon, MdRippleEffect, MdSuggestionChip } from "@/app/util/md3";
import classNames from "classnames";
import SubsumIndicator from "@/../public/icon_subsum_indicator.svg";
import { MdTypography } from "@/app/components/typography";
import { FileDownloadOutlined } from "@mui/icons-material";

type GuideItemProps = {
  id: string;
  title: string;
  downloadLink: string;
};

type GuideCategoryProps = {
  title: string;
  items: GuideItemProps[];
};

const categories: GuideCategoryProps[] = [
  {
    title: "Schedule",
    items: [
      {
        id: "ptp",
        title: "Point to Point Schedule",
        downloadLink: "",
      },
      {
        id: "vessel",
        title: "Vessel Schedule",
        downloadLink: "",
      },
      {
        id: "port",
        title: "Port Schedule",
        downloadLink: "",
      },
      {
        id: "long-range",
        title: "Long Range Schedule",
        downloadLink: "",
      },
      {
        id: "my",
        title: "My Schedule",
        downloadLink: "",
      },
    ],
  },
  {
    title: "Outbound",
    items: [
      {
        id: "precheck",
        title: "Pre Check",
        downloadLink: "",
      },
      {
        id: "booking",
        title: "Booking",
        downloadLink: "",
      },
      {
        id: "si",
        title: "Shipping Instruction",
        downloadLink: "",
      },
      {
        id: "sea-waybill",
        title: "Sea Waybill",
        downloadLink: "",
      },
      {
        id: "simple-si",
        title: "Simple S/I",
        downloadLink: "",
      },
      {
        id: "vgm-submit",
        title: "VGM Submit Guide",
        downloadLink: "",
      },
    ],
  },
  {
    title: "Inbound",
    items: [
      {
        id: "inbound-master",
        title: "Inbound Master",
        downloadLink: "",
      },
      {
        id: "bl-surrender",
        title: "B/L Surrender Check",
        downloadLink: "",
      },
      {
        id: "arrival-notice",
        title: "Arrival Notice",
        downloadLink: "",
      },
      {
        id: "bl-check",
        title: "B/L Check",
        downloadLink: "",
      },
    ],
  },
  {
    title: "Track & Trace",
    items: [
      {
        id: "cargo",
        title: "Cargo Tracking",
        downloadLink: "",
      },
      {
        id: "my",
        title: "My Tracking",
        downloadLink: "",
      },
      {
        id: "visibility",
        title: "Visibility Service",
        downloadLink: "",
      },
    ],
  },
  {
    title: "Report",
    items: [
      {
        id: "report",
        title: "Report",
        downloadLink: "",
      },
      {
        id: "my",
        title: "My Report",
        downloadLink: "",
      },
    ],
  },
  {
    title: "Rate & Tariff",
    items: [
      {
        id: "dem-det",
        title: "DEM/DET",
        downloadLink: "",
      },
    ],
  },
  {
    title: "e-Subscription",
    items: [
      {
        id: "e-subscription",
        title: "e-Subscription",
        downloadLink: " ",
      },
    ],
  },
];

export default function GuideDownloadPage() {
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={cx(styles.container, "h-full ")}>
      <PageTitle title="e-Service Guide" hasFavorite={false} />
      <div className={cx(styles.area, "flex-1")}>
        <div className="grid grid-cols-4 gap-8">
          {categories.map((category) => (
            <GuideCategory key={category.title} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}

const GuideCategory = (props: GuideCategoryProps) => {
  return (
    <div>
      <CategoryTitle title={props.title} />
      <div className="flex flex-col px-4 ">
        {props.items.map((item) => (
          <GuideItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const CategoryTitle = (props: { title: string }) => {
  return (
    <div className="flex items-center gap-4 px-8 py-6">
      <DetailTitle title={props.title} />
      <DividerComponent className="border-dashed" />
      <MdSuggestionChip label="Download All " />
    </div>
  );
};

const GuideItem = (props: GuideItemProps) => {
  return (
    <div className="flex p-4 items-center hover:bg-secondaryContainer cursor-pointer rounded-full relative">
      <MdRippleEffect />
      <SubsumIndicator />
      <MdTypography variant="body" size="large" className="ml-2 flex-1">
        {props.title}
      </MdTypography>
      <MdIcon>
        <FileDownloadOutlined />
      </MdIcon>
    </div>
  );
};
