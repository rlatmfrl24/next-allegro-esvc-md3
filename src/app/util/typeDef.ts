export type MenuItemType = {
  name: string;
  children: MenuItemType[];
  isLeaf?: boolean;
};

export type DashboardCardInfoType = {
  id: string;
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
