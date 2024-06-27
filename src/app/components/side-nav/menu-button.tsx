import {
  MdFilledIconButton,
  MdIcon,
  MdIconButton,
  MdRippleEffect,
} from "@/app/util/md3";
import React, { CSSProperties, ComponentProps, HTMLAttributes } from "react";

export const MenuIconButton = ({
  icon,
  isSelected,
  isFocused = false,
  ...props
}: {
  icon: React.ReactNode;
  isSelected?: boolean;
  isFocused?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {isSelected && !isFocused ? (
        <MdIconButton className="bg-pointColor rounded-full">
          <MdIcon className="text-onSurface">{icon}</MdIcon>
        </MdIconButton>
      ) : (
        <MdFilledIconButton
          style={
            {
              "--md-sys-color-primary": isFocused
                ? "var(--md-sys-color-surface-tint)"
                : "var(--md-sys-color-on-primary-fixed-variant)",
            } as CSSProperties
          }
        >
          <MdIcon>{icon}</MdIcon>
        </MdFilledIconButton>
      )}
    </div>
  );
};
