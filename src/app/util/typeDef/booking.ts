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
  personPlacingRequest: "Shipper" | "Forwarder";
  shipper: PartyInterface;
  freightForwarder: PartyInterface;
  consignee: PartyInterface;
  actualShipper: string;
};

export type BookingStatusTableProps = {
  requestNo: string;
  status: BookingStatus;
  hasShippingInstruction: boolean;
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
  grossWeight: string | undefined;
  grossWeightUnit: "KGS" | "LBS";
  emptyPickUpDate: DateTime | undefined;
  fullReturnDate: DateTime | undefined;
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
  email: string;
  emailRecipient: string[];
};

export type AdditionalInformatioType = {
  attachment: File[];
  specialCargoAttachment: {
    dangerousCargo: File[];
    reeferCargo: File[];
    awkwardCargo: File[];
  };
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
  dangerousCargoInformation: DangerousContainerInformationType[];
}

export type DangerousContainerInformationType = {
  uuid: string;
  unNumber: string;
  class: string;
  flashPoint: string;
  packingGroup: string;
  properShippingName: string;
};

export interface DryContainerInformationType extends ContainerInformationType {
  type: ContainerType.dry;
}

export interface ReeferContainerInformationType
  extends ContainerInformationType {
  type: ContainerType.reefer;
  temperatureUnit: "℃" | "℉";
  temperature: number | undefined;
  ventilation: number | undefined;
  ventilationType: "open" | "close";
  nature: string;
  humidity: number | undefined;
  genset: boolean;
}

export interface OpenTopContainerInformationType
  extends ContainerInformationType {
  type: ContainerType.opentop;
  package: number | undefined;
  packageType: string;
  grossWeight: number | undefined;
  grossWeightUnit: "KGS" | "LBS";
  netWeight: number | undefined;
  netWeightUnit: "KGS" | "LBS";
  isAwkward: boolean;
  awkward: AwkwardContainerInformationType;
}

export interface FlatRackContainerInformationType
  extends ContainerInformationType {
  type: ContainerType.flatrack;
  package: number | undefined;
  packageType: string;
  grossWeight: number | undefined;
  grossWeightUnit: "KGS" | "LBS";
  netWeight: number | undefined;
  netWeightUnit: "KGS" | "LBS";
  isAwkward: boolean;
  awkward: AwkwardContainerInformationType;
}

export interface TankContainerInformationType extends ContainerInformationType {
  type: ContainerType.tank;
}

export interface BulkContainerInformationInterface {
  package: number | undefined;
  packageType: string;
  grossWeight: number | undefined;
  grossWeightUnit: "KGS" | "LBS";
  netWeight: number | undefined;
  netWeightUnit: "KGS" | "LBS";
  commodity: CommodityType;
  length: number | undefined;
  width: number | undefined;
  height: number | undefined;
  unit: "CM" | "INCH";
  remark: string;
}

export interface BulkContainerInformationType
  extends BulkContainerInformationInterface {
  uuid: string;
  type: ContainerType.bulk;
  totalMeasurement: number | undefined;
}

export interface AwkwardContainerInformationType {
  commodity: CommodityType;
  length: number | undefined;
  width: number | undefined;
  height: number | undefined;
  unit: "CM" | "INCH";
  remark: string;
}

export interface BookingTemplateProps {
  name: string;
  information: {
    locationSchedule: LocationScheduleType | undefined;
    parties: PartiesType | undefined;
    container: {
      dry: DryContainerInformationType[];
      reefer: ReeferContainerInformationType[];
      opentop: OpenTopContainerInformationType[];
      flatrack: FlatRackContainerInformationType[];
      tank: TankContainerInformationType[];
      bulk: BulkContainerInformationType[];
    };
    cargoPickUpReturn: CargoPickUpReturnType | undefined;
    additionalInformation: AdditionalInformatioType | undefined;
    contactInformation: ContactInformationType | undefined;
  };
}

export type MergeTableType = {
  bookingNumber: string;
  totalWeight: string;
  containers: {
    type: string;
    size: string;
    quantity: number;
  }[];
  emptyPickupPlace: PlaceInformationType;
  emptyPickupDate: DateTime;
};

export type BookingSplitType = {
  bookingNumber: string;
  weight: number;
  containers: {
    typeSize: string;
    quantity: number;
  }[];
};

export type SplitTableType = {
  bookingNumber: string | undefined;
  weight: number | undefined;
  containers: {
    typeSize: string | undefined;
    slot: number | undefined;
    quantity: number | undefined;
  }[];
};
