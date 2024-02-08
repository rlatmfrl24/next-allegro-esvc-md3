import { atom } from "recoil";

const UserState = atom({
  key: "UserState",
  default: {
    isAuthenticated: false,
    name: "",
    email: "",
  },
});

export { UserState };
