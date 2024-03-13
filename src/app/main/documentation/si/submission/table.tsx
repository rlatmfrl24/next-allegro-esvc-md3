import { BasicTable } from "@/app/components/basic-table";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdIcon,
  MdIconButton,
  MdListItem,
  MdRippleEffect,
} from "@/app/util/md3";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useMemo, useState } from "react";
import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import { MdTypography } from "@/app/components/typography";
import SIStateChip from "./si-state-chip";
import { ArrowDropDown } from "@mui/icons-material";
import { Menu } from "@headlessui/react";

type SISearchTableProps = {
  requestNumber: string;
  bookingNumber: string;
  blState: SIState;
  blNumber: string;
  requestBlType: string;
  actualShipper: string;
  SiCutOffTime: DateTime;
  requestUpdateDate: DateTime;
  vessel: VesselInfoType;
  origin: string;
  destination: string;
  bookingVia: string;
  estimatedTimeofBerth: DateTime;
  estimatedTimeofDeparture: DateTime;
  estimatedTimeofArrival: DateTime;
  blType: string;
};

function createDummySITableData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    requestNumber: `R${faker.string.numeric(10)}`,
    bookingNumber: faker.string.alphanumeric(12).toUpperCase(),
    blState: faker.helpers.arrayElement(Object.values(SIState)),
    blNumber: faker.string.alphanumeric(12).toUpperCase(),
    requestBlType: faker.helpers.arrayElement([
      "O.BL",
      "SeaWaybill",
      "Surrender",
      "None",
    ]),
    actualShipper: faker.person.fullName(),
    SiCutOffTime: DateTime.local(),
    requestUpdateDate: DateTime.local(),
    vessel: createDummyVesselInformation(),
    origin: faker.location.city(),
    destination: faker.location.city(),
    bookingVia: faker.helpers.arrayElement(["web", "edi", "general"]),
    estimatedTimeofBerth: DateTime.local(),
    estimatedTimeofDeparture: DateTime.local(),
    estimatedTimeofArrival: DateTime.local(),
    blType: faker.helpers.arrayElement(["", "FCL", "LCL"]),
  }));
}

export default function SITable() {
  const tempTableData: SISearchTableProps[] = useMemo(
    () => createDummySITableData(30),
    []
  );
  const [tableData, setTableData] = useState<SISearchTableProps[]>([]);
  const [selectedRows, setSelectedRows] = useState<SISearchTableProps[]>([]);

  useEffect(() => {
    setTableData(tempTableData);
  }, [tempTableData]);

  const columnHelper = createColumnHelper<SISearchTableProps>();
  const columns = [
    columnHelper.display({
      id: "select",
      header: () => <MdCheckbox className="mx-2" />,
      cell: (info) => (
        <MdCheckbox
          className="mx-2"
          checked={
            // if selectedRows includes the current row, return true
            selectedRows.includes(info.row.original) ? true : false
          }
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      ),
      size: 52,
      minSize: 52,
    }),
    columnHelper.accessor("requestNumber", {
      header: "Request No.",
      cell: (info) => {
        return (
          <span className="flex justify-between items-center gap-2">
            <MdTypography variant="body" size="medium" className="underline">
              {info.getValue()}
            </MdTypography>
            <MdIconButton>
              <MdIcon>
                <div className="flex items-center justify-center">
                  <RemarkIcon />
                </div>
              </MdIcon>
            </MdIconButton>
          </span>
        );
      },
      size: 165,
      minSize: 165,
    }),
    columnHelper.accessor("bookingNumber", {
      header: "Booking No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium" className="underline">
          {info.getValue()}
        </MdTypography>
      ),
      size: 160,
      minSize: 160,
    }),
    columnHelper.accessor("blState", {
      header: "B/L Status",
      cell: (info) => <SIStateChip state={info.getValue()} />,
    }),
    columnHelper.accessor("blNumber", {
      header: "B/L No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlType", {
      header: "Request B/L Type",
      cell: (info) => {
        return (
          <Menu>
            {({ open }) => {
              return (
                <div className="relative">
                  <Menu.Button
                    className={`w-full flex items-center justify-between`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="flex-1 flex justify-start"
                    >
                      {info.getValue()}
                    </MdTypography>
                    <ArrowDropDown />
                  </Menu.Button>
                  <Menu.Items
                    style={{
                      boxShadow:
                        "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3) ",
                    }}
                    className={`absolute z-10 bg-surfaceContainerHigh rounded-lg py-2`}
                  >
                    {["None", "O.BL", "Surrender", "SeaWaybill"].map(
                      (option) => (
                        <Menu.Item key={option}>
                          {({ active }) => {
                            return (
                              <MdListItem
                                type="button"
                                className={` ${
                                  active ? "bg-secondaryContainer" : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {option}
                              </MdListItem>
                            );
                          }}
                        </Menu.Item>
                      )
                    )}
                  </Menu.Items>
                </div>
              );
            }}
          </Menu>
        );
      },
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("actualShipper", {
      header: "Actual Shipper",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 150,
      minSize: 150,
    }),
    columnHelper.accessor("SiCutOffTime", {
      header: "S/I Cut Off Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("requestUpdateDate", {
      header: "Request (Update) Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="whitespace-nowrap underline"
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("bookingVia", {
      header: "Booking Via",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {
            {
              web: "Web",
              edi: "EDI",
              general: "General",
            }[info.getValue()]
          }
        </MdTypography>
      ),
    }),
    columnHelper.accessor("estimatedTimeofBerth", {
      header: "Estimated Time of Berth",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofDeparture", {
      header: "Estimated Time of Departure",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("estimatedTimeofArrival", {
      header: "Estimated Time of Arrival",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
      size: 120,
      minSize: 120,
    }),
    columnHelper.accessor("blType", {
      header: "B/L Type",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 80,
      minSize: 80,
    }),
  ];

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["select", "requestNumber", "bookingNumber"],
      },
    },
    enableMultiRowSelection: false,
  });

  return (
    <>
      <div className="relative overflow-auto w-full max-w-full">
        <OverlayScrollbarsComponent>
          <BasicTable
            table={table}
            onRowSelction={(row) => {
              // if selectedRows includes the current row, remove it
              if (selectedRows.includes(row.original)) {
                setSelectedRows(
                  selectedRows.filter((selected) => selected !== row.original)
                );
              } else {
                // if row's bl state is 'bl issue request' and selectrows's all bl state is 'bl issue request', just add the row
                if (
                  row.original.blState === SIState.BLIssueRequest &&
                  selectedRows.every(
                    (selected) => selected.blState === SIState.BLIssueRequest
                  )
                ) {
                  setSelectedRows([...selectedRows, row.original]);
                } else {
                  //else, clear the selected rows and add the row
                  setSelectedRows([row.original]);
                }
              }
            }}
          />
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
}
