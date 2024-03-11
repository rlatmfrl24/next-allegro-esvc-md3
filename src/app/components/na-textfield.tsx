"use client";

import { useEffect, useState } from "react";
import {
  MdIcon,
  MdIconButton,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "../util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { MdTypography } from "./typography";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedTextField = ({
  handleValueChange,
  className,
  ...props
}: {
  handleValueChange?: (value: string) => void;
  className?: string;
} & MdOutlinedTextFieldProps) => {
  return (
    <div className={`relative flex ${className}`}>
      <MdOutlinedTextFieldBase
        {...props}
        className="flex-1"
        onInput={(e) =>
          handleValueChange?.((e.target as HTMLInputElement).value)
        }
        required={false}
      >
        {!props.disabled && props.value !== "" && props.label && (
          <MdIconButton
            slot="trailing-icon"
            onClick={() => {
              handleValueChange?.("");
            }}
          >
            <MdIcon>
              <CancelIcon />
            </MdIcon>
          </MdIconButton>
        )}
      </MdOutlinedTextFieldBase>
      {props.required && (
        <MdTypography
          variant="label"
          size="large"
          className="text-error absolute top-0.5 left-1.5"
        >
          *
        </MdTypography>
      )}
    </div>
  );
};
