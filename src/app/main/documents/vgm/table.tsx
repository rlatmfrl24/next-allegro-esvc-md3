import { BottomFloatingBar } from "@/app/components/bottom-floating-bar";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import Portal from "@/app/components/portal";
import { BasicTable } from "@/app/components/table/basic-table";
import { GridSelectComponent } from "@/app/components/table/grid-select";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdElevation,
  MdFilledButton,
  MdIcon,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download, Publish, Upload } from "@mui/icons-material";
import { createColumnHelper, RowData } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { DateTime } from "luxon";
import { CSSProperties, useEffect, useMemo, useState } from "react";

type VGMTableProps = {
  containerNumber: string;
  bookingNumber: string;
  vgm: number | undefined;
  tareWeight: number;
  maxPayload: number;
  signatory: string | undefined;
  vgmCutOffTime: DateTime;
  declaredWeight: number;
  isSubscribed: boolean;
  emailNotification: string;
  updateDate: DateTime;
};

function createDummyVGM() {
  return {
    containerNumber: faker.string.alphanumeric(11).toUpperCase(),
    bookingNumber: faker.string.alphanumeric(11).toUpperCase(),
    vgm: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    tareWeight: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    maxPayload: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    signatory: undefined,
    vgmCutOffTime: DateTime.fromJSDate(faker.date.recent()),
    declaredWeight: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    isSubscribed: faker.datatype.boolean(),
    emailNotification: faker.internet.email(),
    updateDate: DateTime.fromJSDate(faker.date.recent()),
  } as VGMTableProps;
}

export const VGMTable = () => {
  const tempData = useMemo(
    () => Array.from({ length: 100 }, (_, i) => createDummyVGM()),
    []
  );
  const [tableData, setTableData] = useState<VGMTableProps[]>(tempData);
  const [isBottomFloatingVisible, setIsBottomFloatingVisible] = useState(false);
  const columnHelper = createColumnHelper<VGMTableProps>();
  const columnDefs = [
    columnHelper.accessor("containerNumber", {
      id: "containerNumber",
      header: "Container No.",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),

    columnHelper.accessor("vgm", {
      id: "vgm",
      header: "VGM (KGS) (Cargo + Tare Weight)",
      meta: {
        format: (value) =>
          value
            ?.toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "",
      },
      cell: (info) => info.getValue()?.toFixed(2).toString(),
    }),
    columnHelper.accessor("tareWeight", {
      id: "tareWeight",
      header: "Tare Weight (KGS)",
      cell: (info) => {
        const intValue = parseInt(info.getValue().toString());
        return (
          <MdTypography variant="body" size="medium" className="text-right">
            {intValue
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("maxPayload", {
      id: "maxPayload",
      header: "Max Payload (KGS)",
      cell: (info) => {
        const intValue = parseInt(info.getValue().toString());

        return (
          <MdTypography variant="body" size="medium" className="text-right">
            {intValue
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("signatory", {
      id: "signatory",
      header: "Signatory",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),

    columnHelper.accessor("vgmCutOffTime", {
      id: "vgmCutOffTime",
      header: "VGM Cut Off Time",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("declaredWeight", {
      id: "declaredWeight",
      header: "Declared VGM Weight (KGS)",
      cell: (info) => {
        const intValue = parseInt(info.getValue().toString());

        return (
          <MdTypography variant="body" size="medium" className="text-right">
            {intValue
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MdTypography>
        );
      },
    }),

    columnHelper.accessor("isSubscribed", {
      id: "isSubscribed",
      header: "Subsc.",
      cell: (info) => {
        return (
          <div className="text-center">
            <MdCheckbox
              checked={info.getValue()}
              onClick={() =>
                setTableData((prev) => {
                  const newData = [...prev];
                  newData[info.row.index] = {
                    ...newData[info.row.index],
                    isSubscribed: !newData[info.row.index].isSubscribed,
                  };
                  return newData;
                })
              }
            />
          </div>
        );
      },
      size: 80,
    }),
    columnHelper.accessor("emailNotification", {
      id: "emailNotification",
      header: "Email Notification",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
      size: 200,
    }),
    columnHelper.accessor("updateDate", {
      id: "updateDate",
      header: "Update Date",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        );
      },
    }),
  ];

  useEffect(() => {
    if (tableData !== tempData) {
      setIsBottomFloatingVisible(true);
    }
  }, [tableData, tempData]);

  return (
    <>
      <BasicTable
        ActionComponent={() => (
          <div className="flex-1 flex gap-4">
            <MdTextButton>
              <MdIcon slot="icon">
                <Publish fontSize="small" />
              </MdIcon>
              Upload
            </MdTextButton>
            <MdTextButton>
              <MdIcon slot="icon">
                <Download fontSize="small" />
              </MdIcon>
              Download
            </MdTextButton>
          </div>
        )}
        data={tableData}
        columns={columnDefs}
        isSingleSelect
        editableColumns={["vgm", "signatory", "emailNotification"]}
        onlyNumberColumns={["vgm"]}
        updater={setTableData}
      />
      <Portal selector="#vgm-container">
        <BottomFloatingBar
          open={isBottomFloatingVisible}
          onOpenChange={setIsBottomFloatingVisible}
        >
          <MdFilledButton onClick={() => setIsBottomFloatingVisible(false)}>
            Save
          </MdFilledButton>
        </BottomFloatingBar>
      </Portal>
    </>
  );
};
