import {BodyOnSignIn, IUser, IUserRegister} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import {authRepository} from "../repositories/auth.repository";
import {ApiError} from "../errors/api.error";

class UserService {
  public async register(dto: IUserRegister): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.register({ ...dto, password });
  }
  public async delete(userId:string, user:BodyOnSignIn): Promise<void> {
    const userByEmail = await authRepository.findByEmail(user.email)
    if (!userByEmail) {
      throw new ApiError("Email invalid", 401)
    }
    const password = passwordService.compare(user.password, userByEmail.password)
    if (!password) {
      throw new ApiError("Incorrect email or password", 401)
    }
    if (userByEmail._id.toString() === userId.toString()) {
      await userRepository.delete(userByEmail._id);
      await authRepository.logoutAll({_userId: userId})
    }else {
      throw new ApiError("Invalid data or token", 401)
    }
  }
}
export const userService = new UserService();
