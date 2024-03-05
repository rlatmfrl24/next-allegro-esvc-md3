import { DateTime } from "luxon";
import { atom } from "recoil";

export const BookingRequestStepState = atom({
  key: "bookingRequestStepState",
  default: {
    locationSchedule: {
      id: "locationSchedule",
      title: "Location & Schedule",
      isSelected: true,
      isCompleted: false,
    },
    parties: {
      id: "parties",
      title: "Parties",
      isSelected: false,
      isCompleted: false,
    },
    cargoPickUpReturn: {
      id: "cargoPickUpReturn",
      title: "Cargo & Pick Up/Return",
      isSelected: false,
      isCompleted: false,
    },
    container: {
      id: "container",
      title: "Container",
      isSelected: false,
      isCompleted: false,
    },
    etc: {
      id: "etc",
      title: "Attachment & Special Instruction & Duplicate Bookings",
      isSelected: false,
      isCompleted: false,
    },
  },
});

export type LocationScheduleDataType = {
  searchType: string;
  originPort: string;
  destinationPort: string;
  originType: "cy" | "door";
  destinationType: "cy" | "door";
  pol: string;
  pod: string;
  departureDate: DateTime;
  bookingOffice: string;
  contractNumber: string;
};

export const LocationScheduleState = atom<LocationScheduleDataType>({
  key: "locationScheduleState",
  default: {
    searchType: "schedule",
    originPort: "",
    destinationPort: "",
    originType: "cy",
    destinationType: "cy",
    pol: "",
    pod: "",
    departureDate: DateTime.now(),
    bookingOffice: "",
    contractNumber: "",
  },
});
