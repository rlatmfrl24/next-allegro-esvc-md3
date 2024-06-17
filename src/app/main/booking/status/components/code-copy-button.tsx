import { MdIcon, MdIconButton, MdRippleEffect } from "@/app/util/md3";
import { Check, ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import { PlainTooltip } from "@/app/components/tooltip";
import {
  autoUpdate,
  offset,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import Portal from "@/app/components/portal";
import CopyIcon from "@/../public/icon_copy_line.svg";

export const CodeCopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: "top-start",
    middleware: [offset(4)],
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context),
  ]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          copyCode();
        }}
        className="flex items-center justify-center w-8 h-8 relative rounded-full cursor-pointer"
      >
        <MdRippleEffect />
        {copied ? (
          <Check className="text-primary" fontSize="small" />
        ) : (
          <CopyIcon />
        )}
      </div>
      <Portal selector="#main-container">
        {isTooltipOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <PlainTooltip label={copied ? "Copied" : "Copy to clipboard"} />
          </div>
        )}
      </Portal>
    </>
  );
};
