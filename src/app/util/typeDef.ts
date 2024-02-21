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

export type SearchConditionType = {
  origins: string[];
  destinations: string[];
  searchOn: "departure" | "arrival";
  startDate: DateTime;
  endDate: DateTime;
  directOnly: boolean;
};

export type PresetType = {
  id: string;
  name: string;
  useMailingService: boolean;
  createDateTime: DateTime;
  condition: SearchConditionType;
};

export type PlaceInformationType = {
  yardName: string;
  address: string;
  phoneNo: string;
  faxNo: string;
  customerNo: string;
  emailAddress: string;
};
