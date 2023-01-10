import mongoose from "mongoose";
import User, { IUser } from "./user";
import bcrypt from "bcryptjs";
import { generateAToken, verifyAToken } from "../helpers";
import ENVIRONMENT from "../config/vars";

interface IUserService {
  createUser(name: string, password: string): Promise<{ name: string }>;
  getUserById(id: mongoose.Types.ObjectId | undefined): Promise<{
    user: IUser;
  }>;
  logInUser(
    name: string,
    password: string
  ): Promise<{
    user: IUser;
  }>;
  refreshTokens(token: string): Promise<{
    user: IUser;
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
    await user.save();
    return { user };
  }

  async refreshTokens(token: string) {
    const { name } = (await verifyAToken(token)) as { name: string };
    const user = await User.findOne({ name });
    if (!user || token !== user.refresh_token) {
      throw new Error("Failed to verify token");
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
    await user.save();
    return { user };
  }

  async createUser(name: string, password: string) {
    const newUser = await this._model.create({ name, password });
    return { name: newUser.name };
  }

  async getUserById(id: mongoose.Types.ObjectId | undefined) {
    const user = await this._model.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return { user };
  }
}

export default new UserService(User);
