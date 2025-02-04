import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static name = joi.string().min(3).max(30);
  private static email = joi.string().regex(regexConstant.EMAIL);
  private static age = joi.number().min(18).max(99);
  private static password = joi.string().regex(regexConstant.PASSWORD);

  public static register = joi.object({
    name: this.name,
    email: this.email.required(),
    password: this.password.required(),
    age: this.age,
  });
  public static signIn = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static queryValidator = joi.object({
    limit: joi.number().min(1).max(15).default(5),
    page: joi.number().min(1).default(1),
  });
  public static querySearchValidator = joi.object({
    search: joi.string(),
  });
}
