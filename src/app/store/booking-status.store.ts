import { atom } from "recoil";
import { BookingStatusTableProps } from "../util/typeDef";

export const CurrentBookingDataState = atom<
  BookingStatusTableProps | undefined
>({
  key: "currentBookingDataState",
  default: undefined,
});
