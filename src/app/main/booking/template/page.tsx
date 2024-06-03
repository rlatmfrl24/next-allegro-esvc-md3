"use client";

import { BasicTable } from "@/app/components/table/basic-table";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { BookingTemplateListState } from "@/app/store/booking.store";
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
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { BookingTemplateProps } from "@/app/util/typeDef/boooking";
import { faker, id_ID } from "@faker-js/faker";
import {
  autoUpdate,
  flip,
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
import classNames from "classnames";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const templates = useRecoilValue(BookingTemplateListState);
  const [tableData, setTableData] = useState<BookingTemplateTableProps[]>(
    templates.map(convertTemplateToTableProps)
  );
  const [selectedTemplate, setSelectedTemplate] =
    useState<BookingTemplateTableProps>();

  const columnHelper = createColumnHelper<BookingTemplateTableProps>();

  const columnDefs = [
    columnHelper.display({
      id: "radio",
      header: "",
      cell: (info) => (
        <div className="flex items-center justify-center">
          <MdRadio
            checked={
              selectedTemplate?.templateName === info.row.original.templateName
            }
          />
        </div>
      ),
      size: 40,
    }),
    columnHelper.accessor("templateName", {
      id: "templateName",
      header: "Template Name",
      cell: (info) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="underline cursor-pointer w-fit"
            onClick={() => {
              router.push(
                "/main/booking/template/preview?template=" + info.getValue()
              );
            }}
          >
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
    columnHelper.display({
      id: "action",
      header: "",
      cell: (info) => (
        <DeleteActionButton targetName={info.row.original.templateName} />
      ),
      size: 40,
    }),
  ];

  const DeleteActionButton = (props: { targetName: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { refs, floatingStyles, context, placement } = useFloating({
      open: isMenuOpen,
      onOpenChange: setIsMenuOpen,
      middleware: [shift(), flip()],
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
      useRole(context),
    ]);

    return (
      <div className="flex items-center justify-center">
        <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
          <MdIcon>
            <MoreVert />
          </MdIcon>
        </MdIconButton>
        <div>
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
                    setIsDeleteDialogOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Delete
                </MdListItem>
              </MdElevatedCard>
            </div>
          )}
        </div>
        <MdDialog
          open={isDeleteDialogOpen}
          closed={() => setIsDeleteDialogOpen(false)}
        >
          <div slot="headline">Do you want to delete the booking template?</div>
          <div slot="content"></div>
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsDeleteDialogOpen(false);
              }}
            >
              Cancel
            </MdOutlinedButton>
            <MdFilledButton
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setTableData((prev) =>
                  prev.filter((data) => data.templateName !== props.targetName)
                );
              }}
            >
              OK
            </MdFilledButton>
          </div>
        </MdDialog>
      </div>
    );
  };

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
        <BasicTable
          ActionComponent={() => (
            <div className="flex-1 flex gap-4">
              {selectedTemplate && (
                <>
                  <MdTextButton>Edit</MdTextButton>
                  <MdTextButton
                    onClick={() => {
                      router.push(
                        "/main/booking/request?template=" +
                          selectedTemplate.templateName
                      );
                    }}
                  >
                    Use Template
                  </MdTextButton>
                </>
              )}
            </div>
          )}
          columns={columnDefs}
          data={tableData}
          isSingleSelect
          ignoreSelectionColumns={["action"]}
          controlColumns={["radio", "action"]}
          getSelectionRows={(rows) => {
            setSelectedTemplate(rows[0]);
          }}
        />
      </div>
    </div>
  );
}
