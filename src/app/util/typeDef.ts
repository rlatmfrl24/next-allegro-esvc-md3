export type MenuItemType = {
  name: string;
  children: MenuItemType[];
  isLeaf?: boolean;
};
