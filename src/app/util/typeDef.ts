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

export type ListItemType = {
  origin: string;
  departure: DateTime;
  destination: string;
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
  directOnly: boolean;
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
  terminal: string;
  arrivalDate: DateTime;
  berthingDate: DateTime;
  departureDate: DateTime;
};

export type PortScheduleSearchConditionType = {
  portName: string;
  startDate: DateTime;
  endDate: DateTime;
  isOceanVesselOnly: boolean;
};

export type PortScheduleType = {
  vessel: string;
  terminal: string;
  serviceLane: string;
  arrivalDate: DateTime;
  berthingDate: DateTime;
  departureDate: DateTime;
};
