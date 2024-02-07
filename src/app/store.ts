import { atom } from "recoil";

const UserState = atom({
  key: "UserState",
  default: {
    isAuthenticated: false,
    name: "John Doe",
    email: "",
  },
});

export { UserState };
