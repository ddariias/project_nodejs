import { FilterQuery, RootFilterQuery, SortOrder } from "mongoose";

import { regexConstant } from "../constants/regex.constant";
import { OrderByEnum } from "../enum/order.by.enum";
import { ApiError } from "../errors/api.error";
import {
  IQuery,
  IQueryFilterDto,
  IQuerySearch,
  IUser,
  IUserGmail,
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
  public async getAllUsers(
    query: IQuery,
  ): Promise<{ data: IUser[]; total: number }> {
    const skip = query.limit * (query.page - 1);

    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case OrderByEnum.AGE:
        sortObj.age = query.order;
        break;
      case OrderByEnum.CREATED_AT:
        sortObj.createdAt = query.order;
        break;
    }

    const [data, total] = await Promise.all([
      User.find().limit(query.limit).skip(skip).sort(sortObj),
      User.countDocuments(),
    ]);
    return { data, total };
  }
  // public async searchByParams(query: IQuerySearch): Promise<IUser> {
  //   const searchObj: FilterQuery<IUser> = {};
  //   if (searchObj) {
  //     if (mongoose.Types.ObjectId.isValid(query.search)) {
  //       searchObj._id = new mongoose.Types.ObjectId(query.search);
  //     } else {
  //       searchObj.email = { $regex: query.search, $options: "i" };
  //     }
  //   } else {
  //     throw new ApiError("Search parameter is missing", 400);
  //   }
  //   const user = await User.findOne(searchObj);
  //   if (!user) {
  //     throw new ApiError("User not found", 401);
  //   }
  //   return user;
  // }
  public async searchById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async searchByEmail(query: IQuerySearch): Promise<IUser> {
    const searchObj: RootFilterQuery<IUserGmail> = {};
    if (searchObj) {
      searchObj.email = query.search;
    } else {
      throw new ApiError("No query parameters", 400);
    }
    const user = await User.findOne(searchObj);
    if (!user) {
      throw new ApiError("User not found", 401);
    }
    return user;
  }
  public async filter(query: IQueryFilterDto): Promise<IUser[]> {
    const filterObj: FilterQuery<IUser> = {};
    if (!query) {
      throw new ApiError("Query is empty", 400);
    }
    if (query.name) {
      filterObj.name = { $regex: query.name, $options: "i" };
    }
    if (query.age) {
      filterObj.age = query.age;
    }

    if (query.createdAt) {
      if (!regexConstant.CREATED_DATE.test(query.createdAt.toString())) {
      } else {
        const start = new Date(query.createdAt);
        start.setHours(0, 0, 0, 0);
        const end = new Date(query.createdAt);
        end.setHours(23, 59, 59, 999);
        filterObj.createdAt = { $gte: start, $lte: end };
      }
    }
    if (query.email) {
      filterObj.email = { $regex: query.email, $options: "i" };
    }
    return await User.find(filterObj);
  }
}
export const userRepository = new UserRepository();
