import express from "express";
import conversationRouter from "../conversation/conversation.routes";
import userRouter from "../user/user.routes";
import messageRouter from "../conversation/message/message.routes";

const router = express.Router();

router.use("/conversation", conversationRouter);
router.use("/conversation/message", messageRouter);
router.use("/user", userRouter);

export default router;
