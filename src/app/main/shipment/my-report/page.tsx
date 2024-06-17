"use client";

import { BasicTable } from "@/app/components/table/basic-table";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  basicDropdownStyles,
  getBasicDropdownStyles,
} from "@/app/util/constants";
import {
  MdDialog,
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdListItem,
  MdOutlinedButton,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { MoreVert } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type MyReportTableProps = {
  name: string;
  date: "Departure" | "Arrival";
  byCustomer: string;
  byContract: string;
  emailService: boolean;
  pol: string;
  pod: string;
  recipients: string[];
  lastSendingDate: DateTime;
  searchingPeriod: number;
  sendingCycle: "Daily" | "Weekly" | "Monthly";
};

function createMyReportData(): MyReportTableProps {
  return {
    name: "My Report " + faker.string.numeric(2),
    date: faker.helpers.arrayElement(["Departure", "Arrival"]),
    byCustomer: faker.helpers
      .arrayElements(["Shipper", "Consignee", "Notify", "Forwarder"])
      .join(", "),
    byContract: faker.string.alphanumeric(10).toUpperCase(),
    emailService: faker.datatype.boolean(),
    pol: faker.location.city() + ", " + faker.location.country(),
    pod: faker.location.city() + ", " + faker.location.country(),
    recipients: [],
    lastSendingDate: DateTime.fromJSDate(faker.date.recent()),
    searchingPeriod: faker.number.int({ max: 5 }),
    sendingCycle: faker.helpers.arrayElement(["Daily", "Weekly", "Monthly"]),
  } as MyReportTableProps;
}

export default function MyReportPage() {
  const tempReports = useMemo(
    () => Array.from({ length: 50 }, () => createMyReportData()),
    []
  );
  const [tableData, setTableData] = useState<MyReportTableProps[]>(tempReports);
  const router = useRouter();
  const columnHelper = createColumnHelper<MyReportTableProps>();
  const columnDefs = [
    columnHelper.display({
      id: "radio",
      cell: (info) => (
        <div className="flex justify-center">
          <MdRadio checked={info.row.getIsSelected()} />
        </div>
      ),
      size: 50,
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: "Name",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("byCustomer", {
      id: "byCustomer",
      header: "By Customer",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("byContract", {
      id: "byContract",
      header: "By Contract",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("emailService", {
      id: "emailService",
      header: "Email Service",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Y" : "N"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pol", {
      id: "pol",
      header: "Port of Loading",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pod", {
      id: "pod",
      header: "Port of Discharging",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("recipients", {
      id: "recipients",
      header: "Recipients List",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().length > 0 ? info.getValue().join(", ") : "-"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("lastSendingDate", {
      id: "lastSendingDate",
      header: "Last Sending Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("searchingPeriod", {
      id: "searchingPeriod",
      header: "Searching Period",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() > 1
            ? `${info.getValue()} Weeks`
            : `${info.getValue()} Week`}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("sendingCycle", {
      id: "sendingCycle",
      header: "Sending Cycle",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => (
        <div className="flex justify-center w-10">
          <VertOptionComponent
            report={info.row.original}
            onDelete={() => {
              setTableData((prev) => {
                return prev.filter((r) => r.name !== info.row.original.name);
              });
            }}
          />
        </div>
      ),
      size: 60,
    }),
  ];

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex justify-between">
        <PageTitle title="My Report" />
        <MdFilledButton
          onClick={() => {
            router.push("/main/shipment/my-report/create");
          }}
        >
          Create New Report
        </MdFilledButton>
      </div>
      <div className={styles.area}>
        <BasicTable
          ActionComponent={(table) => (
            <div className="flex-1">
              {table.getSelectedRowModel().rows.length > 0 && (
                <MdTextButton
                  onClick={() => {
                    router.push(
                      "/main/shipment/my-report/edit?name=" +
                        table.getSelectedRowModel().rows[0].original.name
                    );
                  }}
                >
                  Edit
                </MdTextButton>
              )}
            </div>
          )}
          data={tableData}
          columns={columnDefs}
          isSingleSelect
          controlColumns={["action"]}
          ignoreSelectionColumns={["action"]}
        />
      </div>
    </div>
  );
}

const VertOptionComponent = (props: {
  report: MyReportTableProps;
  onDelete?: () => void;
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { refs, context, floatingStyles, placement } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [shift(), flip(), offset(4)],
    whileElementsMounted: autoUpdate,
  });

  const { styles: transitionStyles, isMounted } = useTransitionStyles(
    context,
    placement === "top"
      ? getBasicDropdownStyles("up")
      : getBasicDropdownStyles("down")
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "menu",
    }),
  ]);

  return (
    <>
      <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
        <MdIcon>
          <MoreVert />
        </MdIcon>
      </MdIconButton>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-10"
        >
          <MdElevatedCard style={transitionStyles} className="py-1">
            <MdListItem
              type="button"
              onClick={() => {
                setIsOptionOpen(false);
                setIsConfirmOpen(true);
              }}
            >
              Delete
            </MdListItem>
          </MdElevatedCard>
        </div>
      )}
      <MdDialog open={isConfirmOpen} closed={() => setIsConfirmOpen(false)}>
        <div slot="headline">Do you want to delete the my report?</div>
        <div slot="content">{props.report.name}</div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              setIsConfirmOpen(false);
            }}
          >
            Cancel
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              setIsConfirmOpen(false);
              props.onDelete?.();
            }}
          >
            OK
          </MdFilledButton>
        </div>
      </MdDialog>
    </>
  );
};
