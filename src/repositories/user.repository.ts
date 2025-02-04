import { IQuery, IUser, IUserRegister } from "../interfaces/user.interface";
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
  public async update(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
  public async getAllUsers(query: IQuery): Promise<IUser[]> {
    const skip = query.limit * (query.page - 1);
    return await User.find().limit(query.limit).skip(skip);
  }
}
export const userRepository = new UserRepository();
