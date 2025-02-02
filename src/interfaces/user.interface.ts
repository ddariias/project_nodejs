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
