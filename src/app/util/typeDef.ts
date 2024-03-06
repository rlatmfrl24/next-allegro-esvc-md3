import { DateTime } from "luxon";

export type MenuItemType = {
  id: string;
  name: string;
  link?: string;
  subMenu?: MenuItemType[];
};

export type DashboardCardInfoType = {
  id: string;
  title: string;
  type: "input" | "statistic" | "chart" | "etc";
  size: 1 | 2;
};

export type DashboardInputCardDataType = {
  title: string;
  tooltipText?: string | undefined;
  description?: string | undefined;
  placeholder?: string | undefined;
  buttonText: string;
};

export type DashboardStatisticCardDataType = {
  title: string;
  tooltipText?: string | undefined;
  data: { key: string; value: number }[];
  showChart?: boolean;
};

export type PtPScheduleType = {
  origin: PlaceInformationType;
  destination: PlaceInformationType;
  departure: DateTime;
  arrival: DateTime;
  vesselName: string;
  transitTime: number;
  serviceLane: string;
};

export type PtPSearchConditionType = {
  origins: string[];
  destinations: string[];
  searchOn: "departure" | "arrival";
  startDate: DateTime;
  endDate: DateTime;
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

export type PlaceInformationType = {
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

export type VesselScheduleType = {
  port: string;
  terminal: PlaceInformationType;
  arrivalDate: DateTime;
  berthingDate: DateTime;
  departureDate: DateTime;
};

export type PortScheduleSearchConditionType = {
  portName: string;
  startDate: DateTime;
  endDate: DateTime;
};

export type PortScheduleType = {
  vesselInfo: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
  terminalInfo: PlaceInformationType;
  arrivalDate: DateTime;
  berthingDate: DateTime;
  departureDate: DateTime;
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

export type LongRangeScheduleType = {
  vesselInfo: VesselInfoType;
  vesselSchedules: VesselScheduleType[];
  remarkInfo: string;
  longRangeDates: LongRangeDateType[];
};

export type CommodityType = {
  code: string;
  description: string;
};

export interface PartyInterface {
  name: string;
  address: string;
}
export interface BookingRequestorInterface extends PartyInterface {
  email: string[];
  telNo: string;
  fax: string;
}

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
