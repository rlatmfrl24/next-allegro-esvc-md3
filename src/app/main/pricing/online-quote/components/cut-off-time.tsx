import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import { MdTypography } from "@/app/components/typography";
import { MdElevation, MdRippleEffect } from "@/app/util/md3";
import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AccessTime } from "@mui/icons-material";
import { DateTime } from "luxon";
import { CSSProperties, useState } from "react";

export const CutOffTime = (props: { cutOffTime: DateTime }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: "bottom-start",
    middleware: [shift(), offset(4)],
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "tooltip",
    }),
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <MdTypography
          className="text-primary bg-surfaceContainerLow px-2 py-0.5 rounded-full gap-0.5 flex items-center cursor-pointer"
          variant="label"
          size="small"
          style={
            {
              "--md-elevation-level": 1,
            } as CSSProperties
          }
        >
          <MdElevation />
          <MdRippleEffect />
          <AccessTime
            sx={{
              fontSize: 16,
            }}
          />
          Cut Off
        </MdTypography>
      </div>
      {isTooltipOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-10 max-w-60"
        >
          <RichTooltipContainer>
            <RichTooltipItem
              slot="content"
              title="Cargo Cut Off Time"
              supportingText={props.cutOffTime.toFormat("yyyy-MM-dd HH:mm")}
            />
          </RichTooltipContainer>
        </div>
      )}
    </>
  );
};
