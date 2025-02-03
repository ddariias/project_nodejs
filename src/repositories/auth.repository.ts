import { IToken } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class AuthRepository {
  public async findByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }
  public async logout(param: Partial<IToken>): Promise<void> {
    await Token.deleteOne(param);
  }
  public async logoutAll(param: Partial<IToken>): Promise<void> {
    await Token.deleteMany(param);
  }
}

export const authRepository = new AuthRepository();
