import { DateTime } from "luxon";
import { useState } from "react";

import ActualScheduleIcon from "@/../public/icon_actual_schedule.svg";
import EstimateScheduleIcon from "@/../public/icon_estimate_schedule.svg";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import {
  MdFilledTonalButton,
  MdFilterChip,
  MdIcon,
  MdTextButton,
} from "@/app/util/md3";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import PlaceInformationDialog from "../popup/place-information";
import VesselScheduleDialog from "../popup/vessel-schedule";
import {
  PortScheduleType,
  PlaceInformationType,
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { BasicTable } from "@/app/components/table/basic-table";
import { DividerComponent } from "../../booking/information/components/base";
import { Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  usePlaceInfoDialog,
  useVesselScheduleDialog,
} from "@/app/components/common-dialog-hooks";
import { set } from "lodash";

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

  const {
    renderDialog: renderPlaceInformationDialog,
    setCurrentPlace,
    setIsPlaceInfoDialogOpen,
  } = usePlaceInfoDialog();
  const {
    renderDialog: renderVesselScheduleDialog,
    setCurrentVessel,
    setIsVesselScheduleDialogOpen,
  } = useVesselScheduleDialog();

  const columnHelper = createColumnHelper<PortScheduleType>();
  const router = useRouter();

  const columns = [
    columnHelper.accessor("vesselInfo", {
      header: "Vessel",
      cell: (info) => {
        return (
          <div
            className="underline cursor-pointer"
            onClick={() => {
              setCurrentVessel(info.getValue());
              setIsVesselScheduleDialogOpen(true);
            }}
          >
            <MdTypography variant="body" size="medium">
              {info.getValue().vesselName}
            </MdTypography>
          </div>
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
            setCurrentPlace(info.getValue());
            setIsPlaceInfoDialogOpen(true);
          }}
        >
          <MdTypography variant="body" size="medium">
            {info.getValue().yardName}
          </MdTypography>
        </div>
      ),
      size: undefined,
    }),
    columnHelper.accessor("vesselInfo.serviceLane", {
      header: "Service Lane",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
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
      cell: () => (
        <MdFilledTonalButton
          onClick={(e) => {
            e.stopPropagation();
            router.push("/main/booking/request");
          }}
        >
          Booking
        </MdFilledTonalButton>
      ),
      size: undefined,
    }),
  ];

  return (
    <div className="flex mt-1">
      <BasicTable
        ActionComponent={() => {
          return (
            <div className="flex items-center flex-1">
              <MdTextButton>
                <MdIcon slot="icon">
                  <Download fontSize="small" />
                </MdIcon>
                Download
              </MdTextButton>
              <DividerComponent orientation="vertical" className="h-8 mx-2" />
              <MdFilterChip label="Ocean Vessel Only" />
            </div>
          );
        }}
        columns={columns}
        data={data}
        isSingleSelect
      />
      {renderPlaceInformationDialog()}
      {renderVesselScheduleDialog()}
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
