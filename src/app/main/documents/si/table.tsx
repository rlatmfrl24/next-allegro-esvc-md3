import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdChipSet,
  MdFilterChip,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { SISearchTableProps, SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Download } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";

import SIStateChip from "./si-state-chip";
import ActionButtons from "./table-action-buttons";

function createDummySITableData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    requestNumber: `R${faker.string.numeric(10)}`,
    bookingNumber: faker.string.alphanumeric(12).toUpperCase(),
    blState: faker.helpers.arrayElement(Object.values(SIState)),
    blNumber: faker.string.alphanumeric(12).toUpperCase(),
    requestBlType: faker.helpers.arrayElement([
      "Original B/L",
      "Sea Waybill",
      "B/L Surrender",
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
    () => createDummySITableData(900),
    []
  );
  const [tableData, setTableData] = useState<SISearchTableProps[]>([]);
  const [selectedRows, setSelectedRows] = useState<SISearchTableProps[]>([]);
  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

  useEffect(() => {
    setTableData(tempTableData);
  }, [tempTableData]);

  useEffect(() => {
    setSelectedRows([]);
  }, [tableData]);

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
        <MdCheckbox className="mx-2" checked={info.row.getIsSelected()} />
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
        <Link
          href={`/main/booking/information/confirmation`}
          className="w-fit block"
        >
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
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentVessel(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
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
      {renderDialog()}
      <BasicTable
        ActionComponent={(table) => {
          return (
            <div className="flex flex-1 gap-2 items-center">
              <MdChipSet>
                <StatusFilterComponent
                  statusOptions={Object.values(SIState)}
                  onChange={(states) => {
                    table.setColumnFilters([
                      {
                        id: "blState",
                        value: states,
                      },
                    ]);
                  }}
                />
                <MdFilterChip label="My Shipment " />
              </MdChipSet>

              <MdTextButton>
                <div slot="icon">
                  <Download fontSize="small" />
                </div>
                Download
              </MdTextButton>
              <ActionButtons
                selectionList={selectedRows}
                setTableData={setTableData}
              />
            </div>
          );
        }}
        columns={columns}
        data={tableData}
        controlColumns={["select"]}
        pinningColumns={["select", "requestNumber", "bookingNumber", "blState"]}
        getSelectionRows={(rows, table) => {
          if (selectedRows.length >= rows.length) {
            setSelectedRows(rows);
          } else {
            const newSelectedRow = rows.filter((row) => {
              return !selectedRows.includes(row);
            })[0];

            if (
              newSelectedRow.blState === SIState.Rejected ||
              newSelectedRow.blState === SIState.Pending ||
              newSelectedRow.blState === SIState.BLIssuePending ||
              newSelectedRow.blState === SIState.BLIssueClosed
            ) {
              setSelectedRows([newSelectedRow]);
              table.getSelectedRowModel().rows.map((row) => {
                if (
                  row.original.requestNumber !== newSelectedRow.requestNumber
                ) {
                  row.toggleSelected();
                }
              });
            } else {
              const newSelectedRows = rows.filter((row) => {
                return row.blState === SIState.Rejected ||
                  row.blState === SIState.Pending ||
                  row.blState === SIState.BLIssuePending ||
                  row.blState === SIState.BLIssueClosed
                  ? false
                  : true;
              });
              setSelectedRows(newSelectedRows);
              table.getRowModel().rows.map((row) => {
                if (!newSelectedRows.includes(row.original)) {
                  row.toggleSelected(false);
                }
              });
            }
          }
        }}
      />
    </>
  );

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
}
