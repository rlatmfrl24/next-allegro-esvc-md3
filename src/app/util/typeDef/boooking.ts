import { DateTime } from "luxon";
import { VesselInfoType, PlaceInformationType } from "./schedule";

export enum ContainerType {
  dry = "Dry",
  reefer = "Reefer",
  opentop = "OpenTop",
  flatrack = "FlatRack",
  tank = "Tank",
  bulk = "Bulk",
}

export enum BookingStatus {
  Requested = "Requested",
  ChangeRequested = "Change Requested",
  CancelRequested = "Cancel Requested",
  Cancelled = "Cancelled",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
}

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
  pol: PlaceInformationType;
  pod: PlaceInformationType;
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
  attachment: File | null;
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
  container: {
    dry: DryContainerInformationType[];
    reefer: ReeferContainerInformationType[];
    opentop: OpenTopContainerInformationType[];
    flatrack: FlatRackContainerInformationType[];
    tank: TankContainerInformationType[];
    bulk: BulkContainerInformationType[];
  };
  cargoPickUpReturn: CargoPickUpReturnType;
  additionalInformation: AdditionalInformatioType;
  contactInformation: ContactInformationType;
}

export interface ContainerInformationType {
  uuid: string;
  size: string;
  type: ContainerType;
  quantity: number;
  soc: number;
  isDangerous: boolean;
  dangerousCargoInformation: DangerousContainerInformationType;
}

export type DangerousContainerInformationType = {
  unNumber: string;
  class: string;
  flashPoint: string;
  packingGroup: string;
  properShippingName: string;
  dangerousCargoCertificate: File[];
};

export interface DryContainerInformationType extends ContainerInformationType {
  type: ContainerType.dry;
}

export interface ReeferContainerInformationType
  extends ContainerInformationType {
  type: ContainerType.reefer;
  temperatureUnit: "℃" | "℉";
  temperature: number;
  ventilation: number;
  ventilationType: "open" | "close";
  nature: string;
  humidity: number;
  genset: boolean;
}

export interface OpenTopContainerInformationType
  extends ContainerInformationType {
  type: ContainerType.opentop;
  isAwkward: boolean;
  awkward: AwkwardContainerInformationType;
}

export interface FlatRackContainerInformationType
  extends ContainerInformationType {
  type: ContainerType.flatrack;
  isAwkward: boolean;
  awkward: AwkwardContainerInformationType;
}

export interface TankContainerInformationType extends ContainerInformationType {
  type: ContainerType.tank;
}

export interface BulkContainerInformationInterface {
  package: number;
  packageType: string;
  grossWeight: number;
  grossWeightUnit: "KGS" | "LBS";
  commodity: CommodityType;
  length: number;
  width: number;
  height: number;
  unit: "CM" | "INCH";
}

export interface BulkContainerInformationType
  extends BulkContainerInformationInterface {
  uuid: string;
  type: ContainerType.bulk;
  totalMeasurement: number;
}

export interface AwkwardContainerInformationType
  extends BulkContainerInformationInterface {
  netWeight: number;
  netWeightUnit: "KGS" | "LBS";
  remark: string;
}
