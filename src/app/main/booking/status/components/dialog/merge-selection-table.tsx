import { useRecoilState } from "recoil";

import { MdTypography } from "@/app/components/typography";
import { BookingMergeState } from "@/app/store/booking.store";
import tableStyles from "@/app/styles/table.module.css";
import { MdCheckbox } from "@/app/util/md3";
import { MergeTableType } from "@/app/util/typeDef/booking";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const useMergeSelectionTable = ({
  candidateData,
  disableSelection,
  isMerged,
}: {
  candidateData: MergeTableType[];
  disableSelection?: boolean;
  isMerged?: boolean;
}) => {
  const columnHelper = createColumnHelper<MergeTableType>();
  const [mergeCandidateData, setMergeCandidateData] =
    useRecoilState(BookingMergeState);

  const columns = [
    columnHelper.display({
      id: "selection",
      enableHiding: disableSelection,
      cell: (props) => {
        return (
          <MdCheckbox
            disabled={props.row.index === 0}
            className="m-2"
            checked={
              mergeCandidateData.findIndex(
                (data) =>
                  data.bookingNumber === props.row.original.bookingNumber
              ) !== -1
            }
          />
        );
      },
    }),

    columnHelper.display({
      id: "sequence",
      header: "Seq.",
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.row.index + 1}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNo",
      header: "Booking No.",
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.cell.getValue()}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("totalWeight", {
      id: "totalWeight",
      header: "Total Weight(KG)",
      size: 120,
      cell: (props) => {
        return (
          <MdTypography
            variant="body"
            size="medium"
            className="flex-1 text-right p-2"
          >
            {props.cell
              .getValue()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("containers", {
      id: "typeSize",
      header: "Type/Size",
      size: 240,
      cell: (props) => {
        const firstContainer = mergeCandidateData[0].containers;

        return (
          <div className="flex flex-col flex-1">
            {props.cell.getValue().map((container, index) => {
              // compare with first mergeCandidateData container
              const currentContainerTypeSize = container.type + container.size;
              const currentContainerQuantity = container.quantity;
              const firstContainerQuantity = firstContainer.find(
                (firstContainer) =>
                  firstContainer.type + firstContainer.size ===
                  currentContainerTypeSize
              )?.quantity;

              const isDifferentQuantity =
                currentContainerQuantity !== firstContainerQuantity;

              return (
                <MdTypography
                  key={index}
                  variant="body"
                  size="medium"
                  className={`flex-1 h-12 p-2 border-b border-b-outlineVariant w-full last:border-b-0 ${
                    isMerged && isDifferentQuantity
                      ? "text-primary font-semibold bg-primary-80"
                      : ""
                  }`}
                >
                  {container.type + " " + container.size + "ft"}
                </MdTypography>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("containers", {
      id: "quantity",
      header: "Qty",
      size: 80,
      cell: (props) => {
        const firstContainer = mergeCandidateData[0].containers;

        return (
          <div className="flex flex-col flex-1">
            {props.cell.getValue().map((container, index) => {
              const currentContainerTypeSize = container.type + container.size;
              const currentContainerQuantity = container.quantity;
              const firstContainerQuantity = firstContainer.find(
                (firstContainer) =>
                  firstContainer.type + firstContainer.size ===
                  currentContainerTypeSize
              )?.quantity;

              const isDifferentQuantity =
                currentContainerQuantity !== firstContainerQuantity;

              return (
                <MdTypography
                  key={index}
                  variant="body"
                  size="medium"
                  className={`flex-1 h-12 p-2 border-b border-b-outlineVariant w-full last:border-b-0 text-right ${
                    isMerged && isDifferentQuantity
                      ? "text-primary font-semibold bg-primary-80"
                      : ""
                  }`}
                >
                  {container.quantity}
                </MdTypography>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("emptyPickupPlace", {
      id: "emptyPickupPlace",
      header: "Empty Pick-up CY",
      size: 240,
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.cell.getValue().code}
          </MdTypography>
        );
      },
    }),
    columnHelper.accessor("emptyPickupDate", {
      id: "emptyPickupDate",
      header: "Empty Pick-up Date",
      size: 200,
      cell: (props) => {
        return (
          <MdTypography variant="body" size="medium" className="flex-1 p-2">
            {props.cell.getValue().toFormat("yyyy. MM. dd")}
          </MdTypography>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: candidateData,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  function resetSelection() {
    console.log("reset");
    setMergeCandidateData([candidateData[0]]);
  }

  function renderTable() {
    return (
      <div className={`w-full flex relative mt-2`}>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="mx-2 group"
                    hidden={header.column.columnDef.enableHiding}
                  >
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
                <tr
                  key={row.id}
                  className={`group ${
                    disableSelection ? "" : "cursor-pointer"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        hidden={cell.column.columnDef.enableHiding}
                        className={`mx-2 p-0 group border-r border-r-outlineVariant last:border-r-0 first:border-r-0 ${
                          disableSelection
                            ? ""
                            : "group-hover:bg-primary-80 group-first:bg-primary-80"
                        } ${
                          isMerged && cell.column.id === "totalWeight"
                            ? "bg-primary-80 text-primary font-semibold"
                            : "bg-white"
                        }`}
                        onClick={() => {
                          if (row.index === 0 || disableSelection) return;

                          if (
                            mergeCandidateData.findIndex(
                              (data) =>
                                data.bookingNumber ===
                                cell.row.original.bookingNumber
                            ) !== -1
                          ) {
                            setMergeCandidateData((prev) =>
                              prev.filter(
                                (data) =>
                                  data.bookingNumber !==
                                  cell.row.original.bookingNumber
                              )
                            );
                          } else {
                            setMergeCandidateData((prev) => [
                              ...prev,
                              cell.row.original,
                            ]);
                          }
                        }}
                      >
                        <div className={`w-full flex-1 flex items-center`}>
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
  }

  return {
    renderTable,
    resetSelection,
  };
};
