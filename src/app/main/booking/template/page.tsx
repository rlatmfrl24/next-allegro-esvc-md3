"use client";

import { BasicTable } from "@/app/components/table/basic-table";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { BookingTemplateListState } from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton } from "@/app/util/md3";
import { BookingTemplateProps } from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { DateTime } from "luxon";
import { useState } from "react";
import { useRecoilValue } from "recoil";

type BookingTemplateTableProps = {
  templateName: string;
  remarks: string;
  origin: string;
  destination: string;
  shipper: string;
  consignee: string;
  createdDate: DateTime;
  lastUpdated: DateTime;
};

function convertTemplateToTableProps(
  template: BookingTemplateProps
): BookingTemplateTableProps {
  return {
    templateName: template.name,
    remarks: "",
    origin: template.information.locationSchedule?.originPort.yardName ?? "",
    destination:
      template.information.locationSchedule?.destinationPort.yardName ?? "",
    shipper: template.information.parties?.shipper.name ?? "",
    consignee: template.information.parties?.consignee.name ?? "",
    createdDate: DateTime.fromJSDate(faker.date.past()),
    lastUpdated: DateTime.fromJSDate(faker.date.recent()),
  };
}

export default function BookingTemplate() {
  const cx = classNames.bind(styles);
  const templates = useRecoilValue(BookingTemplateListState);
  const [tableData, setTableData] = useState<BookingTemplateTableProps[]>(
    templates.map(convertTemplateToTableProps)
  );

  const columnHelper = createColumnHelper<BookingTemplateTableProps>();

  const columnDefs = [
    columnHelper.accessor("templateName", {
      id: "templateName",
      header: "Template Name",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("origin", {
      id: "origin",
      header: "Origin",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("destination", {
      id: "destination",
      header: "Destination",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("shipper", {
      id: "shipper",
      header: "Shipper",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("consignee", {
      id: "consignee",
      header: "Consignee",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("createdDate", {
      id: "createdDate",
      header: "Created Date",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("lastUpdated", {
      id: "lastUpdated",
      header: "Last Updated",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd")}
          </MdTypography>
        );
      },
    }),
  ];

  return (
    <div
      aria-label="container"
      className={cx(styles.container, "flex-1 flex-col")}
    >
      <div className="flex items-center justify-between">
        <PageTitle title="Booking Template" />
        <MdOutlinedButton>Create New Template</MdOutlinedButton>
      </div>
      <div className={cx(styles.area, "flex-1")}>
        <BasicTable columns={columnDefs} data={tableData} isSingleSelect />
      </div>
    </div>
  );
}
