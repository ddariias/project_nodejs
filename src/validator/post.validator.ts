import joi from "joi";

export class PostValidator {
  private static title = joi.string().min(2).max(50);

  public static bodyValidatePost = joi.object({
    title: this.title.required(),
  });
}
