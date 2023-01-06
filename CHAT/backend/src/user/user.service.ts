import mongoose from "mongoose";
import User, { IUser } from "./user";
import bcrypt from "bcryptjs";
import { generateAToken } from "../helpers";
import ENVIRONMENT from "../config/vars";

interface IUserService {
  createUser(name: string, password: string): Promise<{ user: string }>;
  logInUser(
    name: string,
    password: string
  ): Promise<{
    access_token: string;
    refresh_token: string;
  }>;
}

class UserService implements IUserService {
  private _model;

  constructor(_model: mongoose.Model<IUser>) {
    this._model = _model;
  }

  async logInUser(name: string, password: string) {
    const user = await this._model.findOne({ name });
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    console.log(password, user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Username or password is incorrect");
    }
    const access_token = await generateAToken(
      { name: user.name },
      ENVIRONMENT.JWT_EXPIRY_SHORT
    );
    const refresh_token = await generateAToken(
      { name: user.name },
      ENVIRONMENT.JWT_EXPIRY_LONG
    );
    user.access_token = access_token;
    user.refresh_token = refresh_token;
    user.save();
    return { access_token, refresh_token };
  }

  async createUser(name: string, password: string) {
    const newUser = await this._model.create({ name, password });
    return { user: newUser.name };
  }
}

export default new UserService(User);
