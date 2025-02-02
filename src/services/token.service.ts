import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ITokenPayload, TokenPair } from "../interfaces/token.interface";

class TokenService {
  public createToken(payload: ITokenPayload): TokenPair {
    console.log(config.accessTokenExpiresIn);
    const accessToken = jwt.sign(payload, config.accessTokenSecret);
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret);

    return { accessToken, refreshToken };
  }
}
export const tokenService = new TokenService();
