import { DateTime } from "luxon";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CSSProperties, useEffect, useMemo, useState } from "react";

import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import { BasicTable } from "@/app/components/basic-table";
import { MdTypography } from "@/app/components/typography";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdChipSet,
  MdElevation,
  MdFilterChip,
  MdIcon,
  MdIconButton,
  MdListItem,
  MdMenuItem,
  MdTextButton,
} from "@/app/util/md3";
import { SISearchTableProps, SIState } from "@/app/util/typeDef/si";
import { faker, fi } from "@faker-js/faker";
import { Menu } from "@headlessui/react";
import { ArrowDropDown, Download } from "@mui/icons-material";
import {
  Row,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import SIStateChip from "./si-state-chip";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import ActionButtons from "./table-action-buttons";
import StatusFilterComponent from "@/app/components/status-filter";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { set } from "lodash";
import Link from "next/link";

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
  function handleSITableRowSelection(newRow: Row<SISearchTableProps>) {
    if (selectedRows.includes(newRow.original)) {
      setSelectedRows(
        selectedRows.filter((selected) => selected !== newRow.original)
      );
    } else {
      if (
        newRow.original.blState === SIState.Rejected ||
        newRow.original.blState === SIState.Pending ||
        newRow.original.blState === SIState.BLIssuePending ||
        newRow.original.blState === SIState.BLIssueClosed
      ) {
        setSelectedRows([newRow.original]);
      } else {
        if (
          selectedRows.length > 0 &&
          (selectedRows[0].blState === SIState.Rejected ||
            selectedRows[0].blState === SIState.Pending ||
            selectedRows[0].blState === SIState.BLIssuePending ||
            selectedRows[0].blState === SIState.BLIssueClosed)
        ) {
          setSelectedRows([newRow.original]);
        } else {
          setSelectedRows([...selectedRows, newRow.original]);
        }
      }
    }
  }

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
      header: () => (
        <MdCheckbox
          className="mx-2"
          checked={
            selectedRows.length !== 0 &&
            selectedRows.length ===
              tableData.filter((row) => {
                return row.blState === SIState.Rejected ||
                  row.blState === SIState.Pending ||
                  row.blState === SIState.BLIssuePending ||
                  row.blState === SIState.BLIssueClosed
                  ? false
                  : true;
              }).length
              ? true
              : false
          }
          onClick={(e) => {
            e.preventDefault();
            if (selectedRows.length !== 0) {
              setSelectedRows([]);
            } else {
              setSelectedRows(
                tableData.filter((row) => {
                  return row.blState === SIState.Rejected ||
                    row.blState === SIState.Pending ||
                    row.blState === SIState.BLIssuePending ||
                    row.blState === SIState.BLIssueClosed
                    ? false
                    : true;
                })
              );
            }
          }}
        />
      ),
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
            <Link href={`/main/documents/si/preview?reqNo=` + info.getValue()}>
              <MdTypography variant="body" size="medium" className="underline">
                {info.getValue()}
              </MdTypography>
            </Link>
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
        <Link href={`/main/booking/information/confirmation`}>
          <MdTypography variant="body" size="medium" className="underline">
            {info.getValue()}
          </MdTypography>
        </Link>
      ),
      size: 160,
      minSize: 160,
    }),
    columnHelper.accessor("blState", {
      header: "B/L Status",
      cell: (info) =>
        info.getValue() === SIState.None ? (
          <></>
        ) : (
          <SIStateChip state={info.getValue()} />
        ),
      size: 150,
      minSize: 150,
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(row.getValue(id));
      },
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
        const isDisabled =
          info.row.original.blState ===
          (SIState.Rejected ||
            SIState.Pending ||
            SIState.BLIssuePending ||
            SIState.BLIssueClosed)
            ? true
            : false;

        return (
          <Menu>
            <Menu.Button
              className={`w-full h-10 flex items-center justify-between ${
                isDisabled ? "text-outlineVariant" : "cursor-pointer"
              }`}
              onClick={(e) => {
                isDisabled ? e.preventDefault() : e.stopPropagation();
              }}
              disabled={isDisabled}
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
                  <MdMenuItem
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
                  </MdMenuItem>
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
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
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
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnPinning: {
        left: ["select", "requestNumber", "bookingNumber", "blState"],
      },
    },
    enableMultiRowSelection: false,
  });

  return (
    <>
      <MdChipSet>
        <StatusFilterComponent
          statusOptions={Object.values(SIState)}
          onChange={(states) => {
            table.getColumn("blState")?.setFilterValue(states);
          }}
        />
        <MdFilterChip label="My Shipment " />
      </MdChipSet>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <MdTextButton>
            <div slot="icon">
              <Download fontSize="small" />
            </div>
            Download
          </MdTextButton>
          <ActionButtons selectionList={selectedRows} />
        </div>

        <div>
          <MdTypography variant="label" size="large" className="text-outline">
            Total: {tableData.length}
          </MdTypography>
        </div>
      </div>

      <div className="relative overflow-auto w-full max-w-full">
        <OverlayScrollbarsComponent>
          <BasicTable
            table={table}
            onRowSelction={(row) => {
              handleSITableRowSelection(row);
            }}
          />
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
}
