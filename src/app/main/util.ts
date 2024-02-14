import { menuItems } from "../util/constants";

export function getRoutePath(paths: string[]) {
  let itemTree = menuItems;
  let pathList = Object.assign([], paths).slice(2);
  const routes: string[] = [];

  while (pathList.length > 0) {
    let currentPath = pathList.shift();
    let currentItem = itemTree.find((item) => item.link === currentPath);
    if (currentItem) {
      routes.push(currentItem.name);
      itemTree = currentItem.subMenu;
    }
  }

  return routes;
}
