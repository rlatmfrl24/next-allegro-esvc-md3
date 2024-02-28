import { MdTypography } from "@/app/components/typography";
import {
  PlaceInformationType,
  PortScheduleType,
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef";
import ActualScheduleIcon from "@/../public/icon_actual_schedule.svg";
import EstimateScheduleIcon from "@/../public/icon_estimate_schedule.svg";
import { DateTime } from "luxon";
import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BasicTable } from "@/app/components/basic-table";
import Portal from "@/app/components/portal";
import PlaceInformationDialog from "../popup/place-information";
import VesselInformationDialog from "../popup/vessel-information";
import { MdFilledTonalButton } from "@/app/util/md3";
import VesselScheduleDialog from "../popup/vessel-schedule";

export default function PortResultTable({
  data,
}: {
  data: PortScheduleType[];
}) {
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);
  const [placeInformation, setPlaceInformation] =
    useState<PlaceInformationType>();
  const [isVesselScheduleOpen, setIsVesselScheduleOpen] = useState(false);
  const [vesselInformation, setVesselInformation] = useState<VesselInfoType>();
  const [vesselSchedules, setVesselSchedules] =
    useState<VesselScheduleType[]>();
  const columnHelper = createColumnHelper<PortScheduleType>();

  const columns = [
    columnHelper.accessor("vesselInfo", {
      header: "Vessel",
      cell: (info) => {
        return (
          <div
            className="underline cursor-pointer"
            onClick={() => {
              setVesselInformation(info.getValue());
              setVesselSchedules(
                data.find((d) => d.vesselInfo === info.getValue())
                  ?.vesselSchedules
              );
              setIsVesselScheduleOpen(true);
            }}
          >
            {info.getValue().vesselName}
          </div>
        );
      },
      size: undefined,
    }),
    columnHelper.accessor("terminalInfo", {
      header: "Terminal",
      cell: (info) => (
        <div
          className="underline cursor-pointer"
          onClick={() => {
            setPlaceInformation(info.getValue());
            setIsPlaceInformationOpen(true);
          }}
        >
          {info.getValue().yardName}
        </div>
      ),
      size: undefined,
    }),
    columnHelper.accessor("vesselInfo.serviceLane", {
      header: "Service Lane",
      cell: (info) => {
        return info.getValue();
      },
      size: undefined,
    }),
    columnHelper.accessor("arrivalDate", {
      header: "Arrival",
      cell: (info) => {
        return (
          <DateCell
            info={info.getValue()}
            flag={
              info.getValue().diff(DateTime.now(), "days").days > 0
                ? "estimate"
                : "actual"
            }
          />
        );
      },
      size: 200,
    }),
    columnHelper.accessor("berthingDate", {
      header: "Berthing",
      cell: (info) => {
        return (
          <DateCell
            info={info.getValue()}
            flag={
              info.getValue().diff(DateTime.now(), "days").days > 0
                ? "estimate"
                : "actual"
            }
          />
        );
      },
      size: 200,
    }),
    columnHelper.accessor("departureDate", {
      header: "Departure",
      cell: (info) => {
        return (
          <DateCell
            info={info.getValue()}
            flag={
              info.getValue().diff(DateTime.now(), "days").days > 0
                ? "estimate"
                : "actual"
            }
          />
        );
      },
      size: 200,
    }),
    columnHelper.accessor("vesselInfo.vesselName", {
      header: "Action",
      cell: (info) => <MdFilledTonalButton>Booking</MdFilledTonalButton>,
      size: undefined,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex mt-1">
      <BasicTable table={table} />
      <Portal selector="#main-container">
        {placeInformation && (
          <PlaceInformationDialog
            open={isPlaceInformationOpen}
            handleOpen={setIsPlaceInformationOpen}
            data={placeInformation}
          />
        )}
        {vesselInformation && vesselSchedules && (
          <VesselScheduleDialog
            open={isVesselScheduleOpen}
            handleOpen={setIsVesselScheduleOpen}
            vesselInfo={vesselInformation}
            vesselSchedules={vesselSchedules}
          />
        )}
      </Portal>
    </div>
  );
}

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
