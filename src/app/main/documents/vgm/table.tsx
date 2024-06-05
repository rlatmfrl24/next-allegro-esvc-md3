import Portal from "@/app/components/portal";
import { BasicTable } from "@/app/components/table/basic-table";
import { GridSelectComponent } from "@/app/components/table/grid-select";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdElevation,
  MdFilledButton,
  MdIcon,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Download, Publish, Upload } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { DateTime } from "luxon";
import { CSSProperties, useEffect, useMemo, useState } from "react";

type VGMTableProps = {
  containerNumber: string;
  bookingNumber: string;
  weightType: "VGM" | "Cargo Weight";
  vgm: number;
  vgmUnit: "KGS" | "LBS";
  tareWeight: number;
  maxPayload: number;
  signatory: string | undefined;
  referenceId: string | undefined;
  vgmCutOffTime: DateTime;
  isSubscribed: boolean;
  emailNotification: string;
  updateDate: DateTime;
  updateId: DateTime;
};

function createDummyVGM() {
  return {
    containerNumber: faker.string.alphanumeric(11).toUpperCase(),
    bookingNumber: faker.string.alphanumeric(11).toUpperCase(),
    weightType: faker.helpers.arrayElement(["VGM", "Cargo Weight"]),
    vgm: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    vgmUnit: faker.helpers.arrayElement(["KGS", "LBS"]),
    tareWeight: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    maxPayload: faker.number.int({
      min: 1000,
      max: 10000,
    }),
    signatory: undefined,
    referenceId: undefined,
    vgmCutOffTime: DateTime.fromJSDate(faker.date.recent()),
    isSubscribed: faker.datatype.boolean(),
    emailNotification: faker.internet.email(),
    updateDate: DateTime.fromJSDate(faker.date.recent()),
    updateId: DateTime.fromJSDate(faker.date.recent()),
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
    columnHelper.accessor("weightType", {
      id: "weightType",
      header: "Weight Type",
      cell: (info) => {
        return (
          <GridSelectComponent
            initialSelection={info.getValue()}
            options={["VGM", "Cargo Weight"]}
            onChange={(value) => {
              setTableData((prev) => {
                const newData = [...prev];
                newData[info.row.index] = {
                  ...newData[info.row.index],
                  weightType: value as "VGM" | "Cargo Weight",
                };
                return newData;
              });
            }}
          />
        );
      },
    }),
    columnHelper.accessor("vgm", {
      id: "vgm",
      header: "VGM",
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
    columnHelper.accessor("vgmUnit", {
      id: "vgmUnit",
      header: "VGM Unit",
      cell: (info) => {
        return (
          <GridSelectComponent
            initialSelection={info.getValue()}
            options={["KGS", "LBS"]}
            onChange={(value) => {
              setTableData((prev) => {
                const newData = [...prev];
                newData[info.row.index] = {
                  ...newData[info.row.index],
                  vgmUnit: value as "KGS" | "LBS",
                };
                return newData;
              });
            }}
          />
        );
      },
    }),
    columnHelper.accessor("tareWeight", {
      id: "tareWeight",
      header: "Tare Weight",
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
      header: "Max Payload",
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
        return info.getValue() ? (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        ) : (
          <MdTypography
            variant="body"
            size="medium"
            className="text-outlineVariant"
          >
            Signatory
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("referenceId", {
      id: "referenceId",
      header: "Reference ID",
      cell: (info) => {
        return info.getValue() ? (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        ) : (
          <MdTypography
            variant="body"
            size="medium"
            className="text-outlineVariant"
          >
            Reference ID
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("vgmCutOffTime", {
      id: "vgmCutOffTime",
      header: "VGM Cut-off Time",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
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
    columnHelper.accessor("updateId", {
      id: "updateId",
      header: "Update ID",
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
    console.log("update table data");
    setIsBottomFloatingVisible(true);
  }, [tableData]);

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
        editableColumns={[
          "vgm",
          "tareWeight",
          "maxPayload",
          "signatory",
          "referenceId",
        ]}
        updater={setTableData}
      />
      <Portal selector="#vgm-container">
        <AnimatePresence>
          {isBottomFloatingVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={
                {
                  "--md-elevation-level": 2,
                } as CSSProperties
              }
              className="fixed bottom-3 left-24 w-[calc(100%-7rem)] p-2 rounded-full flex justify-end bg-surfaceContainer z-10"
            >
              <MdElevation />
              <MdFilledButton onClick={() => setIsBottomFloatingVisible(false)}>
                Save
              </MdFilledButton>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};
