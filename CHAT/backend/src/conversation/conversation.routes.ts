import express from "express";
import UserMiddleware from "../user/user.middleware";
import ConversationController from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.post(
  "/",
  UserMiddleware.verifyAccessToken,
  ConversationController.create
);

conversationRouter.get(
  "/",
  UserMiddleware.verifyAccessToken,
  ConversationController.getAll
);

export default conversationRouter;
