import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { createDummyVesselInformation } from "../../schedule/util";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { useVesselInfoDialog } from "@/app/components/common-dialog-hooks";
import { MdCheckbox, MdTextButton } from "@/app/util/md3";

type SimpleContainerType = {
  type: "Dry" | "Reefer";
  size: "20" | "40";
  count: number;
};

type ArrivalNoticeTableProps = {
  blNumber: string;
  vessel: VesselInfoType;
  departurePort: string;
  etd: DateTime;
  arrivalPort: string;
  eta: DateTime;
  etb: DateTime;
  berthingTerminal: string;
  containerList: SimpleContainerType[];
  vesselDelay: number;
};

function createArrivalNoticeData(): ArrivalNoticeTableProps {
  return {
    blNumber: (faker.string.alpha(3) + faker.string.numeric(9)).toUpperCase(),
    vessel: createDummyVesselInformation(),
    departurePort: faker.location.city() + ", " + faker.location.country(),
    etd: DateTime.fromJSDate(faker.date.past()),
    arrivalPort: faker.location.city() + ", " + faker.location.country(),
    eta: DateTime.fromJSDate(faker.date.future()),
    etb: DateTime.fromJSDate(faker.date.future()),
    berthingTerminal: faker.location.city() + ", " + faker.location.country(),
    containerList: Array.from({ length: faker.number.int({ max: 5 }) }, () => ({
      type: faker.helpers.arrayElement(["Dry", "Reefer"]),
      size: faker.helpers.arrayElement(["20", "40"]),
      count: faker.number.int({ max: 10 }),
    })),
    vesselDelay: faker.number.int({ max: 300 }),
  };
}

export const ArrivalNoticeTable = () => {
  const [selectedRows, setSelectedRows] = useState<ArrivalNoticeTableProps[]>(
    []
  );
  const { renderDialog, setCurrentVessel, setIsVesselInfoDialogOpen } =
    useVesselInfoDialog();

  const tempData = useMemo(
    () => Array.from({ length: 100 }, () => createArrivalNoticeData()),
    []
  );
  const columnHelper = createColumnHelper<ArrivalNoticeTableProps>();
  const columnDefs = [
    columnHelper.display({
      id: "checkbox",
      header: "",
      cell: (info) => {
        return (
          <div className="flex justify-center">
            <MdCheckbox checked={info.row.getIsSelected()} />
          </div>
        );
      },
      size: 50,
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
      cell: (info) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="cursor-pointer underline"
            onClick={() => {
              setCurrentVessel(info.getValue());
              setIsVesselInfoDialogOpen(true);
            }}
          >
            {info.getValue().vesselName}
          </MdTypography>
        );
      },
      size: 300,
    }),
    columnHelper.accessor("departurePort", {
      id: "departurePort",
      header: "Departure",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("etd", {
      id: "etd",
      header: "ETD",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("arrivalPort", {
      id: "arrivalPort",
      header: "Arrival",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("eta", {
      id: "eta",
      header: "ETA",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("etb", {
      id: "etb",
      header: "Est. Time of Berthing",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("berthingTerminal", {
      id: "berthingTerminal",
      header: "Berthing Terminal",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("containerList", {
      id: "containerList",
      header: "Container List",
      cell: (info) => {
        const containerList = info.getValue();
        return (
          <div>
            {containerList.map((container, index) => (
              <div key={index}>
                <MdTypography variant="body" size="medium">
                  {container.type} {container.size} x {container.count}
                </MdTypography>
              </div>
            ))}
          </div>
        );
      },
    }),
    columnHelper.accessor("vesselDelay", {
      id: "vesselDelay",
      header: "Vessel Delay",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()} Hrs Delayed
        </MdTypography>
      ),
    }),
  ];

  return (
    <>
      {renderDialog()}
      <BasicTable
        ActionComponent={() => {
          return (
            <div className="flex flex-1 gap-4">
              {selectedRows.length > 0 && (
                <>
                  <MdTextButton>B/L Preview</MdTextButton>
                  <MdTextButton>Arrival Notice</MdTextButton>
                </>
              )}
            </div>
          );
        }}
        data={tempData}
        columns={columnDefs}
        getSelectionRows={(rows) => {
          setSelectedRows(rows);
        }}
      />
      ;
    </>
  );
};
