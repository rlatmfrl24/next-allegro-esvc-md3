import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { createDummyVesselInformation } from "../../schedule/util";
import { useMemo } from "react";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { useVesselInfoDialog } from "@/app/components/common-dialog-hooks";
import LabelChip from "@/app/components/label-chip";

type ManifestLogTableProps = {
  type: string;
  blNumber: string;
  vessel: VesselInfoType;
  pol: string;
  pod: string;
  sendTime: DateTime;
  sendType: string;
  result: "Success" | "Fail";
};

function createManifestLog() {
  return {
    type: faker.string.alphanumeric(3).toUpperCase(),
    blNumber: faker.string.alphanumeric(10).toUpperCase(),
    vessel: createDummyVesselInformation(),
    pol: faker.location.city() + ", " + faker.location.country(),
    pod: faker.location.city() + ", " + faker.location.country(),
    sendTime: DateTime.fromJSDate(faker.date.recent()),
    sendType: faker.helpers.arrayElement(["N/A", "EDI", "API"]),
    result: faker.helpers.arrayElement(["Success", "Fail"]),
  } as ManifestLogTableProps;
}

export const ManifestLogTable = () => {
  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, createManifestLog);
  }, []);
  const { renderDialog, setCurrentVessel, setIsVesselInfoDialogOpen } =
    useVesselInfoDialog();

  const columnHelper = createColumnHelper<ManifestLogTableProps>();
  const columnDefs = [
    columnHelper.accessor("type", {
      id: "type",
      header: "Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 100,
    }),
    columnHelper.accessor("blNumber", {
      id: "blNumber",
      header: "B/L No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vessel", {
      id: "vessel",
      header: "Vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer"
          onClick={() => {
            setCurrentVessel(info.getValue());
            setIsVesselInfoDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
    }),
    columnHelper.accessor("pol", {
      id: "pol",
      header: "POL",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("pod", {
      id: "pod",
      header: "POD",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("sendTime", {
      id: "sendTime",
      header: "Send Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("sendType", {
      id: "sendType",
      header: "Send Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("result", {
      id: "result",
      header: "Result",
      cell: (info) => (
        <LabelChip
          size="medium"
          label={info.getValue()}
          className={
            info.getValue() === "Success"
              ? "bg-extendGoodContainer "
              : "bg-surfaceContainerHigh"
          }
        />
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BasicTable
        ActionComponent={() => <div className="flex-1"></div>}
        data={tempData}
        columns={columnDefs}
      />
      ;
    </>
  );
};
