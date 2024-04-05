import { ArrowDropDown, Check } from "@mui/icons-material";
import {
  MdElevatedCard,
  MdIcon,
  MdList,
  MdListItem,
  MdRippleEffect,
} from "../util/md3";
import { MdTypography } from "./typography";
import { useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicDropdownStyles } from "../util/constants";

export const FilterChipMenu = (props: {
  initialValue: string;
  options: string[];
  onChange?: (value: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selection, setSelection] = useState(props.initialValue);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [offset(3), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(
    context,
    basicDropdownStyles
  );

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <MdTypography
          variant="label"
          size="large"
          className="relative text-onSecondaryContainer bg-secondaryContainer px-2 py-1.5 flex items-center gap-2 rounded-lg cursor-pointer select-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MdRippleEffect />
          <Check fontSize="small" />
          {selection}
          <ArrowDropDown
            fontSize="small"
            className={`transform transition ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </MdTypography>
      </div>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-20"
        >
          <MdElevatedCard
            style={{
              ...styles,
            }}
          >
            <MdList className="rounded-2xl">
              {props.options.map((option) => (
                <MdListItem
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelection(option);
                    setIsMenuOpen(false);
                    props.onChange?.(option);
                  }}
                  className={
                    selection === option ? "bg-surfaceContainerHigh" : ""
                  }
                >
                  <MdIcon slot="start" hidden={selection !== option}>
                    <Check fontSize="small" />
                  </MdIcon>
                  <div slot="headline">{option}</div>
                </MdListItem>
              ))}
            </MdList>
          </MdElevatedCard>
        </div>
      )}
    </>
  );
};
