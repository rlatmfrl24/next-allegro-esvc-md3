import { DateTime } from "luxon";
import { atom } from "recoil";
import {
  AdditionalInformatioType,
  CargoPickUpReturnType,
  CommodityType,
  ContactInformationType,
  LocationScheduleType,
  PartiesType,
  PartyInterface,
  PlaceInformationType,
  VesselInfoType,
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
    additionalInformation: {
      id: "additionalInformation",
      title: "Addtional Information",
      isSelected: false,
      isCompleted: true,
    },
    contactInformation: {
      id: "contactInformation",
      title: "Contact Information",
      isSelected: false,
      isCompleted: false,
    },
  },
});

export const ContactInformationState = atom<ContactInformationType>({
  key: "contactInformationState",
  default: {
    name: "",
    address: "",
    telNo: "",
    faxNo: "",
    email: [],
  },
});

export const LocationScheduleState = atom<LocationScheduleType>({
  key: "locationScheduleState",
  default: {
    searchType: "schedule",
    originPort: {} as PlaceInformationType,
    destinationPort: {} as PlaceInformationType,
    originType: "cy",
    destinationType: "cy",
    pol: "",
    pod: "",
    departureDate: DateTime.now(),
    vessel: {} as VesselInfoType,
    bookingOffice: "",
    contractNumber: "",
  },
});

export const PartiesState = atom<PartiesType>({
  key: "partiesState",
  default: {
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

export const CargoPickUpReturnState = atom<CargoPickUpReturnType>({
  key: "cargoPickUpReturnState",
  default: {
    commodity: {
      code: "",
      description: "",
    } as CommodityType,
    grossWeight: "0.000",
    grossWeightUnit: "KGS",
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

export const AdditionalInformationState = atom<AdditionalInformatioType>({
  key: "etcDataState",
  default: {
    attachments: [] as File[],
    specialInstruction: "",
    duplicateCount: 1,
    emailSubscription: {
      rollOver: false,
      vesselAdvanceDelay: false,
      vesselDeparture: false,
    },
  },
});
