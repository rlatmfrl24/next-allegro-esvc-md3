import { MdElevatedCard, MdFilledTonalButton } from "@/app/util/md3";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function MyFavorite() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    placement: "bottom-end",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useDismiss(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
    click,
  ]);

  return (
    <>
      <MdFilledTonalButton
        ref={refs.setReference}
        {...getReferenceProps}
        className="h-fit mt-2"
        onClick={() => {
          setIsPopoverOpen(!isPopoverOpen);
        }}
      >
        My Favorite
      </MdFilledTonalButton>
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <MdElevatedCard className="p-6">11</MdElevatedCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
