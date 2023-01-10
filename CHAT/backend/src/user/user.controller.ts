import { Request } from "express";
import Controller from "../utilities/Controller";
import UserService from "./user.service";

const UserController = {
  create: Controller(
    async (req: Request) => {
      const { name, password } = req.body as {
        name: string;
        password: string;
      };
      const user = await UserService.createUser(name, password);
      return { user };
    },
    "User created successfully",
    "Failed to create user",
    400
  ),

  login: Controller(
    async (req: Request) => {
      const { name, password } = req.body as {
        name: string;
        password: string;
      };
      const { user } = await UserService.logInUser(name, password);
      return {
        name: user.name,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      };
    },
    "User logged in successfully",
    "Failed to login user",
    400
  ),

  refresh: Controller(
    async (req: Request) => {
      const { refresh_token } = req.body as { refresh_token: string };
      const { user } = await UserService.refreshTokens(refresh_token);
      return {
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      };
    },
    "Tokens refreshed successfully",
    "Failed to refresh tokens",
    400
  ),
};

export default UserController;
