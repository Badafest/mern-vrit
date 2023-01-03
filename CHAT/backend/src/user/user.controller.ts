import { Request, Response } from "express";
import UserService from "./user.service";

const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body as { name: string };
      const user = await UserService.createUser(name);
      return res.status(200).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create user",
        error,
      });
    }
  },
};

export default UserController;
