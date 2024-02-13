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
    open: true,
  },
});

export { UserState, DrawerState };
