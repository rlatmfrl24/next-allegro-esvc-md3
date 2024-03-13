import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import VesselResultTable from "./result-table";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VesselInformationDialog from "../popup/vessel-information";
import {
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { DividerComponent } from "../../booking/information/components/base";

export function VesselScheduleResult({
  vesselData,
  vesselSchedules,
}: {
  vesselData: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
}) {
  const [isDirectOnly, setIsDirectOnly] = useState(false);
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
        className="h-px w-full border-b border-dashed border-outlineVariant mt-6 mb-4"
      ></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MdTextButton>
            <MdIcon slot="icon">
              <DownloadIcon fontSize="small" />
            </MdIcon>
            Download
          </MdTextButton>
          <DividerComponent orientation="vertical" className="h-8 mx-2" />
          <NaToggleButton
            label="Direct Only"
            state={isDirectOnly ? "checked" : "unchecked"}
            onClick={() => {
              setIsDirectOnly((prev) => !prev);
            }}
          />
        </div>
        <MdTypography variant="label" size="large" className="text-outline">
          Ports Total:{vesselSchedules.length}
        </MdTypography>
      </div>
      <VesselResultTable data={vesselSchedules} />
      <VesselInformationDialog
        open={isVesselInformationOpen}
        handleOpen={setIsVesselInformationOpen}
        data={vesselData}
      />
    </>
  );
}
