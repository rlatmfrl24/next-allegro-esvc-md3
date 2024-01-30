import { atom } from "recoil";

export const currentPathState = atom<string[]>({
  key: "currentPath",
  default: [],
});

export const draggableState = atom<boolean>({
  key: "draggable",
  default: false,
});
