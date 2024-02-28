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
import SummaryContainer from "../summary-container";

export default function ConditionSummary({
  open,
  condition,
  scrollTop,
  className,
}: {
  open: boolean;
  condition: VesselInfoType;
  scrollTop?: () => void;
  className?: string;
}) {
  const [isVesselInfomationDialogOpen, setIsVesselInfomationDialogOpen] =
    useState(false);

  return (
    <>
      <SummaryContainer open={open} collapseSize={300}>
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
      </SummaryContainer>
      {condition && (
        <VesselInformationDialog
          open={isVesselInfomationDialogOpen}
          handleOpen={setIsVesselInfomationDialogOpen}
          data={condition}
        />
      )}
    </>
  );
}
