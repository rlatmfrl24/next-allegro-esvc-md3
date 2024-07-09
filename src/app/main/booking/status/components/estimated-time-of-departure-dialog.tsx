import { useState } from "react";
import VesselStatusNotesDialog from "./vessel-status-notes";
import Portal from "@/app/components/portal";
import { BookingStatusTableProps } from "@/app/util/typeDef/booking";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

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
                // status: "delayed",
                status: faker.helpers.arrayElement(["delayed", "early"]),
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
