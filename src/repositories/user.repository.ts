import { FilterQuery } from "mongoose";
import * as mongoose from "mongoose";

import { ApiError } from "../errors/api.error";
import {
  IQuery,
  IQuerySearch,
  IUser,
  IUserRegister,
} from "../interfaces/user.interface";
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
  public async searchByParams(query: IQuerySearch): Promise<IUser> {
    const searchObj: FilterQuery<IUser> = {};
    if (searchObj) {
      if (mongoose.Types.ObjectId.isValid(query.search)) {
        searchObj._id = new mongoose.Types.ObjectId(query.search);
      } else {
        searchObj.email = { $regex: query.search, $options: "i" };
      }
    } else {
      throw new ApiError("Search parameter is missing", 400);
    }
    const user = await User.findOne(searchObj);
    if (!user) {
      throw new ApiError("User not found", 401);
    }
    return user;
  }
}
export const userRepository = new UserRepository();
