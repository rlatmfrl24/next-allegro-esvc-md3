"use client";

import { useState } from "react";
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

export const NAOutlinedTextField = ({ ...props }: MdOutlinedTextFieldProps) => {
  const [value, setValue] = useState(props.value || "");

  return (
    <div className="relative flex">
      <MdOutlinedTextFieldBase
        {...props}
        value={value}
        className="flex-1"
        onInput={(e) => setValue((e.target as HTMLInputElement).value)}
        required={false}
      >
        {value !== "" && props.label && (
          <MdIconButton
            slot="trailing-icon"
            onClick={() => {
              setValue("");
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
