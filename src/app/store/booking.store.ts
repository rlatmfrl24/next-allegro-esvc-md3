import { DateTime } from "luxon";
import { atom } from "recoil";
import {
  ContactInformationType,
  LocationScheduleType,
  PartiesType,
  PartyInterface,
  CargoPickUpReturnType,
  CommodityType,
  AdditionalInformatioType,
  BookingInformationRequestType,
  ContainerInformationType,
  ReeferContainerInformationType,
  DryContainerInformationType,
  TankContainerInformationType,
  OpenTopContainerInformationType,
  FlatRackContainerInformationType,
  BulkContainerInformationType,
  BookingStatusTableProps,
} from "../util/typeDef/boooking";
import { PlaceInformationType, VesselInfoType } from "../util/typeDef/schedule";

export const CurrentBookingDataState = atom<
  BookingStatusTableProps | undefined
>({
  key: "currentBookingDataState",
  default: undefined,
});

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
    additionalInformation: {
      id: "additionalInformation",
      title: "Addtional Information",
      isSelected: false,
      isCompleted: false,
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
    email: "",
    address: "",
    telNo: "",
    faxNo: "",
    emailRecipient: [],
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
    pol: {} as PlaceInformationType,
    pod: {} as PlaceInformationType,
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
    attachment: null,
    specialInstruction: "",
    duplicateCount: 1,
    emailSubscription: {
      rollOver: false,
      vesselAdvanceDelay: false,
      vesselDeparture: false,
    },
  },
});

export const ContainerState = atom<{
  dry: DryContainerInformationType[];
  reefer: ReeferContainerInformationType[];
  tank: TankContainerInformationType[];
  opentop: OpenTopContainerInformationType[];
  flatrack: FlatRackContainerInformationType[];
  bulk: BulkContainerInformationType[];
}>({
  key: "containerState",
  default: {
    dry: [],
    reefer: [],
    tank: [],
    opentop: [],
    flatrack: [],
    bulk: [],
  },
});

export const BookingInformationState = atom<BookingInformationRequestType[]>({
  key: "bookingInformationState",
  default: [],
});
