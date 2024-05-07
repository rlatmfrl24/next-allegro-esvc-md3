export type MenuItemType = {
  id: string;
  name: string;
  link?: string;
  subMenu?: MenuItemType[];
};

export interface DashboardCardInfoType {
  id: string;
  title: string;
  type: "input" | "chart" | "etc";
  size: 1 | 2 | 4;
  tooltipText?: string | undefined;
}

export interface DashboardInputCardDataType extends DashboardCardInfoType {
  description?: string | undefined;
  placeholder?: string | undefined;
  buttonText: string;
}

export interface DashboardStatisticCardDataType extends DashboardCardInfoType {
  data: { key: string; value: number }[];
  palette?: { key: string; value: string }[];
  showChart?: boolean;
}
