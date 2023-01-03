import express from "express";
import conversationRouter from "../conversation/conversation.routes";
import userRouter from "../user/user.routes";

const router = express.Router();

router.use("/conversation", conversationRouter);
router.use("/user", userRouter);

export default router;
