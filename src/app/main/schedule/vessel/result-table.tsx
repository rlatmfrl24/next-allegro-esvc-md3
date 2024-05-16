import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import ActualScheduleIcon from "@/../public/icon_schedule_actual.svg";
import EstimateScheduleIcon from "@/../public/icon_schedule_estimate.svg";
import { MdTypography } from "@/app/components/typography";
import { VesselScheduleType } from "@/app/util/typeDef/schedule";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdFilterChip, MdIcon, MdTextButton } from "@/app/util/md3";
import { Download } from "@mui/icons-material";
import { usePlaceInfoDialog } from "@/app/components/common-dialog-hooks";
import { DividerComponent } from "@/app/components/divider";

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

// TODO: Convert use Custom Hook at PlaceInformationDialog
export default function VesselResultTable({
  data,
}: {
  data: VesselScheduleType[];
}) {
  const columnHelper = createColumnHelper<VesselScheduleType>();

  const { renderDialog, setCurrentPlace, setIsPlaceInfoDialogOpen } =
    usePlaceInfoDialog();

  const columns = [
    columnHelper.accessor("port", {
      header: "Port",
      id: "port",
      cell: (info) => {
        return (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("terminal", {
      header: "Terminal",
      id: "terminal",
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
    }),
    columnHelper.accessor("arrivalDate", {
      header: "Arrival Date",
      id: "arrivalDate",
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
    }),
    columnHelper.accessor("berthingDate", {
      header: "Berthing Date",
      id: "berthingDate",
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
    }),
    columnHelper.accessor("departureDate", {
      header: "Departure Date",
      id: "departureDate",
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
    }),
  ];

  return (
    <>
      <div className="mt-1">
        <BasicTable
          ActionComponent={() => {
            return (
              <div className="flex justify-between items-center flex-1">
                <div className="flex items-center gap-2">
                  <MdTextButton>
                    <MdIcon slot="icon">
                      <Download fontSize="small" />
                    </MdIcon>
                    Download
                  </MdTextButton>
                  <DividerComponent
                    orientation="vertical"
                    className="h-8 mx-2"
                  />
                  <MdFilterChip label="Direct Only" />
                </div>
                <MdTypography
                  variant="label"
                  size="large"
                  className="text-outline"
                >
                  Total:{data.length}
                </MdTypography>
              </div>
            );
          }}
          columns={columns}
          data={data}
          isSingleSelect
        />
      </div>
      {renderDialog()}
    </>
  );
}
