import { atom } from "recoil";
import { BookingStatusTableProps } from "../util/typeDef/boooking";

export const CurrentBookingDataState = atom<
  BookingStatusTableProps | undefined
>({
  key: "currentBookingDataState",
  default: undefined,
});
