"use client";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  CargoPickUpReturnState,
  ContainerState,
  CurrentBookingDataState,
  LocationScheduleState,
} from "@/app/store/booking.store";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { MergeSelectionTable } from "@/app/main/booking/status/components/dialog/merge-selection-table";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import { faker } from "@faker-js/faker";

export function useBookingMergeDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
          cancel={(e) => {
            e.preventDefault();
          }}
          className="min-w-[960px]"
        >
          <BookingMergeSelection
            handleAction={(action) => {
              if (action === "merge") {
                console.log("Merge");
              } else {
                setIsDialogOpen(false);
              }
            }}
          />
        </MdDialog>
      </Portal>
    );
  }

  return {
    renderDialog,
    setIsDialogOpen,
  };
}

const BookingMergeSelection = ({
  handleAction,
}: {
  handleAction: (action: string) => void;
}) => {
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const currentLocationScheduleData = useRecoilValue(LocationScheduleState);

  return (
    <>
      <div slot="headline">Booking Merge</div>
      <div slot="content">
        <div className="grid grid-cols-[128px_1fr_128px_1fr] gap-2 mb-6">
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking No.
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.bookingNo}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking Office
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentLocationScheduleData?.bookingOffice}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Vessel Voyage
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.vessel.vesselName}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Shipper
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.actualShipper}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            POL/ETD
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.origin +
              ", " +
              currentBookingData?.estimatedTimeofDeparture.date.toFormat(
                "yyyy. MM. dd"
              )}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            POD/ETA
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.destination +
              ", " +
              currentLocationScheduleData?.departureDate.toFormat(
                "yyyy. MM. dd"
              )}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Term
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentLocationScheduleData?.originType.toUpperCase() +
              " - " +
              currentLocationScheduleData?.destinationType.toUpperCase()}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            Booking Date
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {currentBookingData?.requestDate.toFormat("yyyy. MM. dd")}
          </MdTypography>
        </div>
        <DetailTitle title="Container Information" />
        <BookingMergeTable />
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            handleAction("close");
          }}
        >
          Close
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            handleAction("merge");
          }}
        >
          Merge
        </MdFilledButton>
      </div>
    </>
  );
};

const BookingMergeConfirmation = () => {
  return (
    <>
      <div slot="headline">Merge Information</div>
      <div slot="actions">
        <MdOutlinedButton>Cancel</MdOutlinedButton>
        <MdFilledButton>Merge</MdFilledButton>
      </div>
    </>
  );
};

const BookingMergeTable = () => {
  type MergeTableType = {
    bookingNumber: string;
    totalWeight: string;
    containers: {
      type: string;
      size: string;
      quantity: number;
    }[];
    emptyPickupPlace: PlaceInformationType;
    emptyPickupDate: DateTime;
  };
  const columnHelper = createColumnHelper<MergeTableType>();

  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const currentCargoPickUpReturnData = useRecoilValue(CargoPickUpReturnState);
  const currentContainerData = useRecoilValue(ContainerState);

  const sourceData = useMemo(() => {
    return {
      bookingNumber: currentBookingData?.bookingNo,
      totalWeight: currentCargoPickUpReturnData?.grossWeight,
      containers: [
        ...currentContainerData?.dry.map((container) => {
          return {
            type: container.type,
            size: container.size,
            quantity: container.quantity,
          };
        }),
        ...currentContainerData?.reefer.map((container) => {
          return {
            type: container.type,
            size: container.size,
            quantity: container.quantity,
          };
        }),
        ...currentContainerData?.opentop.map((container) => {
          return {
            type: container.type,
            size: container.size,
            quantity: container.quantity,
          };
        }),
        ...currentContainerData?.flatrack.map((container) => {
          return {
            type: container.type,
            size: container.size,
            quantity: container.quantity,
          };
        }),
        ...currentContainerData?.tank.map((container) => {
          return {
            type: container.type,
            size: container.size,
            quantity: container.quantity,
          };
        }),
      ],
      emptyPickupPlace: currentCargoPickUpReturnData?.emptyPickUpLocation,
      emptyPickupDate: currentCargoPickUpReturnData?.emptyPickUpDate,
    } as MergeTableType;
  }, [currentBookingData, currentCargoPickUpReturnData, currentContainerData]);

  const isSourceDataEmpty = useMemo(() => {
    return Object.values(sourceData).some((value) => {
      if (value === null || value === undefined) {
        return true;
      }

      if (Array.isArray(value) && value.length === 0) {
        return true;
      }

      return false;
    });
  }, [sourceData]);

  const candidateData = Array.from({ length: 10 }).map((_, index) => {
    return {
      bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
      totalWeight: faker.number
        .int({
          min: 1000,
          max: 10000,
        })
        .toString(),
      containers: Array.from({
        length: faker.number.int({
          min: 1,
          max: 5,
        }),
      }).map(() => {
        return {
          type: faker.helpers.arrayElement([
            "Dry",
            "Reefer",
            "Open Top",
            "Flat Rack",
            "Tank",
          ]),
          size: faker.helpers.arrayElement(["20", "40"]),
          quantity: faker.number.int({
            min: 1,
            max: 10,
          }),
        };
      }),
      emptyPickupPlace: createDummyPlaceInformation(faker.location.city()),
      emptyPickupDate: DateTime.fromJSDate(faker.date.recent()),
    } as MergeTableType;
  });

  const columns = [
    columnHelper.display({
      id: "selection",
      cell: (props) => {
        return (
          <MdCheckbox
            disabled={props.row.index === 0}
            className="m-2"
            checked={props.row.getIsSelected()}
          />
        );
      },
    }),

    columnHelper.display({
      id: "sequence",
      header: "Seq.",
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.row.index + 1}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNo",
      header: "Booking No.",
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.cell.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("totalWeight", {
      id: "totalWeight",
      header: "Total Weight(KG)",
      size: 120,
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="flex-1 text-right p-2"
          >
            {props.cell
              .getValue()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("containers", {
      id: "typeSize",
      header: "Type/Size",
      size: 240,
      cell: (props) => {
        return (
          <div className="flex flex-col flex-1">
            {props.cell.getValue().map((container, index) => {
              return (
                <MdTypography
                  key={index}
                  variant="body"
                  size="medium"
                  className="flex-1 h-12 p-2 border-b border-b-outlineVariant w-full last:border-b-0"
                >
                  {container.type + " " + container.size + "ft"}
                </MdTypography>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("containers", {
      id: "quantity",
      header: "Qty",
      size: 80,
      cell: (props) => {
        return (
          <div className="flex flex-col flex-1">
            {props.cell.getValue().map((container, index) => {
              return (
                <MdTypography
                  key={index}
                  variant="body"
                  size="medium"
                  className="flex-1 h-12 p-2 border-b border-b-outlineVariant w-full last:border-b-0 text-right"
                >
                  {container.quantity}
                </MdTypography>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("emptyPickupPlace", {
      id: "emptyPickupPlace",
      header: "Empty Pick-up CY",
      size: 240,
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.cell.getValue().code}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("emptyPickupDate", {
      id: "emptyPickupDate",
      header: "Empty Pick-up Date",
      size: 200,
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.cell.getValue().toFormat("yyyy. MM. dd")}
          </MdTypography>
        );
      },
    }),
  ];

  return (
    <MergeSelectionTable
      data={isSourceDataEmpty ? candidateData : [sourceData, ...candidateData]}
      columnDefs={columns}
      className="mt-2"
      onRowSelectionChange={(selectedRows) => {
        console.log(selectedRows);
      }}
    />
  );
};
