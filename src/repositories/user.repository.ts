import { IUser, IUserRegister } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async register(user: IUserRegister): Promise<IUser> {
    return await User.create(user);
  }
}
export const userRepository = new UserRepository();
