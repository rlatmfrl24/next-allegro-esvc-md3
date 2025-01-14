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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import tableStyles from "@/app/styles/table.module.css";
import { DateTime } from "luxon";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";

export const useBookingMergeDialog = () => {
  const [open, setOpen] = useState(false);

  function renderDialog() {
    return <BookingMergeDialog open={open} handleOpen={setOpen} />;
  }

  return {
    renderDialog,
    setOpen,
  };
};

export function BookingMergeDialog({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
}) {
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const currentLocationScheduleData = useRecoilValue(LocationScheduleState);

  return (
    <Portal selector="#main-container">
      <MdDialog
        open={open}
        closed={() => {
          handleOpen(false);
        }}
        cancel={(e) => {
          e.preventDefault();
        }}
        className="min-w-[960px]"
      >
        <div slot="headline">Booking Merge</div>
        <div slot="content">
          <div className="grid grid-cols-[128px_1fr_128px_1fr] gap-2 mb-6">
            <MdTypography variant="body" size="medium" className="text-outline">
              Booking No.
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentBookingData?.bookingNo}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              Booking Office
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentLocationScheduleData?.bookingOffice}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              Vessel Voyage
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentBookingData?.vessel.vesselName}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              Shipper
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentBookingData?.actualShipper}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              POL/ETD
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentBookingData?.origin +
                ", " +
                currentBookingData?.estimatedTimeofDeparture.date.toFormat(
                  "yyyy. MM. dd"
                )}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              POD/ETA
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentBookingData?.destination +
                ", " +
                currentLocationScheduleData?.departureDate.toFormat(
                  "yyyy. MM. dd"
                )}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              Term
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentLocationScheduleData?.originType.toUpperCase() +
                " - " +
                currentLocationScheduleData?.destinationType.toUpperCase()}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-outline">
              Booking Date
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface"
            >
              {currentBookingData?.requestDate.toFormat("yyyy. MM. dd")}
            </MdTypography>
          </div>
          <DetailTitle title="Container Information" />
          <BookingMergeTable />
        </div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              handleOpen(false);
            }}
          >
            Close
          </MdOutlinedButton>
          <MdFilledButton>Merge</MdFilledButton>
        </div>
      </MdDialog>
    </Portal>
  );
}

