import User from '../models/user';

export default interface IUserService {
  getUserInfo(): Promise<User>;
}
