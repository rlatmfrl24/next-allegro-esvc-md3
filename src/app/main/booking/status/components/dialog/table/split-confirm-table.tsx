import { MdTypography } from "@/app/components/typography";
import { BookingSplitType, SplitTableType } from "@/app/util/typeDef/booking";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, useEffect, useMemo } from "react";
import { useSkipper } from "./util";
import tableStyles from "@/app/styles/table.module.css";

export const SplitConfirmTable = ({
  originData,
}: {
  originData?: BookingSplitType;
}) => {
  const columnHelper = createColumnHelper<SplitTableType>();

  const data = useMemo(() => {
    if (!originData) {
      return [];
    }

    const containerSet = [] as SplitTableType["containers"];
    let slotCursor = 1;

    originData.containers.map((container) => {
      Array.from({ length: container.quantity }).map(() => {
        containerSet.push({
          typeSize: container.typeSize,
          slot: slotCursor,
          quantity: 1,
        });
        slotCursor++;
      });
    });

    return [
      {
        bookingNumber: originData.bookingNumber,
        weight: originData.weight,
        containers: containerSet,
      },
    ] as SplitTableType[];
  }, [originData]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const columnDefs = [
    columnHelper.display({
      id: "sequence",
      header: "Seq.",
      size: 50,
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurface flex items-center h-12 px-2"
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
            className="text-onSurface flex items-center h-12 px-2"
          >
            {props.getValue() || "-"}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("weight", {
      id: "weight",
      header: "Weight",
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurface justify-end flex items-center h-12 px-2"
          >
            {props.getValue()?.toLocaleString() || "-"}
          </MdTypography>
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
          cell: (props) => {
            return (
              <>
                {props.row.original.containers.map((container, index) => {
                  return (
                    <MdTypography
                      key={index}
                      variant="body"
                      size="medium"
                      className="text-onSurface flex items-center h-12 px-2 border-b border-b-outlineVariant last:border-b-0"
                    >
                      {container.typeSize || "-"}
                    </MdTypography>
                  );
                })}
              </>
            );
          },
        }),
        columnHelper.accessor("containers.slot", {
          id: "slotNumber",
          header: "Slot No.",
          cell: (props) => {
            return (
              <>
                {props.row.original.containers.map((container, index) => {
                  return (
                    <MdTypography
                      key={index}
                      variant="body"
                      size="medium"
                      className="text-onSurface flex items-center h-12 px-2 border-b border-b-outlineVariant last:border-b-0"
                    >
                      {container.slot || "-"}
                    </MdTypography>
                  );
                })}
              </>
            );
          },
        }),
        columnHelper.accessor("containers.quantity", {
          id: "quantity",
          header: "Qty",
          cell: (props) => {
            return (
              <>
                {props.row.original.containers.map((container, index) => {
                  return (
                    <MdTypography
                      key={index}
                      variant="body"
                      size="medium"
                      className="text-onSurface flex items-center h-12 px-2 border-b border-b-outlineVariant last:border-b-0"
                    >
                      {container.quantity || "-"}
                    </MdTypography>
                  );
                })}
              </>
            );
          },
        }),
      ],
    }),
  ];

  return (
    <div className="w-full flex relative mt-2">
      <RenderTable data={data} columns={columnDefs} />
    </div>
  );
};

const RenderTable = ({
  data,
  columns,
  updater,
}: {
  data: SplitTableType[];
  columns: any[];
  updater?: Dispatch<React.SetStateAction<SplitTableType[]>>;
}) => {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        updater?.((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      updateRow: (rowIndex, value) => {},
    },
  });

  return (
    <>
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
                      className={tableStyles.split}
                      style={{
                        width: `${cell.column.columnDef.size}px`,
                      }}
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
    </>
  );
};
