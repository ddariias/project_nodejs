import { IUser, IUserRegister } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class UserService {
  public async register(dto: IUserRegister): Promise<IUser> {
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.register({ ...dto, password });
  }
}
export const userService = new UserService();
