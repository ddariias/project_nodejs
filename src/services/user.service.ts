import { ApiError } from "../errors/api.error";
import {
  BodyOnSignIn,
  IResponsePayload,
  IUser,
  IUserRegister,
} from "../interfaces/user.interface";
import { authRepository } from "../repositories/auth.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class UserService {
  public async register(dto: IUserRegister): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.register({ ...dto, password });
  }
  public async delete(userId: string, user: BodyOnSignIn): Promise<void> {
    const userByEmail = await authRepository.findByEmail(user.email);
    if (!userByEmail) {
      throw new ApiError("Email invalid", 401);
    }
    const password = passwordService.compare(
      user.password,
      userByEmail.password,
    );
    if (!password) {
      throw new ApiError("Incorrect email or password", 401);
    }
    if (userByEmail._id.toString() === userId.toString()) {
      await userRepository.delete(userByEmail._id);
      await authRepository.logoutAll({ _userId: userId });
    } else {
      throw new ApiError("Invalid data or token", 401);
    }
  }
  public async update(
    userId: any,
    dto: Partial<IUser>,
  ): Promise<IResponsePayload> {
    const userById = await userRepository.findById(userId);
    if (!userById) {
      throw new ApiError("User not found", 401);
    }
    await authRepository.logoutAll({ _userId: userId });
    const user = await userRepository.update(userById, { ...dto });
    const tokens = await tokenService.createToken({
      userId: userId,
      email: user.email,
    });
    tokenRepository.createToken({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
}
export const userService = new UserService();
