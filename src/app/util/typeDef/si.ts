import { DateTime } from "luxon";
import { PlaceInformationType, VesselInfoType } from "./schedule";
import { ContainerType } from "./boooking";

export enum SealKind {
  Shipper,
  Carrier,
  Consolidator,
  Customs,
  Unknown,
  "Quarantine Agency",
  "Terminal Agency",
}

export enum SIState {
  None = "None",
  TemporarySaved = "Temporary Saved",
  Submit = "Submit",
  ChangeRequested = "Change Requested",
  ChangeRequestedRejected = "Change Requested Rejected",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
  Pending = "Pending",
  BLIssueRequest = "B/L Issue Request",
  BLIssueConfirm = "B/L Issue Confirm",
  BLIssueRejected = "B/L Issue Rejected",
  BLIssuePending = "B/L Issue Pending",
  BLIssueClosed = "B/L Issue Closed",
}

export type SISearchTableProps = {
  requestNumber: string;
  bookingNumber: string;
  blState: SIState;
  blNumber: string;
  requestBlType: string;
  actualShipper: string;
  SiCutOffTime: DateTime;
  requestUpdateDate: DateTime;
  vessel: VesselInfoType;
  origin: string;
  destination: string;
  bookingVia: string;
  estimatedTimeofBerth: DateTime;
  estimatedTimeofDeparture: DateTime;
  estimatedTimeofArrival: DateTime;
  blType: string;
  remarks?: string;
};

export interface SIPartiesProps {
  companyName: string;
  fullAddress: string;
  addressCountry: string;
  addressCityState: string;
  addressZipCode: string;
  addressStreet: string;
  eoriNumber: string;
  usccNumber: string;
  taxID: string;
  phone: string;
  fax: string;
  email: string;
}

export interface ConsigneeProps extends SIPartiesProps {
  isToOrder: boolean;
  contactPerson: string;
}

export interface NotifyPartyProps extends SIPartiesProps {
  alsoNotify: string;
}

export type SIEditPartiesType = {
  shipper: SIPartiesProps;
  consignee: ConsigneeProps;
  notifyParty: NotifyPartyProps;
  exportReference: string;
  forwardingAgentReference: string;
};

export type SIRouteBLType = {
  vesselVoyage: string;
  preCarriageBy: string;
  por: PlaceInformationType;
  pol: PlaceInformationType;
  pod: PlaceInformationType;
  del: PlaceInformationType;
  pointAndCountryOfOrigin: string;
  finalDestination: string;
  serviceTypeFrom: "cy" | "door";
  serviceTypeTo: "cy" | "door";
  blType: "none" | "originalBL" | "surrender" | "seaWaybill";
  freightTerms: "prepaid" | "collect";
  remarks: string;
  houseBLInvovled: "none" | "console" | "simple";
};

export type SIEditContactInformationType = {
  name: string;
  telNumber: string;
  fax: string;
  address: string;
  email: string;
  emailRecipient: string[];
  subscrition: {
    rollOver: boolean;
    vesselDeparture: boolean;
    vesselAdvanceDelay: boolean;
  };
};

export type SIEditMarkDescriptionType = {
  mark: string;
  description: string;
  hsCode: string;
  descriptionFile: File | null;
  customsCommodity: string;
};

export interface SIContainerInputProps {
  uuid: string;
  containerType: ContainerType;
  containerNumber: string;
  containerSize: "20" | "40" | "45" | "53";
  isSocContainer: boolean;
  firstSeal: {
    kind: SealKind;
    type: "merchanical" | "electronic";
    description: string;
  };
  secondSeal: {
    kind: SealKind;
    type: "merchanical" | "electronic";
    description: string;
  };
  packageType: string;
  packageQuantity: number;
  packageWeight: number;
  packageMeasurement: number;
  hasCargoManifest: boolean;
  cargoManifest: CargoManifestType[];
}

export type CargoManifestType = {
  uuid: string;
  packageType: string;
  packageQuantity: number;
  weight: number;
  measurement: number;
  cargoInformation: {
    wpmStatus: "Y" | "N" | "N/A";
    combo: string;
    description: string;
  };
  commodityCode: {
    htsCodeUS: string;
    hisCodeEUASIA: string;
    ncmCode: string;
  };
};

export type SIEditDataType = {
  parties: SIEditPartiesType;
  routeBL: SIRouteBLType;
  contactInformation: SIEditContactInformationType;
  markDescription: SIEditMarkDescriptionType;
  container: {
    dry: SIContainerInputProps[];
    reefer: SIContainerInputProps[];
    opentop: SIContainerInputProps[];
    tank: SIContainerInputProps[];
    flatrack: SIContainerInputProps[];
    bulk: SIContainerInputProps[];
  };
};
