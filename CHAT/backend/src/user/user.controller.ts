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
      const { access_token, refresh_token } = await UserService.logInUser(
        name,
        password
      );
      return {
        name,
        access_token,
        refresh_token,
      };
    },
    "User logged in successfully",
    "Failed to login user",
    400
  ),
};

export default UserController;
