import { TokenPair } from "./token.interface";

export interface IUser {
  _id: string;
  name?: string;
  email: string;
  password: string;
  age?: number;
  createAt: Date;
  updateAt: Date;
}

export type IUserRegister = Pick<IUser, "name" | "email" | "password" | "age">;
export type BodyOnSignIn = Pick<IUser, "email" | "password">;

export interface IResponsePayload {
  user: IUser;
  tokens: TokenPair;
}
