import { atom } from "recoil";
import { cardList } from "./util";

export const currentPathState = atom<string[]>({
  key: "currentPath",
  default: [],
});

export const draggableState = atom<boolean>({
  key: "draggable",
  default: false,
});

export const dashboardCardState = atom<string[]>({
  key: "dashboardCard",
  default: cardList.map((card) => card.id),
});
