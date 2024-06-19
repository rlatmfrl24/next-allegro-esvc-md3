"use client";
import { BasicTable } from "@/app/components/table/basic-table";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdAssistChip,
  MdFilledButton,
  MdIcon,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { AttachFile, KeyboardArrowLeft } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useMemo, useState } from "react";
import { NoticeProps, createDummyNotice } from "./util";
import { faker } from "@faker-js/faker";
import { DividerComponent } from "@/app/components/divider";

export default function NoticePage() {
  const cx = classNames.bind(styles);
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyNotice());
  }, []);
  const [tableData, setTableData] = useState<NoticeProps[]>(tempData);
  const columnHelper = createColumnHelper<NoticeProps>();
  const [pageState, setPageState] = useState<"list" | "detail">("list");
  const [selectedData, setSelectedData] = useState<NoticeProps>();

  const columnDefs = [
    columnHelper.accessor("title", {
      id: "title",
      header: "Title",
      cell: (info) => {
        return (
          <div
            className="cursor-pointer flex-1 h-full"
            onClick={() => {
              setSelectedData(info.row.original);
              setPageState("detail");
            }}
          >
            <MdTypography variant="body" size="medium">
              {info.getValue()}
            </MdTypography>
          </div>
        );
      },
      size: 500,
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "Reporting Date",
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
      {pageState === "list" ? (
        <>
          <div
            aria-label="container"
            className={cx(styles.container, "min-h-fit")}
          >
            <div className="flex items-center h-fit gap-4">
              <MdOutlinedButton
                onClick={() => {
                  setSelectedData(undefined);
                  setPageState("list");
                }}
              >
                <MdIcon slot="icon">
                  <KeyboardArrowLeft fontSize="small" />
                </MdIcon>
                Back
              </MdOutlinedButton>
              <PageTitle title="e-Service Notice" hasFavorite={false} />
            </div>
            <div className={cx(styles.area, styles.row, "justify-between")}>
              <MdOutlinedTextField
                label="Title or Contents"
                className="w-[640px]"
              />
              <MdFilledButton>Search</MdFilledButton>
            </div>
            <div className={cx(styles.area, "flex-1")}>
              <BasicTable
                ActionComponent={() => {
                  return <div className="flex-1"></div>;
                }}
                data={tableData}
                columns={columnDefs}
                isSingleSelect
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            aria-label="container"
            className={cx(styles.container, "min-h-full")}
          >
            <div className="flex items-center h-fit gap-4">
              <MdOutlinedButton
                onClick={() => {
                  setPageState("list");
                }}
              >
                <MdIcon slot="icon">
                  <KeyboardArrowLeft fontSize="small" />
                </MdIcon>
                Back
              </MdOutlinedButton>
              <PageTitle
                title={selectedData?.title ?? ""}
                hasFavorite={false}
              />
            </div>
            <div
              className={cx(
                styles.area,
                styles["no-padding"],
                "flex-1 overflow-hidden flex flex-col"
              )}
            >
              <div className="h-3 bg-secondaryContainer"></div>
              <div className="px-6 pt-2 pb-6 flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    {faker.datatype.boolean() && (
                      <MdAssistChip
                        className="w-fit"
                        label={
                          faker.system.fileName() + "." + faker.system.fileExt()
                        }
                      >
                        <MdIcon slot="icon">
                          <AttachFile fontSize="small" />
                        </MdIcon>
                      </MdAssistChip>
                    )}
                  </div>
                  <MdTypography variant="body" size="medium">
                    {selectedData?.date.toFormat("yyyy-MM-dd")}
                  </MdTypography>
                </div>
                <DividerComponent className="my-6 border-dotted" />
                <MdTypography variant="body" size="large">
                  {selectedData?.contents.split(". ").map((content, index) => (
                    <p key={index}>{content}.</p>
                  ))}
                </MdTypography>
              </div>
            </div>
          </div>
        </>
      )}
    </OverlayScrollbarsComponent>
  );
}
