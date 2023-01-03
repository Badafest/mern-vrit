import mongoose from "mongoose";
import User, { IUser } from "./user";

interface IUserService {
  createUser(name: string): Promise<IUser>;
}

class UserService implements IUserService {
  private _model;

  constructor(_model: mongoose.Model<IUser>) {
    this._model = _model;
  }

  async createUser(name: string) {
    const newUser = await this._model.create({ name });
    return newUser;
  }
}

export default new UserService(User);
