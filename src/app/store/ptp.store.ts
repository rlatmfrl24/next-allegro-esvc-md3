import { atom } from "recoil";
import { PresetType } from "../util/typeDef";

const PresetListState = atom<PresetType[]>({
  key: "PresetListState",
  default: [],
});

export { PresetListState };
