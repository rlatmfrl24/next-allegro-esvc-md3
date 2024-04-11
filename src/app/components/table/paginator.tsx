import { Pagination } from "@mui/material";
import { MdTypography } from "../typography";
import {
  MdElevatedCard,
  MdIcon,
  MdList,
  MdListItem,
  MdTextButton,
} from "@/app/util/md3";
import { Check, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import {
  FloatingFocusManager,
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicPopoverStyles } from "@/app/util/constants";
import { Table } from "@tanstack/react-table";

export const TablePaginator = ({ table }: { table: Table<any> }) => {
  const [isSizeOptionsOpen, setIsSizeOptionsOpen] = useState(false);
  const pageSizeOptions = [10, 20, 30, 50, 100];

  const { refs, floatingStyles, context } = useFloating({
    open: isSizeOptionsOpen,
    onOpenChange: setIsSizeOptionsOpen,
    middleware: [shift(), offset(6)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: floatingTransitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <div className="flex items-center gap-2">
      <Pagination
        count={table.getPageCount()}
        page={table.getState().pagination.pageIndex + 1}
        onChange={(event, page) => {
          table.setPageIndex(page - 1);
        }}
      />
      <MdTypography variant="label" size="large" className="text-outline">
        Rows per page:
      </MdTypography>
      <MdTextButton
        trailingIcon
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {table.getState().pagination.pageSize}
        <MdIcon slot="icon">
          <ChevronRight className="rotate-90" fontSize="small" />
        </MdIcon>
      </MdTextButton>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {isMounted && (
          <FloatingFocusManager context={context}>
            <div style={floatingTransitionStyles}>
              <MdElevatedCard className="py-2 min-w-24">
                <MdList className="bg-surfaceContainerLow">
                  {pageSizeOptions.map((size) => (
                    <MdListItem
                      type="button"
                      key={size}
                      className="text-center"
                      onClick={() => {
                        table.setPageSize(size);
                        setIsSizeOptionsOpen(false);
                      }}
                    >
                      {size === table.getState().pagination.pageSize && (
                        <MdIcon slot="start">
                          <Check fontSize="small" />
                        </MdIcon>
                      )}
                      {size}
                    </MdListItem>
                  ))}
                </MdList>
              </MdElevatedCard>
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </div>
  );
};
