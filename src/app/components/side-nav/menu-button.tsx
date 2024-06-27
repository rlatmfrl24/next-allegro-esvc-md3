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
  ...props
}: {
  icon: React.ReactNode;
  isSelected?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {isSelected ? (
        <MdIconButton className="bg-pointColor rounded-full">
          <MdIcon className="text-onSurface">{icon}</MdIcon>
        </MdIconButton>
      ) : (
        <MdFilledIconButton
          style={
            {
              "--md-sys-color-primary":
                "var(--md-sys-color-on-primary-fixed-variant)",
            } as CSSProperties
          }
        >
          <MdIcon>{icon}</MdIcon>
        </MdFilledIconButton>
      )}
    </div>
  );
};
