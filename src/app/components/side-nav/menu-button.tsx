import {
  MdFilledIconButton,
  MdIcon,
  MdIconButton,
  MdRippleEffect,
} from "@/app/util/md3";
import React, { CSSProperties } from "react";

export const MenuIconButton = (props: {
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  return props.isSelected ? (
    <MdIconButton
      className="bg-pointColor rounded-full"
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              return;
            }
      }
    >
      <MdIcon className="text-onSurface">{props.icon}</MdIcon>
    </MdIconButton>
  ) : (
    <MdFilledIconButton
      style={
        {
          "--md-sys-color-primary":
            "var(--md-sys-color-on-primary-fixed-variant)",
        } as CSSProperties
      }
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              return;
            }
      }
    >
      <MdIcon>{props.icon}</MdIcon>
    </MdFilledIconButton>
  );
};
