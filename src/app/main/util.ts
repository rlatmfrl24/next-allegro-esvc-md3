import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { meunItems } from "./constants";

export function getRoutePath(paths: string[]) {
  let itemTree = meunItems;
  let pathList = Object.assign([], paths).slice(2);
  const routes: string[] = [];

  while (pathList.length > 0) {
    let currentPath = pathList.shift();
    let currentItem = itemTree.find((item) => item.path === currentPath);
    if (currentItem) {
      routes.push(currentItem.name);
      itemTree = currentItem.children;
    }
  }

  return routes;
}
