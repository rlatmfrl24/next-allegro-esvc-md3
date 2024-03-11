import { atom } from "recoil";
import { FavoriteRouteType } from "../util/typeDef/schedule";

const FavoriteRouteListState = atom<FavoriteRouteType[]>({
  key: "FavoriteRouteListState",
  default: [],
});

export { FavoriteRouteListState };
