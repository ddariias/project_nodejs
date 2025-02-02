import { TokenPair } from "../interfaces/token.interface";
import { IUser, IUserRegister } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class UserService {
  public async register(
    dto: IUserRegister,
  ): Promise<{ user: IUser; tokens: TokenPair }> {
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.register({ ...dto, password });
    const tokens = await tokenService.createToken({
      userId: user._id,
      email: user.email,
    });
    await tokenRepository.createToken({ ...tokens, _userId: user._id });

    return { user, tokens };
  }
}
export const userService = new UserService();
