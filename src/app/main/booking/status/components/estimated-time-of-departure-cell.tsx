import { MdTypography } from "@/app/components/typography";
import { BookingStatusTableProps } from "@/app/util/typeDef";
import { useState } from "react";
import VesselStatusNotesDialog from "./vessel-status-notes";
import Portal from "@/app/components/portal";
import { Info } from "@mui/icons-material";

const EstimatedTimeofDepartureCell = (row: BookingStatusTableProps) => {
  const [isVesselStatusNotesDialogOpen, setIsVesselStatusNotesDialogOpen] =
    useState(false);
  const cellValue = row.estimatedTimeofDeparture;

  return (
    <div
      className="flex p-2 "
      onClick={(e) => {
        e.stopPropagation();
        setIsVesselStatusNotesDialogOpen(true);
      }}
    >
      <MdTypography
        variant="body"
        size="medium"
        className={`text-onSurfaceVariant ${
          cellValue.status !== "normal" ? "underline cursor-pointer" : ""
        }`}
      >
        {cellValue.date.toFormat("yyyy-MM-dd HH:mm")}
      </MdTypography>
      {cellValue.status !== "normal" && (
        <Info
          className={`m-0.5 ${
            cellValue.status === "early" ? "text-[#325BDA]" : "text-error"
          }`}
          sx={{ fontSize: "16px" }}
        />
      )}
      <Portal selector="#main-container">
        <VesselStatusNotesDialog
          open={isVesselStatusNotesDialogOpen}
          handleOpen={setIsVesselStatusNotesDialogOpen}
          bookingData={row}
        />
      </Portal>
    </div>
  );
};

export default EstimatedTimeofDepartureCell;
