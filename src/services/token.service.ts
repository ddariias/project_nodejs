import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenTypeEnum } from "../enum/token.type.enum";
import { ITokenPayload, TokenPair } from "../interfaces/token.interface";

class TokenService {
  public createToken(payload: ITokenPayload): TokenPair {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const accessToken = jwt.sign(payload, config.accessTokenSecret, {
      expiresIn: config.accessTokenExpiresIn,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  }
  public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
    let secret: string;
    switch (type) {
      case TokenTypeEnum.ACCESS:
        secret = config.accessTokenSecret;
        break;
      case TokenTypeEnum.REFRESH:
        secret = config.refreshTokenSecret;
        break;
    }

    return jwt.verify(token, secret) as ITokenPayload;
  }
}
export const tokenService = new TokenService();
