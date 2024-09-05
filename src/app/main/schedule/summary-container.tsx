import { UserState } from "@/app/store/global.store";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";

export default function SummaryContainer({
  open,
  children,
  collapseSize = 150,
}: {
  open: boolean;
  children: React.ReactNode;
  collapseSize?: number;
}) {
  const userData = useRecoilValue(UserState);

  return (
    <div
      className={`fixed left-0 -translate-y-7 pb-2 overflow-hidden rounded-t-2xl z-10 ${
        userData.isAuthenticated
          ? "translate-x-[72px] w-[calc(100%-72px)]"
          : "w-full"
      }`}
    >
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
