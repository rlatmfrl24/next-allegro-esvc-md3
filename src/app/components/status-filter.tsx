import { CSSProperties, useEffect, useState } from "react";

import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdElevation,
  MdList,
  MdListItem,
  MdRippleEffect,
} from "@/app/util/md3";
import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown, Check } from "@mui/icons-material";
import { basicPopoverStyles } from "../util/constants";

const StatusFilterComponent = ({
  statusOptions,
  onChange,
}: {
  statusOptions: string[];
  onChange?: (status: string[]) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState(statusOptions);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isStatusFilterOpen,
    onOpenChange: setIsStatusFilterOpen,
    placement: "bottom-start",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const transitionProps = useTransitionStyles(context, basicPopoverStyles);
  const dismiss = useDismiss(context);
  const click = useClick(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="bg-secondaryContainer flex items-center h-8 rounded-lg relative cursor-pointer"
      >
        <MdRippleEffect />
        <Check fontSize="small" className="mx-2" />
        <MdTypography variant="label" size="large" className="select-none">
          {selectedStatus.length === 0
            ? "No Status"
            : selectedStatus.length === statusOptions.length
            ? "All Status"
            : selectedStatus[0] +
              (selectedStatus.length > 1
                ? " +" + (selectedStatus.length - 1)
                : "")}
        </MdTypography>
        <ArrowDropDown fontSize="small" className="mx-2" />
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="z-10"
      >
        {transitionProps.isMounted && (
          <div
            style={
              {
                "--md-elevation-level": 2,
                ...transitionProps.styles,
              } as CSSProperties
            }
            className="bg-surfaceContainerHigh rounded-lg "
          >
            <MdElevation />
            <MdListItem
              type="button"
              className="border-b border-b-outlineVariant pt-2"
              onClick={() => {
                if (selectedStatus.length === statusOptions.length) {
                  setSelectedStatus([]);
                } else {
                  setSelectedStatus(statusOptions);
                }
              }}
            >
              <div
                slot="start"
                className="w-6 h-6 flex items-center justify-center"
              >
                <MdCheckbox
                  checked={selectedStatus.length === statusOptions.length}
                />
              </div>
              {`(${selectedStatus.length}/${statusOptions.length})`}
            </MdListItem>
            <MdList className="bg-surfaceContainerHigh rounded-b-lg">
              {statusOptions.map((status) => (
                <MdListItem
                  key={status}
                  type="button"
                  onClick={() => {
                    if (selectedStatus.includes(status)) {
                      setSelectedStatus(
                        selectedStatus.filter((s) => s !== status)
                      );
                    } else {
                      setSelectedStatus([...selectedStatus, status]);
                    }
                  }}
                >
                  <div
                    slot="start"
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <MdCheckbox checked={selectedStatus.includes(status)} />
                  </div>
                  {status}
                </MdListItem>
              ))}
            </MdList>
          </div>
        )}
      </div>
    </>
  );
};

export default StatusFilterComponent;
