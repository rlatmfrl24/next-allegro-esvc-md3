import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {
  CSSProperties,
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useRecoilState } from "recoil";

import StatusGoodIcon from "@/../public/icon_status_good.svg";
import StatusWarningIcon from "@/../public/icon_status_warning.svg";
import { MdTypography } from "@/app/components/typography";
import { BookingSplitState } from "@/app/store/booking.store";
import tableStyles from "@/app/styles/table.module.css";
import {
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { BookingSplitType, SplitTableType } from "@/app/util/typeDef/booking";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
} from "@floating-ui/react";
import {
  AddBoxOutlined,
  ArrowDropDown,
  DeleteOutline,
} from "@mui/icons-material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export const SplitValidationTable = ({
  originBooking,
}: {
  originBooking: BookingSplitType;
}) => {
  // TODO: Add Validation Components
  const [tableData, setTableData] = useRecoilState(BookingSplitState);

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
  const OriginalContainerList = useMemo(() => {
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

    return containerSet;
  }, [originBooking]);

  const totalSplitWeight = useMemo(() => {
    return tableData.reduce((acc, row) => {
      return acc + (row.weight || 0);
    }, 0);
  }, [tableData]);

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
            <td
              className={`mx-2 p-0 border-r border-r-outlineVariant ${
                originBooking.weight !== totalSplitWeight
                  ? "bg-[#BA1A1A14]"
                  : "bg-[#19658414]"
              }`}
            >
              <MdTypography
                variant="body"
                size="medium"
                className={`text-onSurface justify-end gap-2 px-2 py-3 h-full flex`}
              >
                {totalSplitWeight
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {originBooking.weight !== totalSplitWeight ? (
                  <StatusWarningIcon />
                ) : (
                  <StatusGoodIcon />
                )}
              </MdTypography>
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {OriginalContainerList.map((container) => {
                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0"
                  >
                    {container.typeSize}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {OriginalContainerList.map((container) => {
                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0 text-right"
                  >
                    {container.slot}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {OriginalContainerList.map((container) => {
                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0 text-right"
                  >
                    {container.quantity}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0">
              {OriginalContainerList.map((container) => {
                const currentSlotQuantity = tableData.reduce((acc, row) => {
                  return (
                    acc +
                    row.containers.reduce((acc, splitContainer) => {
                      return (
                        acc +
                        (splitContainer.typeSize === container.typeSize &&
                        splitContainer.slot === container.slot
                          ? splitContainer.quantity || 0
                          : 0)
                      );
                    }, 0)
                  );
                }, 0);

                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className={`flex gap-2 justify-end p-2 border-b border-b-outlineVariant last:border-b-0 ${
                      1 === currentSlotQuantity
                        ? "bg-[#19658414]"
                        : "bg-[#BA1A1A14]"
                    }`}
                  >
                    {currentSlotQuantity}
                    {currentSlotQuantity === 1 ? (
                      <StatusGoodIcon />
                    ) : (
                      <StatusWarningIcon />
                    )}
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

  const initializeSplitTableData = useCallback(
    (originBooking: BookingSplitType, splitCount: number) => {
      return [
        {
          bookingNumber: originBooking.bookingNumber,
          weight: originBooking.weight,
          containers: [
            {
              typeSize: undefined,
              slot: undefined,
              quantity: undefined,
            },
          ],
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

const GridSelectionComponent = ({
  value,
  options,
  onSelectionChange,
}: {
  value?: string;
  options?: string[];
  onSelectionChange?: (value: string) => void;
}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const { refs, floatingStyles, context, placement } = useFloating({
    open: isListOpen,
    onOpenChange: setIsListOpen,
    middleware: [
      offset(2),
      shift(),
      flip({
        padding: 20,
      }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
          flushSync(() => {
            setMaxHeight(availableHeight);
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useFocus(context),
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      className="relative w-full cursor-pointer py-0.5 border-b border-b-outlineVariant last:border-b-0"
    >
      <div className="flex items-center h-12 p-2">
        <div className="flex-1">{value}</div>
        <ArrowDropDown />
      </div>
      {isListOpen && options && options.length > 0 && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-10 rounded"
            {...getFloatingProps()}
          >
            <MdList
              style={
                {
                  boxShadow:
                    "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3) ",
                  maxHeight: maxHeight,
                  minHeight: "2rem",
                } as CSSProperties
              }
              className="relative bg-surfaceContainerLow rounded overflow-y-auto"
            >
              <OverlayScrollbarsComponent defer>
                {options?.map((option, index) => {
                  return (
                    <MdListItem
                      key={index}
                      className="cursor-pointer hover:bg-surfaceContainerHighest"
                      onClick={() => {
                        onSelectionChange?.(option);
                      }}
                    >
                      {option}
                    </MdListItem>
                  );
                })}
              </OverlayScrollbarsComponent>
            </MdList>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
};
