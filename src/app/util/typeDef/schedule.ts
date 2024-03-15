import { DateTime } from "luxon";

export type PlaceInformationType = {
  code: string;
  yardName: string;
  address: string;
  phoneNo: string;
  faxNo: string;
  customerNo: string;
  emailAddress: string;
};

export type VesselInfoType = {
  vesselName: string;
  vesselCode: string;
  serviceLane: string;
  consortiumVoyage: string;

  owner: string;
  ownerName: string;
  classNumber: string;
  officialNumber: string;
  IMONumber: string;
  builtOn: string;
  grossWeight: number;
  netWeight: number;
  age: number;
  callSign: string;
  portOfRegistry: string;
  flag: string;
};

export interface BaseScheduleType {
  origin: PlaceInformationType;
  destination: PlaceInformationType;
  departureDate: DateTime;
  berthingDate: DateTime;
  arrivalDate: DateTime;
  vesselInfo: VesselInfoType;
}

export interface PtPScheduleType extends BaseScheduleType {
  transitTime: number;
  serviceLane: string;
}

export interface VesselScheduleType extends BaseScheduleType {
  port: string;
  terminal: PlaceInformationType;
}

export interface PortScheduleType extends BaseScheduleType {
  terminal: PlaceInformationType;
  vesselSchedules: VesselScheduleType[];
}

export type LongRangeScheduleType = {
  vesselInfo: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
  remarkInfo?: string;
  longRangeDates: LongRangeDateType[];
};

export type PtPSearchConditionType = {
  origins: string[];
  destinations: string[];
  searchOn: "departure" | "arrival";
  startDate: DateTime;
  endDate: DateTime;
};

export type PortScheduleSearchConditionType = {
  portName: string;
  startDate: DateTime;
  endDate: DateTime;
};

export type LongRangeSearchConditionType = {
  continentFrom: string;
  continentTo: string;
};

export type LongRangePortType = {
  name: string;
  direction: "north" | "south" | "east" | "west";
};

export type LongRangeDateType = {
  port: LongRangePortType;
  arrival: DateTime;
  departure: DateTime | undefined;
};

export type CutOffDataType = {
  documentation: DateTime;
  EDI: DateTime;
  cargo: DateTime;
};

export type FavoriteRouteType = {
  id: string;
  name: string;
  origin: string[];
  destination: string[];
};
