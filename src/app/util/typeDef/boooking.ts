import { DateTime } from "luxon";
import { VesselInfoType, PlaceInformationType } from "./schedule";

export type CommodityType = {
  code: string;
  description: string;
};

export interface PartyInterface {
  name: string;
  address: string;
}

export type PartiesType = {
  shipper: PartyInterface;
  freightForwarder: PartyInterface;
  consignee: PartyInterface;
  actualShipper: string;
};

export enum BookingStatus {
  Requested = "Requested",
  ChangeRequested = "Change Requested",
  CancelRequested = "Cancel Requested",
  Cancelled = "Cancelled",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
}

export type BookingStatusTableProps = {
  requestNo: string;
  status: BookingStatus;
  bookingNo: string;
  requestDate: DateTime;
  actualShipper: string;
  vessel: VesselInfoType;
  requestDepartureTime: DateTime;
  estimatedTimeofDeparture: {
    date: DateTime;
    status: "normal" | "delayed" | "early";
  };
  origin: string;
  destination: string;
  cargoClosingTime: DateTime;
  docClosingTime: DateTime;
  vgmCutOffTime: DateTime;
  via: "web" | "general" | "edi";
  qty: string;
};

export type CargoPickUpReturnType = {
  commodity: CommodityType;
  grossWeight: string;
  grossWeightUnit: "KGS" | "LBS";
  emptyPickUpDate: DateTime;
  fullReturnDate: DateTime;
  emptyPickUpLocation: PlaceInformationType;
  fullReturnLocation: PlaceInformationType;
};

export type LocationScheduleType = {
  searchType: "schedule" | "earliest";
  originPort: PlaceInformationType;
  destinationPort: PlaceInformationType;
  originType: "cy" | "door";
  destinationType: "cy" | "door";
  pol: string;
  pod: string;
  departureDate: DateTime;
  vessel: VesselInfoType;
  bookingOffice: string;
  contractNumber: string;
};

export type ContactInformationType = {
  name: string;
  address: string;
  telNo: string;
  faxNo: string;
  email: string[];
};

export type AdditionalInformatioType = {
  attachments: File[];
  specialInstruction: string;
  duplicateCount: number;
  emailSubscription: {
    rollOver: boolean;
    vesselDeparture: boolean;
    vesselAdvanceDelay: boolean;
  };
};

export interface BookingInformationRequestType {
  locationSchedule: LocationScheduleType;
  parties: PartiesType;
  cargoPickUpReturn: CargoPickUpReturnType;
  additionalInformation: AdditionalInformatioType;
  contactInformation: ContactInformationType;
}
