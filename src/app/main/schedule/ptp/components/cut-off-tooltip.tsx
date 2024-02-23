import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import { VariableElavatedButton } from "@/app/components/variable-buttons";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function CutOffTooltip() {
  const [isCutOffTooltipOpen, setIsCutOffTooltipOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isCutOffTooltipOpen,
    onOpenChange: setIsCutOffTooltipOpen,
    placement: "bottom-start",
    middleware: [flip(), shift(), offset(8)],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps}
        onClick={() => {
          setIsCutOffTooltipOpen(!isCutOffTooltipOpen);
        }}
      >
        <VariableElavatedButton
          className="mt-1"
          size="x-small"
          icon={
            <AccessTimeIcon
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
          }
        >
          Cut Off
        </VariableElavatedButton>
        <AnimatePresence>
          {isCutOffTooltipOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps}
              className="z-10"
            >
              <RichTooltipContainer>
                <RichTooltipItem
                  slot="content"
                  title="Documentation"
                  supportingText="2021-09-01 12:00"
                />
                <RichTooltipItem
                  slot="content"
                  title="EDI"
                  supportingText="2021-09-01 12:00"
                />
                <RichTooltipItem
                  slot="content"
                  title="Cargo"
                  supportingText="2021-09-01 12:00"
                />
              </RichTooltipContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
