"use client";

import { DividerComponent } from "@/app/components/divider";
import PageTitle, { DetailTitle } from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import { MdIcon, MdRippleEffect, MdSuggestionChip } from "@/app/util/md3";
import classNames from "classnames";
import SubsumIndicator from "@/../public/icon_subsum_indicator.svg";
import { MdTypography } from "@/app/components/typography";
import { FileDownloadOutlined } from "@mui/icons-material";
import { menuItems } from "@/app/util/constants";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

type GuideItemProps = {
  id: string;
  title: string;
  downloadLink: string;
};

type GuideCategoryProps = {
  title: string;
  items: GuideItemProps[];
};

export default function GuideDownloadPage() {
  const cx = classNames.bind(styles);

  return (
    <OverlayScrollbarsComponent defer className="h-full mx-2">
      <div aria-label="container" className={cx(styles.container, "h-fit")}>
        <PageTitle title="e-Service Guide" hasFavorite={false} />
        <div className={cx(styles.area, "h-fit flex-1")}>
          <div className="grid grid-cols-4 gap-8">
            {menuItems
              .filter((item) => item.id !== "dashboard")
              .map((item) => (
                <GuideCategory
                  key={item.id}
                  title={item.name}
                  items={item.subMenu!.map((subItem) => {
                    return {
                      id: subItem.id,
                      title: subItem.name,
                      downloadLink: subItem.link,
                    } as GuideItemProps;
                  })}
                />
              ))}
          </div>
        </div>
      </div>
    </OverlayScrollbarsComponent>
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
