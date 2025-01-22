import { CSSProperties, Dispatch, useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

import { MdTypography } from "@/app/components/typography";
import { BookingSplitState } from "@/app/store/booking.store";
import tableStyles from "@/app/styles/table.module.css";
import { MdIcon, MdIconButton, MdOutlinedTextField } from "@/app/util/md3";
import { BookingSplitType, SplitTableType } from "@/app/util/typeDef/booking";
import { AddBoxOutlined, DeleteOutline } from "@mui/icons-material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GridSelectionComponent, useSkipper } from "./util";

export const SplitInputTable = ({
  originBooking,
}: {
  originBooking: BookingSplitType;
}) => {
  const [tableData, setTableData] = useRecoilState(BookingSplitState);

  const typeSizeOptions = useMemo(() => {
    const options = originBooking.containers.reduce((acc, container) => {
      if (!acc.includes(container.typeSize)) {
        acc.push(container.typeSize);
      }
      return acc;
    }, [] as string[]);

    return options;
  }, [originBooking.containers]);

  const getSlotOptionsByTypeSize = useCallback(
    (typeSize: string) => {
      const containerSet = [] as SplitTableType["containers"];
      let slotCursor = 1;

      originBooking.containers.map((container) => {
        Array.from({ length: container.quantity }).map(() => {
          containerSet.push({
            typeSize: container.typeSize,
            slot: slotCursor,
            quantity: 1,
          });
          slotCursor++;
        });
      });

      return containerSet
        .filter((container) => container.typeSize === typeSize)
        .map((container) => container.slot) as unknown as string[];
    },
    [originBooking.containers]
  );

  const columnDefs = useMemo(() => {
    const InputStyles = {
      "--md-sys-typescale-body-large-size": "14px",
      "--md-outlined-field-top-space": "6px",
      "--md-outlined-field-bottom-space": "6px",
    } as CSSProperties;
    const columnHelper = createColumnHelper<SplitTableType>();

    return [
      columnHelper.display({
        id: "sequence",
        header: "Seq.",
        size: 60,
        cell: (props) => {
          return (
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurface flex items-center h-full px-2"
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
              className="text-onSurface flex items-center h-full px-2"
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
            <div className="p-2">
              <MdOutlinedTextField
                style={InputStyles}
                className="w-full text-right"
                type="number"
                noSpinner
                value={props.row.original.weight?.toString() || ""}
                onBlur={(e) => {
                  const value = e.currentTarget.value;
                  const newValue = parseInt(value) || 0;
                  props.table.options.meta?.updateData(
                    props.row.index,
                    "weight",
                    newValue
                  );
                }}
              />
            </div>
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
            size: 160,
            cell: (props) => {
              return (
                <>
                  {props.row.original.containers.map((container, index) => {
                    return (
                      <GridSelectionComponent
                        key={`${container}_${index}`}
                        value={container.typeSize}
                        options={typeSizeOptions}
                        onSelectionChange={(value) => {
                          const newContainers = [
                            ...props.row.original.containers,
                          ];
                          newContainers[index] = {
                            ...container,
                            typeSize: value,
                            slot: undefined,
                            quantity: undefined,
                          };

                          props.table.options.meta?.updateData(
                            props.row.index,
                            "containers",
                            newContainers
                          );
                        }}
                      />
                    );
                  })}
                </>
              );
            },
          }),
          columnHelper.accessor("containers.slot", {
            id: "slot",
            header: "Slot No.",
            cell: (props) => {
              return (
                <>
                  {props.row.original.containers.map((container, index) => {
                    return (
                      <GridSelectionComponent
                        key={`${container}_${index}`}
                        value={container.slot?.toString() || ""}
                        options={
                          container.typeSize
                            ? getSlotOptionsByTypeSize(container.typeSize)
                            : []
                        }
                        onSelectionChange={(value) => {
                          const newContainers = [
                            ...props.row.original.containers,
                          ];
                          newContainers[index] = {
                            ...container,
                            slot: parseFloat(value) || 0,
                            quantity: undefined,
                          };

                          props.table.options.meta?.updateData(
                            props.row.index,
                            "containers",
                            newContainers
                          );
                        }}
                      />
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
                <div className="w-full flex flex-col">
                  {props.row.original.containers.map((container, index) => {
                    return (
                      <div
                        className="flex items-center gap-2 p-2 border-b border-b-outlineVariant last:border-b-0"
                        key={index}
                      >
                        <MdOutlinedTextField
                          style={InputStyles}
                          className="w-full text-right"
                          type="number"
                          noSpinner
                          value={container.quantity?.toString() || ""}
                          onBlur={(e) => {
                            const value = e.currentTarget.value;
                            const newValue = parseFloat(value) || 0;
                            const newContainers = [
                              ...props.row.original.containers,
                            ];
                            newContainers[
                              props.row.original.containers.indexOf(container)
                            ] = {
                              ...container,
                              quantity: newValue,
                            };

                            props.table.options.meta?.updateData(
                              props.row.index,
                              "containers",
                              newContainers
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            },
          }),
          columnHelper.display({
            id: "edit",
            header: "Edit",
            size: 60,
            cell: (props) => {
              return (
                <div className="w-full flex flex-col">
                  {props.row.original.containers.map((container, index) => {
                    return (
                      <div
                        key={index}
                        className="p-1.5 flex justify-center border-b border-b-outlineVariant last:border-b-0"
                      >
                        {index === 0 ? (
                          <MdIconButton
                            onClick={() => {
                              // add new container on current row
                              const newContainer = {
                                typeSize: undefined,
                                slot: undefined,
                                quantity: undefined,
                              };
                              const newContainers = [
                                ...props.row.original.containers,
                              ];
                              newContainers.push(newContainer);

                              props.table.options.meta?.updateData(
                                props.row.index,
                                "containers",
                                newContainers
                              );
                            }}
                          >
                            <MdIcon>
                              <AddBoxOutlined />
                            </MdIcon>
                          </MdIconButton>
                        ) : (
                          <MdIconButton
                            onClick={() => {
                              // remove container on current row
                              const newContainers = [
                                ...props.row.original.containers,
                              ];
                              newContainers.splice(index, 1);

                              props.table.options.meta?.updateData(
                                props.row.index,
                                "containers",
                                newContainers
                              );
                            }}
                          >
                            <MdIcon>
                              <DeleteOutline />
                            </MdIcon>
                          </MdIconButton>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            },
          }),
        ],
      }),
    ];
  }, [getSlotOptionsByTypeSize, typeSizeOptions]);

  return (
    <div className="w-full flex relative mt-2">
      <RenderTable
        data={tableData}
        columns={columnDefs}
        updater={setTableData}
      />
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
  updater: Dispatch<React.SetStateAction<SplitTableType[]>>;
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
        updater((old) =>
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
