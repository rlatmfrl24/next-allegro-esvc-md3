"use client";

import { use, useEffect, useRef, useState } from "react";
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
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!props.value || props.value.length === 0) {
      setHasValue(false);
    } else {
      setHasValue(true);
    }
  }, [props.value]);

  return (
    <div className={`relative flex ${className}`}>
      <MdOutlinedTextFieldBase
        {...props}
        ref={inputRef}
        type="text"
        className={`flex-1 ${props.type === "number" ? "text-right" : ""}`}
        onInput={(e) => {
          setHasValue(e.currentTarget.value.length > 0);
          if (props.type === "number") {
            let intValue = parseInt(e.currentTarget.value);
            if (isNaN(intValue)) intValue = 0;
            e.currentTarget.value = intValue.toString();
          }
          handleValueChange?.((e.target as HTMLInputElement).value);
        }}
        required={false}
      >
        {!(props.type === "number" || props.type === "textarea") && (
          <MdIconButton
            slot="trailing-icon"
            className={!props.disabled && hasValue ? "visible" : "invisible"}
            onClick={() => {
              if (inputRef.current) (inputRef.current as any).value = "";
              setHasValue(false);
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
