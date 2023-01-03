import express from "express";
import ConversationController from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.post("/", ConversationController.create);
conversationRouter.get("/", ConversationController.getAll);

export default conversationRouter;
