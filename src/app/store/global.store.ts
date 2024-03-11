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
    viewPort: null as HTMLElement | null,
  },
});

export { UserState, DrawerState, ScrollState };
