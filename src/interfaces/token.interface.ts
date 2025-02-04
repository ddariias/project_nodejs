export interface IToken {
  _id: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPayload {
  userId: string;
  email: string;
}
export interface ITokenPayloadId {
  userId: string;
}

export type TokenPair = Pick<IToken, "accessToken" | "refreshToken">;
export type TokenPairWithId = Pick<
  IToken,
  "accessToken" | "refreshToken" | "_userId"
>;
