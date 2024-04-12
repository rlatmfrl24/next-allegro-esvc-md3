import { DateTime } from "luxon";
import Link from "next/link";
import { CSSProperties, useEffect, useMemo, useState } from "react";

import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import StatusFilterComponent from "@/app/components/status-filter";
import { NewBasicTable } from "@/app/components/table/new-table";
import { MdTypography } from "@/app/components/typography";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdChipSet,
  MdElevation,
  MdFilterChip,
  MdIcon,
  MdIconButton,
  MdMenuItem,
  MdTextButton,
} from "@/app/util/md3";
import { SISearchTableProps, SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Menu } from "@headlessui/react";
import { ArrowDropDown, Download } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";

import SIStateChip from "./si-state-chip";
import ActionButtons from "./table-action-buttons";

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
  function handleSITableRowSelection(newRow: SISearchTableProps) {
    if (selectedRows.includes(newRow)) {
      setSelectedRows(selectedRows.filter((selected) => selected !== newRow));
    } else {
      if (
        newRow.blState === SIState.Rejected ||
        newRow.blState === SIState.Pending ||
        newRow.blState === SIState.BLIssuePending ||
        newRow.blState === SIState.BLIssueClosed
      ) {
        setSelectedRows([newRow]);
      } else {
        if (
          selectedRows.length > 0 &&
          (selectedRows[0].blState === SIState.Rejected ||
            selectedRows[0].blState === SIState.Pending ||
            selectedRows[0].blState === SIState.BLIssuePending ||
            selectedRows[0].blState === SIState.BLIssueClosed)
        ) {
          setSelectedRows([newRow]);
        } else {
          setSelectedRows([...selectedRows, newRow]);
        }
      }
    }
  }

  const tempTableData: SISearchTableProps[] = useMemo(
    () => createDummySITableData(900),
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
          indeterminate={
            selectedRows.length !== 0 &&
            selectedRows.length !==
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
            e.stopPropagation();
            console.log(selectedRows);
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
      id: "requestNumber",
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
      id: "bookingNumber",
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
      id: "blState",
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
      id: "blNumber",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("requestBlType", {
      id: "requestBlType",
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
      id: "actualShipper",
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
      id: "SiCutOffTime",
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
      id: "requestUpdateDate",
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
      id: "vessel",
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
      id: "origin",
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
      id: "destination",
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
      id: "bookingVia",
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
      id: "estimatedTimeofBerth",
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
      id: "estimatedTimeofDeparture",
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
      id: "estimatedTimeofArrival",
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
      id: "blType",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
      size: 80,
      minSize: 80,
    }),
  ];

  return (
    <>
      <MdChipSet>
        <StatusFilterComponent
          statusOptions={Object.values(SIState)}
          onChange={(states) => {
            setTableData(
              tempTableData.filter((row) => states.includes(row.blState))
            );
          }}
        />
        <MdFilterChip label="My Shipment " />
      </MdChipSet>

      <NewBasicTable
        actionComponent={
          <div className="flex flex-1 gap-2 items-center">
            <MdTextButton>
              <div slot="icon">
                <Download fontSize="small" />
              </div>
              Download
            </MdTextButton>
            <ActionButtons selectionList={selectedRows} />
          </div>
        }
        columns={columns}
        data={tableData}
        controlColumns={["select"]}
        pinningColumns={["select", "requestNumber", "bookingNumber", "blState"]}
        getSelectionRows={(rows) => {
          console.log(rows[0]);
          if (rows[0]) {
            handleSITableRowSelection(rows[0]);
          }

          // handleSITableRowSelection(rows[0]);
        }}
        isSingleSelect
      />

      {/* <div className="relative overflow-auto w-full max-w-full">
        <OverlayScrollbarsComponent>
          <BasicTable
            table={table}
            onRowSelction={(row) => {
              handleSITableRowSelection(row);
            }}
          />
        </OverlayScrollbarsComponent>
      </div> */}
    </>
  );
}
