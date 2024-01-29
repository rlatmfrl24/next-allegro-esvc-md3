import { atom } from "recoil";

export const currentPathState = atom<string[]>({
  key: "currentPath",
  default: [],
});

export const dashboardState = atom({
  key: "dashboardState",
  default: {},
});
