import { IUser, IUserRegister } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async register(user: IUserRegister): Promise<IUser> {
    return await User.create(user);
  }
  public async delete(userId): Promise<void> {
    await User.deleteOne(userId);
  }
  public async findById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async update(userId, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
}
export const userRepository = new UserRepository();
