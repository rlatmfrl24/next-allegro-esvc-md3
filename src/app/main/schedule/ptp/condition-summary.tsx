import Portal from "@/app/components/portal";
import {
  MdChipSet,
  MdElevation,
  MdIcon,
  MdOutlinedButton,
} from "@/app/util/md3";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties } from "react";
import { SearchConditionProps } from "./typeDef";
import { MdTypography } from "@/app/components/typography";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

const SummaryItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col w-[212px]">
      <MdTypography variant="body" size="medium" className="text-outline">
        {title}
      </MdTypography>
      <MdTypography variant="title" size="medium">
        {value}
      </MdTypography>
    </div>
  );
};

const PortChip = ({ port }: { port: string }) => {
  return (
    <MdTypography
      variant="label"
      size="large"
      className="px-3 py-1.5 bg-secondaryContainer text-onSecondaryContainer rounded-lg"
    >
      {port}
    </MdTypography>
  );
};

export default function ConditionSummary({
  open,
  condition,
  scrollTop,
}: {
  open: boolean;
  condition: SearchConditionProps;
  scrollTop?: () => void;
}) {
  return (
    <Portal selector="#main-container">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            style={
              {
                "--md-elevation-level": 1,
              } as CSSProperties
            }
            className="absolute w-full top-0 left-0 h-fit bg-surfaceBright z-10 flex justify-center"
          >
            <MdElevation />
            <div className="max-w-[1400px] w-full py-6 flex mx-6">
              <div className="flex flex-col flex-1 gap-4">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-outline"
                    >
                      Origin
                    </MdTypography>
                    <MdChipSet>
                      {condition.origins.map((origin, index) => (
                        <PortChip key={origin} port={origin} />
                      ))}
                    </MdChipSet>
                  </div>
                  <div className="flex flex-col gap-1">
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-outline"
                    >
                      &nbsp;
                    </MdTypography>
                    <MdIcon>
                      <SwapHorizOutlinedIcon />
                    </MdIcon>
                  </div>
                  <div className="flex flex-col gap-1">
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-outline"
                    >
                      Destination
                    </MdTypography>
                    <MdChipSet>
                      {condition.destinations.map((destination, index) => (
                        <PortChip key={destination} port={destination} />
                      ))}
                    </MdChipSet>
                  </div>
                </div>
                <div className="flex gap-4">
                  <SummaryItem
                    title="Search On"
                    value={
                      condition.searchOn === "departure"
                        ? "Departure"
                        : "Arrival"
                    }
                  />
                  <SummaryItem
                    title="Date"
                    value={`${condition.startDate.toFormat(
                      "yyyy-MM-dd"
                    )} ~ ${condition.endDate.toFormat("yyyy-MM-dd")}`}
                  />
                  <SummaryItem
                    title="Shipping Mode"
                    value={condition.directOnly ? "Direct" : "Indirect"}
                  />
                </div>
              </div>
              <div className="flex h-full justify-end items-end gap-4">
                <MdOutlinedButton onClick={scrollTop}>
                  Re-Search
                </MdOutlinedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
