import { IToken, TokenPairWithId } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async createToken(tokens: TokenPairWithId): Promise<IToken> {
    return await Token.create(tokens);
  }
}
export const tokenRepository = new TokenRepository();
