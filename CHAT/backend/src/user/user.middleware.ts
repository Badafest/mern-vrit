import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { verifyAToken } from "../helpers";
import User from "./user";

export interface IExtendedReq extends Request {
  user_id?: mongoose.Types.ObjectId;
}

const UserMiddleware = {
  verifyAccessToken: async (req: Request, _: Response, next: NextFunction) => {
    const bearerToken = req.headers["authorization"];
    const splitted = bearerToken?.split(" ");
    if (!splitted || splitted[0] !== "Bearer" || splitted?.length !== 2) {
      throw new Error("Failed to verify token");
    }
    const token = splitted[1];
    const { name } = (await verifyAToken(token)) as { name: string };
    const user = await User.findOne({ name });
    if (!user || token !== user.access_token) {
      throw new Error("Failed to verify token");
    }
    (req as IExtendedReq).user_id = user._id;
    next();
  },
};

export default UserMiddleware;