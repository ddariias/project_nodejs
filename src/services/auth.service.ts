import { ApiError } from "../errors/api.error";
import { TokenPair } from "../interfaces/token.interface";
import { BodyOnSignIn, IUser } from "../interfaces/user.interface";
import { authRepository } from "../repositories/auth.repository";
import { tokenRepository } from "../repositories/token.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signIn(
    body: BodyOnSignIn,
  ): Promise<{ user: IUser; tokens: TokenPair }> {
    const user = await authRepository.findByEmail(body.email);
    if (!user) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const passwordIsTrue = await passwordService.compare(
      body.password,
      user.password,
    );
    if (!passwordIsTrue) {
      throw new ApiError("Incorrect password", 401);
    }
    const tokens = await tokenService.createToken({
      userId: user._id,
      email: user.email,
    });

    await tokenRepository.createToken({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
  public async logout(param: string): Promise<void> {
    await authRepository.logout({ _id: param });
  }
}

export const authService = new AuthService();
