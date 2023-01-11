import express from "express";
import conversationRouter from "../conversation/conversation.routes";
import userRouter from "../user/user.routes";
import messageRouter from "../conversation/message/message.routes";
import UserMiddleware from "../user/user.middleware";

const router = express.Router();

router.use(
  "/conversation",
  UserMiddleware.verifyAccessToken,
  conversationRouter
);
router.use(
  "/conversation/message",
  UserMiddleware.verifyAccessToken,
  messageRouter
);
router.use("/user", userRouter);

export default router;
