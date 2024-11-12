import { getUserInfo } from "zmp-sdk";
import IUserService from "../base/user.service";

class UserService implements IUserService {
  getUserInfo() {
    return getUserInfo({
      avatarType: "normal",
    });
  }
}

export default new UserService();
