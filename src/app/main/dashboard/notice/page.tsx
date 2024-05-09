"use client";

import { BasicTable } from "@/app/components/table/basic-table";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdIcon,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useMemo, useState } from "react";

type NoticeProps = {
  title: string;
  contents: string;
  date: DateTime;
};

function createDummyNotice(): NoticeProps {
  return {
    title: faker.lorem.sentence(),
    contents: faker.lorem.paragraph(),
    date: DateTime.fromJSDate(faker.date.recent()),
  };
}

export default function NoticePage() {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const [searchType, setSearchType] = useState<"title" | "contents">("title");
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyNotice());
  }, []);
  const [tableData, setTableData] = useState<NoticeProps[]>(tempData);
  const columnHelper = createColumnHelper<NoticeProps>();

  const columnDefs = [
    columnHelper.accessor("title", {
      id: "title",
      header: "Title",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
      size: 500,
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "Date",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd")}
          </MdTypography>
        );
      },
      size: 80,
      maxSize: 80,
    }),
  ];

  return (
    <OverlayScrollbarsComponent defer className="h-full overflow-auto m-2">
      <div aria-label="container" className={cx(styles.container, "h-fit")}>
        <div className="flex items-center h-fit gap-4">
          <MdOutlinedButton
            onClick={() => {
              router.back();
            }}
          >
            <MdIcon slot="icon">
              <KeyboardArrowLeft fontSize="small" />
            </MdIcon>
            Back
          </MdOutlinedButton>
          <PageTitle title="e-Service Notice" />
        </div>
        <div className={cx(styles.area)}>
          <MdOutlinedSegmentedButtonSet>
            <MdOutlinedSegmentedButton
              selected={searchType === "title"}
              label="Title"
              onClick={() => setSearchType("title")}
            />
            <MdOutlinedSegmentedButton
              selected={searchType === "contents"}
              label="Contents"
              onClick={() => {
                console.log("contents");
                setSearchType("contents");
              }}
            />
          </MdOutlinedSegmentedButtonSet>
          {searchType === "title" ? (
            <MdOutlinedTextField label="Title" className="w-[640px]" />
          ) : (
            <MdOutlinedTextField label="Contents" className="w-[640 px]" />
          )}
        </div>
        <div className={cx(styles.area, "flex-1")}>
          <BasicTable
            ActionComponent={() => {
              return <div className="flex-1"></div>;
            }}
            data={tableData}
            columns={columnDefs}
          />
        </div>
      </div>
    </OverlayScrollbarsComponent>
  );
}
