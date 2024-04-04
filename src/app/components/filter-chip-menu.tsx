import { ArrowDropDown, Check } from "@mui/icons-material";
import { MdFilterChip, MdRippleEffect } from "../util/md3";
import { MdTypography } from "./typography";
import { useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
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
  });

  const {} = useTransitionStyles(context, basicDropdownStyles);

  return (
    <>
      <MdTypography
        variant="label"
        size="large"
        className="relative text-onSecondaryContainer bg-secondaryContainer p-2 flex items-center gap-2 rounded-lg cursor-pointer select-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MdRippleEffect />
        <Check fontSize="small" />
        {props.initialValue}
        <ArrowDropDown
          fontSize="small"
          className={`transform transition ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </MdTypography>
    </>
  );
};
