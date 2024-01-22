import { atom } from "recoil";

export const isSigningState = atom({
  key: "isSigning",
  default: false,
});
