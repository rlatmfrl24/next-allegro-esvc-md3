import { useState } from "react";
import VesselStatusNotesDialog from "./vessel-status-notes";
import Portal from "@/app/components/portal";
import { BookingStatusTableProps } from "@/app/util/typeDef/boooking";
import { DateTime } from "luxon";

export const useEstimatedTimeofDepartureDialog = () => {
  const [isVesselStatusNotesDialogOpen, setIsVesselStatusNotesDialogOpen] =
    useState(false);

  const [bookingData, setBookingData] = useState<BookingStatusTableProps>();

  function renderDialog() {
    return (
      <Portal selector="#main-container">
        <VesselStatusNotesDialog
          open={isVesselStatusNotesDialogOpen}
          handleOpen={setIsVesselStatusNotesDialogOpen}
          bookingData={
            bookingData ||
            ({
              estimatedTimeofDeparture: {
                date: DateTime.now(),
                status: "delayed",
              },
            } as BookingStatusTableProps)
          }
        />
      </Portal>
    );
  }

  return {
    setIsVesselStatusNotesDialogOpen,
    setBookingData,
    renderDialog,
  };
};
