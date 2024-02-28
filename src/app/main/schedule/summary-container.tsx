import { AnimatePresence, motion } from "framer-motion";

export default function SummaryContainer({
  open,
  children,
  collapseSize = 150,
}: {
  open: boolean;
  children: React.ReactNode;
  collapseSize?: number;
}) {
  return (
    <div className="fixed left-0 translate-x-20 -translate-y-8 w-[calc(100%-80px)] pb-2 overflow-hidden rounded-t-2xl z-20">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -collapseSize }}
            animate={{ y: 0 }}
            exit={{ y: -collapseSize }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="bg-white shadow-md flex justify-center"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
