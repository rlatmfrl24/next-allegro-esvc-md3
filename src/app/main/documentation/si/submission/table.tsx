import { BasicTable } from "@/app/components/basic-table";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdElevation,
  MdIcon,
  MdIconButton,
  MdListItem,
} from "@/app/util/md3";
import { SISearchTableProps, SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import { MdTypography } from "@/app/components/typography";
import SIStateChip from "./si-state-chip";
import { ArrowDropDown } from "@mui/icons-material";
import { Menu } from "@headlessui/react";
import VesselInfoCell from "./vessel-info-cell";

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
    remarks: faker.helpers.maybe(() => faker.lorem.sentence()),
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
            {info.row.original.remarks && (
              <MdIconButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MdIcon>
                  <div className="flex items-center justify-center">
                    <RemarkIcon />
                  </div>
                </MdIcon>
              </MdIconButton>
            )}
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
      size: 150,
      minSize: 150,
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
              style={
                {
                  "--md-elevation-level": 2,
                } as CSSProperties
              }
              className={`absolute z-10 bg-surfaceContainerHigh rounded-lg py-2`}
            >
              <MdElevation />
              {["None", "O.BL", "Surrender", "SeaWaybill"].map((option) => (
                <Menu.Item key={option}>
                  <MdListItem
                    type="button"
                    className={` ${
                      info.getValue() === option ? "bg-secondaryContainer" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTableData((prev) =>
                        prev.map((row) => {
                          if (row === info.row.original) {
                            return {
                              ...row,
                              requestBlType: option,
                            };
                          }
                          return row;
                        })
                      );
                    }}
                  >
                    {option}
                  </MdListItem>
                </Menu.Item>
              ))}
            </Menu.Items>
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
      cell: (info) => <VesselInfoCell {...info.row.original} />,
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