import { Row, Table, flexRender } from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "../typography";
import { useMemo } from "react";
import { getCommonPinningStyles } from "../table/util";
import { MemoizedTableBody, TableBody } from "../table/table-body";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

// This component will be deprecated in the future
export const BasicTable = ({
  table,
  onRowSelction,
}: {
  table: Table<any>;
  onRowSelction?: (row: Row<any>, columnId: string | undefined) => void;
}) => {
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
    >
      <table
        className={styles.table}
        style={{
          ...columnSizeVars,
          width: table.getCenterTotalSize(),
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <thead key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    ...getCommonPinningStyles(header.column),
                    // width: header.getSize(),
                    width: `calc(var(--header-${header?.id}-size) * 1px)`,
                  }}
                  className="max-h-14 h-14"
                >
                  <div className="h-full flex items-center">
                    <MdTypography
                      variant="body"
                      size="medium"
                      prominent
                      className="p-2 flex-1 select-none"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </MdTypography>

                    <div
                      onMouseDown={(e) => {
                        // table.resetRowSelection();
                        header.getResizeHandler()(e);
                      }}
                      onTouchStart={(e) => {
                        // table.resetRowSelection();
                        header.getResizeHandler()(e);
                      }}
                      className={`w-2 h-[calc(100%-16px)] cursor-col-resize border-r border-r-outlineVariant`}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        ))}
        {table.getState().columnSizingInfo.isResizingColumn ? (
          <MemoizedTableBody table={table} />
        ) : (
          <TableBody table={table} />
        )}
      </table>
    </DndContext>
  );
};
