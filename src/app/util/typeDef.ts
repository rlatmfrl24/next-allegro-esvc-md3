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

export type ListItemProps = {
  origin: string;
  departure: DateTime;
  destination: string;
  arrival: DateTime;
  vesselName: string;
  transitTime: number;
  serviceLane: string;
};

export type SearchConditionProps = {
  origins: string[];
  destinations: string[];
  searchOn: "departure" | "arrival";
  startDate: DateTime;
  endDate: DateTime;
  directOnly: boolean;
};
