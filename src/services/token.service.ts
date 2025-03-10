import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ITokenPayload, TokenPair } from "../interfaces/token.interface";

class TokenService {
  public createToken(payload: ITokenPayload): TokenPair {
    const accessToken = jwt.sign(payload, config.accessTokenSecret, {
      expiresIn: config.accessTokenExpiresIn as any,
    });
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpiresIn as any,
    });

    return { accessToken, refreshToken };
  }
}
export const tokenService = new TokenService();
