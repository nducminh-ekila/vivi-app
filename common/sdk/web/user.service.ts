import IUserService from "../base/user.service";
import User from "../models/user";

class UserService implements IUserService {
  getUserInfo(): Promise<User> {
    return Promise.resolve<User>({
      userInfo: {
        id: '3368637342326461234',
        name: 'John Smith',
        avatar: 'https://h5.zdn.vn/static/images/avatar.png'
      }
    })
  }
}

export default new UserService();
