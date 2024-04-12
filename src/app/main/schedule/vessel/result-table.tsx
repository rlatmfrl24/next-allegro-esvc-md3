import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import PlaceInformationDialog from "../popup/place-information";
import { BasicTable } from "@/app/components/unused/basic-table";
import { DateTime } from "luxon";
import ActualScheduleIcon from "@/../public/icon_actual_schedule.svg";
import EstimateScheduleIcon from "@/../public/icon_estimate_schedule.svg";
import { MdTypography } from "@/app/components/typography";
import {
  VesselScheduleType,
  PlaceInformationType,
} from "@/app/util/typeDef/schedule";

const DateCell = ({
  info,
  flag,
}: {
  info: DateTime;
  flag: "actual" | "estimate";
}) => {
  return (
    <MdTypography variant="body" size="medium" className="flex items-center">
      <div className="mr-2">
        {flag === "actual" ? <ActualScheduleIcon /> : <EstimateScheduleIcon />}
      </div>
      {info.toFormat("yyyy-MM-dd HH:mm:ss")}
    </MdTypography>
  );
};

export default function VesselResultTable({
  data,
}: {
  data: VesselScheduleType[];
}) {
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);
  const [placeInformation, setPlaceInformation] =
    useState<PlaceInformationType>();
  const columnHelper = createColumnHelper<VesselScheduleType>();

  const columns = [
    columnHelper.accessor("port", {
      header: "Port",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
      size: undefined,
    }),
    columnHelper.accessor("terminal", {
      header: "Terminal",
      cell: (info) => (
        <div
          className="underline cursor-pointer"
          onClick={() => {
            setPlaceInformation(info.getValue());
            setIsPlaceInformationOpen(true);
          }}
        >
          <MdTypography variant="body" size="medium">
            {info.getValue().yardName}
          </MdTypography>
        </div>
      ),
      size: undefined,
    }),
    columnHelper.accessor("arrivalDate", {
      header: "Arrival Date",
      cell: (info) => (
        <DateCell
          info={info.getValue()}
          flag={
            info.getValue().diff(DateTime.now(), "days").days > 0
              ? "estimate"
              : "actual"
          }
        />
      ),
      size: 200,
    }),
    columnHelper.accessor("berthingDate", {
      header: "Berthing Date",
      cell: (info) => (
        <DateCell
          info={info.getValue()}
          flag={
            info.getValue().diff(DateTime.now(), "days").days > 0
              ? "estimate"
              : "actual"
          }
        />
      ),
      size: 200,
    }),
    columnHelper.accessor("departureDate", {
      header: "Departure Date",
      cell: (info) => (
        <DateCell
          info={info.getValue()}
          flag={
            info.getValue().diff(DateTime.now(), "days").days > 0
              ? "estimate"
              : "actual"
          }
        />
      ),
      size: 200,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex mt-1">
        <BasicTable table={table} />
      </div>
      {placeInformation && (
        <PlaceInformationDialog
          open={isPlaceInformationOpen}
          handleOpen={setIsPlaceInformationOpen}
          data={placeInformation}
        />
      )}
    </>
  );
}
