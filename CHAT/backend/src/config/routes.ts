import express, { Request, Response } from "express";
import conversationRouter from "../conversation/conversation.routes";
import userRouter from "../user/user.routes";
import messageRouter from "../conversation/message/message.routes";
import UserMiddleware from "../user/user.middleware";
import { WebSocket } from "ws";

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

// router.get("/socket", async function (req: Request, res: Response) {
//   const { user } = req.query;
//   const ws = new WebSocket("ws://localhost:8000?user_id=" + user);
//   return res.status(400).json({
//     ws,
//   });
// });

export default router;
