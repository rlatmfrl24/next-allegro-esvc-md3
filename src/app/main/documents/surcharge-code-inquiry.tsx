import { useMemo, useRef, useState } from "react";

import { BasicTable } from "@/app/components/unused/basic-table";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import Portal from "@/app/components/portal";
import { MdDialog, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

function highlightText(text: string, query: string) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span className="text-error" key={index}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function SurchargeCodeInquiry({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<any>(null);

  type SurchargeTableProps = {
    code: string;
    description: string;
  };

  const tempSurchargeData: SurchargeTableProps[] = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => ({
      code: faker.string.alpha(3).toUpperCase(),
      description:
        faker.commerce.productAdjective() +
        " " +
        faker.commerce.productMaterial(),
    }));
  }, []);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const columnHelper = createColumnHelper<SurchargeTableProps>();
  const columns = [
    columnHelper.accessor("code", {
      header: "Code",
      cell: (info) => {
        return globalFilterValue === ""
          ? info.row.original.code
          : highlightText(info.row.original.code, globalFilterValue);
      },
      size: 120,
      minSize: 120,
      maxSize: 120,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => {
        return globalFilterValue === ""
          ? info.getValue()
          : highlightText(info.getValue(), globalFilterValue);
      },
      size: 500,
    }),
  ];

  const table = useReactTable({
    data: tempSurchargeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: true,
  });

  return (
    <Portal selector="#main-container">
      <MdDialog
        open={open}
        closed={() => {
          onOpenChange(false);
        }}
        ref={dialogRef}
        className="w-[632px] min-h-[720px]"
      >
        <div slot="headline">Surcharge Code Inquiry</div>
        <div slot="content" className="flex flex-col gap-4 ">
          <NAOutlinedTextField
            placeholder="Surcharge Code or Description"
            handleValueChange={(value) => {
              setGlobalFilterValue(value);
              table.setGlobalFilter(String(value));
            }}
          />
          <BasicTable table={table} />
        </div>
        <div slot="actions">
          <MdTextButton
            onClick={() => {
              dialogRef.current.close();
            }}
          >
            Close
          </MdTextButton>
        </div>
      </MdDialog>
    </Portal>
  );
}
