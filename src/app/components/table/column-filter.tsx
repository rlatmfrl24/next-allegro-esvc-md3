import { basicPopoverStyles } from "@/app/util/constants";
import {
  useFloating,
  hide,
  offset,
  shift,
  autoUpdate,
  useTransitionStyles,
  useInteractions,
  useClick,
  useDismiss,
  FloatingFocusManager,
  size,
} from "@floating-ui/react";
import { Table } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { MdTypography } from "../typography";
import {
  MdCheckbox,
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdList,
  MdListItem,
  MdOutlinedIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { PlaylistAddCheck, Settings } from "@mui/icons-material";
import { DividerComponent } from "../divider";

export const ColumnFilterButton = ({
  table,
  expectColumnIds = [],
}: {
  table: Table<any>;
  expectColumnIds?: string[];
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    setVisibleColumns(
      table
        .getAllColumns()
        .filter((column) => column.getIsVisible())
        .map((col) => col.id)
    );
  }, [table, isColumnFilterOpen]);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isColumnFilterOpen,
    onOpenChange: setIsColumnFilterOpen,
    middleware: [
      hide(),
      offset(6),
      shift(),
      size({
        apply({ availableHeight }) {
          flushSync(() => setMaxHeight(availableHeight));
        },
      }),
    ],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);
  return (
    <>
      <MdOutlinedIconButton ref={refs.setReference} {...getReferenceProps()}>
        <MdIcon>
          {/* <Settings /> */}
          <PlaylistAddCheck />
        </MdIcon>
      </MdOutlinedIconButton>
      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          visibility: middlewareData.hide?.referenceHidden
            ? "hidden"
            : "visible",
        }}
        {...getFloatingProps()}
      >
        {isMounted && (
          <FloatingFocusManager context={context}>
            <div style={transitionStyles}>
              <MdElevatedCard>
                <MdTypography variant="title" size="large" className="p-6">
                  Grid Column Setting
                </MdTypography>
                <MdList
                  style={{ maxHeight: maxHeight - 200 }}
                  className="bg-surfaceContainerLow overflow-y-auto"
                >
                  <MdListItem
                    type="button"
                    onClick={() => {
                      setVisibleColumns(
                        table.getAllColumns().map((col) => col.id)
                      );
                    }}
                  >
                    <MdCheckbox
                      slot="start"
                      checked={
                        table.getAllColumns().length === visibleColumns.length
                      }
                      indeterminate={
                        visibleColumns.length > 0 &&
                        visibleColumns.length < table.getAllColumns().length
                      }
                    />
                    Select All
                  </MdListItem>
                  <DividerComponent />
                  {table
                    .getAllColumns()
                    .filter((column) => !expectColumnIds.includes(column.id))
                    .map((column) => (
                      <MdListItem
                        key={column.id}
                        type="button"
                        onClick={() => {
                          setVisibleColumns((prev) => {
                            if (prev.includes(column.id)) {
                              return prev.filter((col) => col !== column.id);
                            } else {
                              return [...prev, column.id];
                            }
                          });
                        }}
                      >
                        <MdCheckbox
                          slot="start"
                          checked={
                            visibleColumns.includes(column.id) ||
                            table.getAllColumns().length ===
                              visibleColumns.length
                          }
                        />
                        {column.columnDef.header as string}
                      </MdListItem>
                    ))}
                </MdList>
                <div
                  aria-label="column-filter-actions"
                  className="flex gap-2 p-6 justify-end"
                >
                  <MdTextButton
                    onClick={() => {
                      table.toggleAllColumnsVisible(true);
                      setIsColumnFilterOpen(false);
                    }}
                  >
                    Reset
                  </MdTextButton>
                  <MdFilledButton
                    onClick={() => {
                      table.getAllColumns().forEach((column) => {
                        column.toggleVisibility(
                          visibleColumns.includes(column.id)
                        );
                      });
                      setIsColumnFilterOpen(false);
                    }}
                  >
                    Apply
                  </MdFilledButton>
                </div>
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </>
  );
};
