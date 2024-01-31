export type MenuItemType = {
  name: string;
  path: string;
  children: MenuItemType[];
  isLeaf?: boolean;
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
