import { useState } from "react";

import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import {
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import VesselInformationDialog from "../popup/vessel-information";
import VesselResultTable from "./result-table";

export function VesselScheduleResult({
  vesselData,
  vesselSchedules,
}: {
  vesselData: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
}) {
  const [isVesselInformationOpen, setIsVesselInformationOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex w-full h-fit">
          <div className="flex-1 grid grid-cols-[148px_1fr] gap-1">
            <MdTypography variant="body" size="medium" className="mr-4">
              Vessel
            </MdTypography>
            <div
              onClick={() => {
                if (vesselData.vesselName !== "-")
                  setIsVesselInformationOpen(true);
              }}
            >
              <MdTypography
                variant="body"
                size="large"
                className={`text-primary ${
                  vesselData.vesselName === "-"
                    ? ""
                    : "underline cursor-pointer w-fit"
                }`}
              >
                {vesselData.vesselName}
              </MdTypography>
            </div>
            <MdTypography variant="body" size="medium" className="mr-4">
              Service Lane
            </MdTypography>
            <MdTypography variant="body" size="large" className="text-primary">
              {vesselData.serviceLane}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="mr-4">
              Consortium Voyage
            </MdTypography>
            <MdTypography variant="body" size="large" className="text-primary">
              {vesselData.consortiumVoyage}
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
      </div>
      <div
        aria-label="divider"
        className="h-px w-full border-b border-dashed border-outlineVariant"
      ></div>

      <VesselResultTable data={vesselSchedules} />
      <VesselInformationDialog
        open={isVesselInformationOpen}
        handleOpen={setIsVesselInformationOpen}
        data={vesselData}
      />
    </>
  );
}