const BookingMergeTable = () => {
  type MergeTableType = {
    bookingNumber: string;
    totalWeight: number;
    typeSize: string;
    quantity: number;
    emptyPickupPlace: PlaceInformationType;
    emptyPickupDate: DateTime;
  };
  const columnHelper = createColumnHelper<MergeTableType>();

  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const currentCargoPickUpReturnData = useRecoilValue(CargoPickUpReturnState);
  const currentContainerData = useRecoilValue(ContainerState);

  const candidateBookingData = useMemo(() => {
    const candidates = [] as MergeTableType[];

    Array.from({ length: 10 }).map((_, index) => {
      const itemCount = faker.number.int({ min: 1, max: 3 });
      const typeVariants = ["Dry", "Reefer", "Open Top", "Flat Rack", "Tank"];

      const typeSizeList = Array.from({ length: itemCount })
        .map((_, index) => {
          const type = faker.helpers.arrayElement(typeVariants);
          const size = faker.helpers.arrayElement([20, 40]);
          return `${type} ${size}ft`;
        })
        .filter((value, index, self) => self.indexOf(value) === index);

      const bookingNumber = faker.string.alphanumeric(10).toUpperCase();
      const totalWeight = faker.number.int({ min: 1000, max: 10000 });
      const emptyPickupPlace = createDummyPlaceInformation(
        faker.location.city()
      );
      const emptyPickupDate = DateTime.fromJSDate(faker.date.recent());

      const data = typeSizeList.map((typeSize) => {
        return {
          bookingNumber,
          totalWeight,
          typeSize: typeSize,
          quantity: faker.number.int({ min: 1, max: 10 }),
          emptyPickupPlace,
          emptyPickupDate,
        } as MergeTableType;
      });

      candidates.push(...data);
    });

    return candidates;
  }, []);

  const sourceBookingData = useMemo(() => {
    const dryData = currentContainerData.dry.map((item) => {
      return {
        bookingNumber: currentBookingData?.bookingNo || "",
        totalWeight: currentCargoPickUpReturnData?.grossWeight || 0,
        typeSize: item.type + " " + item.size + "ft",
        quantity: item.quantity,
        emptyPickupPlace: currentCargoPickUpReturnData?.emptyPickUpLocation,
        emptyPickupDate: currentCargoPickUpReturnData?.emptyPickUpDate,
      } as MergeTableType;
    });

    const reeferData = currentContainerData.reefer.map((item) => {
      return {
        bookingNumber: currentBookingData?.bookingNo || "",
        totalWeight: currentCargoPickUpReturnData?.grossWeight || 0,
        typeSize: item.type + " " + item.size + "ft",
        quantity: item.quantity,
        emptyPickupPlace: currentCargoPickUpReturnData?.emptyPickUpLocation,
        emptyPickupDate: currentCargoPickUpReturnData?.emptyPickUpDate,
      } as MergeTableType;
    });

    const opentopData = currentContainerData.opentop.map((item) => {
      return {
        bookingNumber: currentBookingData?.bookingNo || "",
        totalWeight: currentCargoPickUpReturnData?.grossWeight || 0,
        typeSize: item.type + " " + item.size + "ft",
        quantity: item.quantity,
        emptyPickupPlace: currentCargoPickUpReturnData?.emptyPickUpLocation,
        emptyPickupDate: currentCargoPickUpReturnData?.emptyPickUpDate,
      } as MergeTableType;
    });

    const flatrackData = currentContainerData.flatrack.map((item) => {
      return {
        bookingNumber: currentBookingData?.bookingNo || "",
        totalWeight: currentCargoPickUpReturnData?.grossWeight || 0,
        typeSize: item.type + " " + item.size + "ft",
        quantity: item.quantity,
        emptyPickupPlace: currentCargoPickUpReturnData?.emptyPickUpLocation,
        emptyPickupDate: currentCargoPickUpReturnData?.emptyPickUpDate,
      } as MergeTableType;
    });

    const tankData = currentContainerData.tank.map((item) => {
      return {
        bookingNumber: currentBookingData?.bookingNo || "",
        totalWeight: currentCargoPickUpReturnData?.grossWeight || 0,
        typeSize: item.type + " " + item.size + "ft",
        quantity: item.quantity,
        emptyPickupPlace: currentCargoPickUpReturnData?.emptyPickUpLocation,
        emptyPickupDate: currentCargoPickUpReturnData?.emptyPickUpDate,
      } as MergeTableType;
    });

    const totalSourceData = [
      ...dryData,
      ...reeferData,
      ...opentopData,
      ...flatrackData,
      ...tankData,
      ...candidateBookingData,
    ];

    return totalSourceData;
  }, [
    candidateBookingData,
    currentBookingData?.bookingNo,
    currentCargoPickUpReturnData?.emptyPickUpDate,
    currentCargoPickUpReturnData?.emptyPickUpLocation,
    currentCargoPickUpReturnData?.grossWeight,
    currentContainerData.dry,
    currentContainerData.flatrack,
    currentContainerData.opentop,
    currentContainerData.reefer,
    currentContainerData.tank,
  ]);

  const columns = [
    columnHelper.display({
      id: "selection",
      cell: (props) => {
        return <MdCheckbox checked={props.row.getIsSelected()} />;
      },
    }),

    columnHelper.display({
      id: "sequence",
      header: "Seq.",
      cell: (props) => {
        return <div>{props.row.index + 1}</div>;
      },
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNo",
      header: "Booking No.",
      meta: {
        enableRowSpan: true,
      },
      cell: (props) => {
        return props.cell.getValue();
      },
    }),
    columnHelper.accessor("totalWeight", {
      id: "totalWeight",
      header: "Total Weight(KG)",
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="flex-1 text-right"
          >
            {props.cell
              .getValue()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("typeSize", {
      id: "typeSize",
      header: "Type/Size",
      cell: (props) => {
        return props.cell.getValue();
      },
    }),
    columnHelper.accessor("quantity", {
      id: "quantity",
      header: "Qty",
      size: 80,
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="flex-1 text-right"
          >
            {props.cell.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("emptyPickupPlace", {
      id: "emptyPickupPlace",
      header: "Empty Pick-up CY",
      size: 240,
      cell: (props) => {
        return props.cell.getValue().code;
      },
    }),
    columnHelper.accessor("emptyPickupDate", {
      id: "emptyPickupDate",
      header: "Empty Pick-up Date",
      size: 200,
      cell: (props) => {
        return props.cell.getValue().toFormat("yyyy-MM-dd HH:mm");
      },
    }),
  ];

  const table = useReactTable<MergeTableType>({
    columns: columns,
    data: sourceBookingData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex relative">
      <table className={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="mx-2 group">
                  <div
                    className={`mx-px w-full border-r border-r-outlineVariant h-8 flex items-center px-2 group-last:border-r-0 group-first:border-r-0`}
                  >
                    <MdTypography variant="body" size="medium" prominent>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </MdTypography>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="group cursor-pointer">
                {row.getVisibleCells().map((cell) => {
                  // calculate rowspan with booking number column
                  cell.column.columnDef.meta?.enableRowSpan;
                  // https://codesandbox.io/p/sandbox/react-table-rowspan-oq32go?file=%2Fsrc%2FApp.tsx%3A55%2C14

                  return (
                    <td
                      key={cell.id}
                      className="mx-2 group bg-white border-r border-r-outlineVariant last:border-r-0 first:border-r-0 group-hover:bg-primary-80"
                      onClick={() => {
                        row.toggleSelected();
                      }}
                    >
                      <div
                        className={`w-full flex-1 h-8 flex items-center px-2`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
