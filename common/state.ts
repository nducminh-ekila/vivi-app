import { atom } from "recoil";
import User from "./sdk/models/user";

export const userState = atom<User>({
  key: "user",
  default: {
    userInfo: {
      id: '',
      name: 'User Name',
      avatar: '',
    }
  },
})

export const displayNameState = atom({
  key: "displayName",
  default: "",
});
