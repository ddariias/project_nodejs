import { IUser } from "../interfaces/user.interface";

class UserPresenter {
  public responseUser(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      age: entity.age,
      createAt: entity.createAt,
      updateAt: entity.updateAt,
    };
  }
  public shotResponseUser(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      createAt: entity.createAt,
    };
  }
}
export const userPresenter = new UserPresenter();
