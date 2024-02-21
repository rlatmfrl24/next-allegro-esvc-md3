import { CSSProperties } from "react";
import { MdElevation } from "../util/md3";
import { MdTypography } from "./typography";
import React from "react";

export const PlainTooltip = ({ label }: { label: string }) => {
  return (
    <div className="bg-inverserSurface text-inverseOnSurface rounded overflow-hidden h-6 px-2 flex items-center">
      <MdTypography variant="body" size="small">
        {label}
      </MdTypography>
    </div>
  );
};

export const RichTooltip = () => {};

export const RichTooltipContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const childrenList = React.Children.toArray(children);

  const content = childrenList.find(
    (child) => (child as React.ReactElement).props.slot === "content"
  );

  const actions = childrenList.find(
    (child) => (child as React.ReactElement).props.slot === "actions"
  );

  return (
    <div
      style={
        {
          "--md-elevation-level": 2,
        } as CSSProperties
      }
      className="relative bg-surfaceContainer pt-3 pb-2 px-4 rounded-xl"
    >
      <MdElevation />
      <div
        aria-label="tooltip-content-container"
        className="flex flex-col gap-2"
      >
        {content && content}
      </div>
      <div aria-label="tooltip-action-container">{actions && actions}</div>
    </div>
  );
};

export const RichTooltipItem = ({
  title,
  supportingText,
}: {
  title: string;
  supportingText: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <MdTypography
        variant="title"
        size="small"
        className="text-onSurfaceVariant"
      >
        {title}
      </MdTypography>
      <MdTypography
        variant="body"
        size="medium"
        className="text-onSurfaceVariant"
      >
        {supportingText}
      </MdTypography>
    </div>
  );
};
