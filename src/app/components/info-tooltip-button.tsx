import {
  useFloating,
  offset,
  shift,
  autoUpdate,
  useTransitionStyles,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager,
  flip,
} from "@floating-ui/react";
import { InfoOutlined } from "@mui/icons-material";
import { useState } from "react";
import { basicPopoverStyles } from "../util/constants";
import { MdIconButton, MdIcon } from "../util/md3";
import { RichTooltipContainer, RichTooltipItem } from "./tooltip";

export const InfoTooltipButton = (props: {
  title: string;
  supportingText: string;
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const { isMounted, styles: tooltipStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );
  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "tooltip",
    }),
  ]);

  return (
    <>
      <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
        <MdIcon>
          <InfoOutlined />
        </MdIcon>
      </MdIconButton>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            style={floatingStyles}
            ref={refs.setFloating}
            {...getFloatingProps()}
            className="z-10 max-w-96"
          >
            <div style={tooltipStyles}>
              <RichTooltipContainer>
                <RichTooltipItem
                  slot="content"
                  title={props.title}
                  supportingText={props.supportingText}
                />
              </RichTooltipContainer>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
