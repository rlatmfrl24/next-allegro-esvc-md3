import { DateTime } from "luxon";
import { atom } from "recoil";
import {
  BookingRequestorInterface,
  CommodityType,
  PartyInterface,
  PlaceInformationType,
} from "../util/typeDef";

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
      isCompleted: true,
    },
    etc: {
      id: "etc",
      title: "Attachment & Special Instruction & Duplicate Bookings",
      isSelected: false,
      isCompleted: true,
    },
  },
});

export const LocationScheduleState = atom({
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

export const PartiesState = atom<{
  bookingRequestor: BookingRequestorInterface;
  shipper: PartyInterface;
  freightForwarder: PartyInterface;
  consignee: PartyInterface;
  actualShipper: string;
}>({
  key: "partiesState",
  default: {
    bookingRequestor: {
      name: "",
      address: "",
      email: [],
      telNo: "",
      fax: "",
    } as BookingRequestorInterface,
    shipper: {
      name: "",
      address: "",
    } as PartyInterface,
    freightForwarder: {
      name: "",
      address: "",
    } as PartyInterface,
    consignee: {
      name: "",
      address: "",
    } as PartyInterface,
    actualShipper: "",
  },
});

export const CargoPickUpReturnState = atom({
  key: "cargoPickUpReturnState",
  default: {
    commodity: {
      code: "",
      description: "",
    } as CommodityType,
    grossWeight: "0.000",
    emptyPickUpDate: DateTime.now(),
    fullReturnDate: DateTime.now(),
    emptyPickUpLocation: {
      code: "",
      yardName: "",
      address: "",
      phoneNo: "",
      faxNo: "",
      customerNo: "",
      emailAddress: "",
    } as PlaceInformationType,
    fullReturnLocation: {
      code: "",
      yardName: "",
      address: "",
      phoneNo: "",
      faxNo: "",
      customerNo: "",
      emailAddress: "",
    } as PlaceInformationType,
  },
});

export const EtcDataState = atom({
  key: "etcDataState",
  default: {
    attachments: [] as File[],
    specialInstruction: "",
    duplicateBookings: "1",
  },
});
