import { atom } from "recoil";

const UserState = atom({
  key: "UserState",
  default: {
    isAuthenticated: false,
    name: "",
    email: "",
  },
});

const DrawerState = atom({
  key: "DrawerState",
  default: {
    open: false,
  },
});

const ScrollState = atom({
  key: "ScrollState",
  default: {
    xPosition: 0,
    yPosition: 0,
    instance: null as any,
  },
});

export { UserState, DrawerState, ScrollState };
