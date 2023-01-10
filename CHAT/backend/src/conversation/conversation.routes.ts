import express from "express";
import ConversationController from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.post("/", ConversationController.create);

conversationRouter.get("/", ConversationController.getAll);

conversationRouter.post("/request", ConversationController.requestAddMember);

conversationRouter.post("/add", ConversationController.addMember);

export default conversationRouter;
