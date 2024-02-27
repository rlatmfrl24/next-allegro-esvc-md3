import Portal from "@/app/components/portal";
import {
  MdElevation,
  MdIcon,
  MdOutlinedButton,
  MdTextButton,
} from "@/app/util/md3";
import { VesselInfoType } from "@/app/util/typeDef";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VesselIcon from "@/../public/icon_vessel.svg";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/summary.module.css";
import VesselInformationDialog from "../popup/vessel-information";

export default function ConditionSummary({
  open,
  condition,
  scrollTop,
}: {
  open: boolean;
  condition: VesselInfoType;
  scrollTop?: () => void;
}) {
  const [isVesselInfomationDialogOpen, setIsVesselInfomationDialogOpen] =
    useState(false);

  return (
    <Portal selector="#main-container">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            exit={{ y: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            style={
              {
                "--md-elevation-level": 1,
              } as CSSProperties
            }
            className={styles.summaryContainer}
          >
            <MdElevation />
            <div className="max-w-[1400px] w-full py-6 flex flex-col flex-1 mx-6">
              <div className="flex text-primary justify-between items-center gap-2 mb-4">
                <div
                  className="flex items-center gap-2"
                  onClick={() => setIsVesselInfomationDialogOpen(true)}
                >
                  <VesselIcon />
                  <MdTypography
                    variant="title"
                    size="large"
                    className="text-onSurface underline cursor-pointer"
                  >
                    {condition.vesselName + " (" + condition.vesselCode + ")"}
                  </MdTypography>
                </div>
                <div className="flex h-fit items-center gap-2.5">
                  <MdTextButton>
                    <MdIcon slot="icon">
                      <ChevronLeftIcon fontSize="small" />
                    </MdIcon>
                    Previous Voyage
                  </MdTextButton>
                  <div
                    aria-label="divider"
                    className="w-px h-6 bg-outlineVariant"
                  ></div>
                  <MdTextButton trailingIcon>
                    Next Voyage
                    <MdIcon slot="icon">
                      <ChevronRightIcon fontSize="small" />
                    </MdIcon>
                  </MdTextButton>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline w-32"
                >
                  Service Lane
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="large"
                  className="text-onSurface"
                >
                  {condition.serviceLane}
                </MdTypography>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline w-32"
                >
                  Consortium Voyage
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="large"
                  className="text-onSurface"
                >
                  {condition.consortiumVoyage}
                </MdTypography>
              </div>
              <div className="flex flex-col items-end">
                <MdOutlinedButton className="w-fit" onClick={scrollTop}>
                  Re-Search
                </MdOutlinedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {condition && (
        <VesselInformationDialog
          open={isVesselInfomationDialogOpen}
          handleOpen={setIsVesselInfomationDialogOpen}
          data={condition}
        />
      )}
    </Portal>
  );
}
