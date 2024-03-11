import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import { VariableElavatedButton } from "@/app/components/variable-buttons";
import { ScrollState } from "@/app/store/global.store";
import { CutOffDataType } from "@/app/util/typeDef/schedule";
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
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function CutOffTooltip({ data }: { data: CutOffDataType }) {
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

  const scrollState = useRecoilValue(ScrollState);

  useEffect(() => {
    setIsCutOffTooltipOpen(false);
  }, [scrollState.yPosition]);

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
                  supportingText={data.documentation.toFormat(
                    "yyyy-MM-dd HH:mm"
                  )}
                />
                <RichTooltipItem
                  slot="content"
                  title="EDI"
                  supportingText={data.EDI.toFormat("yyyy-MM-dd HH:mm")}
                />
                <RichTooltipItem
                  slot="content"
                  title="Cargo"
                  supportingText={data.cargo.toFormat("yyyy-MM-dd HH:mm")}
                />
              </RichTooltipContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
