import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { MdTypography } from "@/app/components/typography";
import { BookingSplitState } from "@/app/store/booking.store";
import tableStyles from "@/app/styles/table.module.css";
import { BookingSplitType, SplitTableType } from "@/app/util/typeDef/booking";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdOutlinedTextField } from "@/app/util/md3";

export const SplitValidationTable = ({
  originBooking,
}: {
  originBooking: BookingSplitType;
}) => {
  const HeaderComponent = ({ children }: { children: React.ReactNode }) => {
    return (
      <th className="mx-2 p-0 group">
        <div className="flex items-center h-8 border-r border-r-outlineVariant group-last:border-r-0">
          <MdTypography variant="body" size="medium" prominent className="mx-2">
            {children}
          </MdTypography>
        </div>
      </th>
    );
  };

  return (
    <div className="w-full flex relative mt-2">
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <HeaderComponent>Original Weight (KG)</HeaderComponent>
            <HeaderComponent>Split Weight (KG)</HeaderComponent>
            <HeaderComponent>Type/Size</HeaderComponent>
            <HeaderComponent>Slot No.</HeaderComponent>
            <HeaderComponent>Original Qty</HeaderComponent>
            <HeaderComponent>Split Qty</HeaderComponent>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              <MdTypography
                variant="body"
                size="medium"
                className="text-onSurface text-right px-2 py-3"
              >
                {originBooking.weight
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </MdTypography>
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              <MdTypography
                variant="body"
                size="medium"
                className="text-onSurface text-right px-2 py-3"
              >
                1
              </MdTypography>
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0"
                  >
                    {container.typeSize}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant text-right last:border-b-0"
                  >
                    {container.slot}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant text-right last:border-b-0"
                  >
                    {container.quantity}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant text-right last:border-b-0"
                  >
                    {container.quantity}
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const SplitInputTable = ({
  originBooking,
  splitCount,
}: {
  originBooking: BookingSplitType;
  splitCount: number;
}) => {
  const [tableData, setTableData] = useRecoilState(BookingSplitState);

  const columnHelper = createColumnHelper<SplitTableType>();

  const initializeSplitTableData = useCallback(
    (originBooking: BookingSplitType, splitCount: number) => {
      return [
        {
          bookingNumber: originBooking.bookingNumber,
          weight: originBooking.weight,
          containers: originBooking.containers.map((container) => {
            return {
              typeSize: container.typeSize,
              slot: container.slot,
              quantity: container.quantity,
            };
          }),
        },
        ...Array.from({ length: splitCount - 1 }).map(() => {
          return {
            bookingNumber: undefined,
            weight: undefined,
            containers: [
              {
                typeSize: undefined,
                slot: undefined,
                quantity: undefined,
              },
            ],
          };
        }),
      ];
    },
    []
  );

  useEffect(() => {
    setTableData(initializeSplitTableData(originBooking, splitCount));
  }, [initializeSplitTableData, originBooking, setTableData, splitCount]);

  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  const columnDefs = [
    columnHelper.display({
      id: "sequence",
      header: "Seq.",
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurface flex items-center h-full"
          >
            {props.row.index + 1}
          </MdTypography>
        );
      },
      meta: {
        rowSpan: 2,
      },
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      meta: {
        rowSpan: 2,
      },
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurface flex items-center h-full"
          >
            {props.getValue() || "-"}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("containers", {
      id: "containers",
      header: "Total Weight (KG)",
      cell: (props) => {
        return (
          <MdOutlinedTextField className="w-full" type="number" noSpinner />
        );
      },
    }),
    columnHelper.group({
      id: "containers",
      header: "Container",
      columns: [
        columnHelper.accessor("containers.typeSize", {
          id: "typeSize",
          header: "Type/Size",
        }),
        columnHelper.accessor("containers.slot", {
          id: "slot",
          header: "Slot No.",
        }),
        columnHelper.accessor("containers.quantity", {
          id: "quantity",
          header: "Qty",
        }),
        columnHelper.display({
          id: "edit",
          header: "Edit",
        }),
      ],
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex relative mt-2">
      <table className={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnRelativeDepth = header.depth - header.column.depth;
                if (columnRelativeDepth > 1) {
                  return null;
                }

                let rowSpan = 1;
                if (header.isPlaceholder) {
                  const leafs = header.getLeafHeaders();
                  rowSpan = leafs[leafs.length - 1].depth - header.depth;
                }
                console.log(header.id, rowSpan);

                return (
                  <th
                    key={header.id}
                    className="group h-0 py-2 px-0 border-b border-b-outlineVariant"
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                  >
                    <div className="flex h-full items-center border-r border-r-outlineVariant group-last:border-r-0">
                      <MdTypography
                        variant="body"
                        size="medium"
                        prominent
                        className="mx-2 flex-1 h-8 flex items-center"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </MdTypography>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="h-0 p-2 border-r border-r-outlineVariant last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
