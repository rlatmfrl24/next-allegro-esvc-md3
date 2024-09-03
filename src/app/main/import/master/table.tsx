import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import {
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../schedule/util";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { Info } from "@mui/icons-material";
import {
  usePlaceInfoDialog,
  useVesselScheduleDialog,
} from "@/app/components/common-dialog-hooks";
import { MdRadio, MdTextButton } from "@/app/util/md3";
import { useRouter } from "next/navigation";
import { useEstimatedTimeofDepartureDialog } from "../../booking/status/components/estimated-time-of-departure-dialog";
import ActualScheduleIcon from "@/../public/icon_schedule_actual.svg";
import EstimatedScheduleIcon from "@/../public/icon_schedule_estimate.svg";

type InboundMasterTableProps = {
  blNumber: string;
  container: string;
  departure: {
    pol: string;
    departureDate: DateTime;
  };
  arrival: {
    pod: string;
    arrivalDate: DateTime;
  };
  vesselVoyage: VesselInfoType;
  terminal: PlaceInformationType;
  arrivalNote: boolean;
  blType: string;
  demdetDue: DateTime;
  isDemmurage: boolean;
  isCombined: boolean;
  vesselDelayNotice: DateTime | null;
};

function createDummyInboundMasterData() {
  return {
    blNumber: faker.string.alphanumeric(11).toUpperCase(),
    container: Array.from({ length: faker.number.int({ max: 4 }) }, () => {
      return (
        faker.helpers.arrayElement(["Dry", "Reefer", "Special"]) +
        " " +
        faker.helpers.arrayElement(["20", "40", "HC", "45"]) +
        " * " +
        faker.number.int({ max: 9 })
      );
    }).join("\n"),
    departure: {
      pol: faker.location.city() + ", " + faker.location.country(),
      departureDate: DateTime.fromJSDate(faker.date.recent()),
    },
    arrival: {
      pod: faker.location.city() + ", " + faker.location.country(),
      arrivalDate: DateTime.fromJSDate(faker.date.recent()),
    },
    vesselVoyage: createDummyVesselInformation(),
    terminal: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    arrivalNote: faker.datatype.boolean(),
    blType: faker.helpers.arrayElement([
      "Original B/L",
      "Surrender B/L",
      "Sea Waybill",
    ]),
    demdetDue: DateTime.fromJSDate(faker.date.recent()),
    isDemmurage: faker.datatype.boolean(),
    isCombined: faker.datatype.boolean(),
    vesselDelayNotice: faker.helpers.arrayElement([
      null,
      DateTime.fromJSDate(faker.date.recent()),
      DateTime.fromJSDate(faker.date.soon()),
    ]),
  } as InboundMasterTableProps;
}

export const InboundMasterTable = () => {
  const { setCurrentVessel, renderDialog, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();
  const {
    renderDialog: renderPlaceDialog,
    setIsPlaceInfoDialogOpen,
    setCurrentPlace,
  } = usePlaceInfoDialog();
  const {
    renderDialog: renderEstimatedTimeofDepartureDialog,
    setIsVesselStatusNotesDialogOpen,
  } = useEstimatedTimeofDepartureDialog();

  const [selectedRow, setSelectedRow] =
    useState<InboundMasterTableProps | null>(null);

  const router = useRouter();

  const tempData = useMemo(() => {
    return Array.from({ length: 100 }, () => createDummyInboundMasterData());
  }, []);
  const columnHelper = createColumnHelper<InboundMasterTableProps>();
  const columnDefs = [
    columnHelper.display({
      id: "radio",
      cell: (info) => (
        <div className="flex justify-center">
          <MdRadio
            checked={selectedRow?.blNumber === info.row.original.blNumber}
          />
        </div>
      ),
      size: 50,
    }),
    columnHelper.accessor("blNumber", {
      id: "blNumber",
      header: "B/L No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline w-fit cursor-pointer"
          onClick={() => {
            router.push("/main/booking/information/confirmation");
          }}
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("departure", {
      id: "departure",
      header: "Departure",
      cell: (info) => (
        <div>
          <MdTypography variant="body" size="medium" className="mb-1">
            {info.getValue().pol}
          </MdTypography>
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline flex gap-1 items-center"
          >
            <ActualScheduleIcon />
            {info.getValue().departureDate.toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        </div>
      ),
      size: 300,
    }),
    columnHelper.accessor("arrival", {
      id: "arrival",
      header: "Arrival",
      cell: (info) => (
        <div>
          <MdTypography variant="body" size="medium" className="mb-1">
            {info.getValue().pod}
          </MdTypography>
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline flex gap-1 items-center"
          >
            <EstimatedScheduleIcon />
            {info.getValue().arrivalDate.toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        </div>
      ),
      size: 300,
    }),
    columnHelper.accessor("vesselVoyage", {
      id: "vesselVoyage",
      header: "Vessel/Voyage",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
          onClick={() => {
            setCurrentVessel(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 400,
    }),
    columnHelper.accessor("terminal", {
      id: "terminal",
      header: "Terminal",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
          onClick={() => {
            setCurrentPlace(info.getValue());
            setIsPlaceInfoDialogOpen(true);
          }}
        >
          {info.getValue().yardName}
        </MdTypography>
      ),
      size: 300,
    }),
    columnHelper.accessor("container", {
      id: "container",
      header: "Container",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info
            .getValue()
            .split("\n")
            .map((container, index) => (
              <div key={index}>{container}</div>
            ))}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("arrivalNote", {
      id: "arrivalNote",
      header: "Arrival Note",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className={info.getValue() ? "underline cursor-pointer w-fit" : ""}
          onClick={() => {
            info.getValue() && router.push("/main/import/notice");
          }}
        >
          {info.getValue() ? "Y" : "N"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("blType", {
      id: "blType",
      header: "B/L Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("demdetDue", {
      id: "demdetDue",
      header: "Due Date",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
          onClick={() => {
            router.push("/main/tariff/inquiry");
          }}
        >
          {info.getValue().toFormat("yyyy-MM-dd")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("isDemmurage", {
      id: "isDemmurage",
      header: "Demmurage",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue() ? "Y" : "N"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("isCombined", {
      id: "isCombined",
      header: () => {
        return (
          <MdTypography variant="body" size="medium">
            Detention
            <br />
            Combine
          </MdTypography>
        );
      },
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className={info.getValue() ? "w-fit underline cursor-pointer" : ""}
          onClick={() => {
            info.getValue() && router.push("/main/tariff/inquiry");
          }}
        >
          {info.getValue() ? "Y" : "N"}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("vesselDelayNotice", {
      id: "vesselDelayNotice",
      header: "Vessel Delay Notice",
      cell: (info) => {
        const value = info.getValue();
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="flex gap-4 items-center w-fit underline cursor-pointer"
            onClick={() => {
              setIsVesselStatusNotesDialogOpen(true);
            }}
          >
            {value !== null ? (
              <>
                {value.toFormat("yyyy-MM-dd HH:mm")}
                <Info
                  fontSize="small"
                  className={
                    info.getValue()!.diffNow("days").days > 0
                      ? "text-[#325BDA]"
                      : "text-error"
                  }
                />
              </>
            ) : (
              "N"
            )}
          </MdTypography>
        );
      },
    }),
  ];

  return (
    <>
      {renderEstimatedTimeofDepartureDialog()}
      {renderDialog()}
      {renderPlaceDialog()}
      <BasicTable
        ActionComponent={() => (
          <div className="flex-1 flex gap-4">
            {selectedRow && (
              <>
                <MdTextButton
                  onClick={() => {
                    router.push("/main/import/notice");
                  }}
                >
                  Arrival Notice
                </MdTextButton>
                <MdTextButton
                  disabled={selectedRow === null || selectedRow === undefined}
                  onClick={() => {
                    setIsVesselStatusNotesDialogOpen(true);
                  }}
                >
                  Advance/Delay Notice
                </MdTextButton>
              </>
            )}
          </div>
        )}
        data={tempData}
        columns={columnDefs}
        getSelectionRows={(rows) => {
          setSelectedRow(rows[0]);
        }}
        isSingleSelect
      />
    </>
  );
};
