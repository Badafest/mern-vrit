import express from "express";
import MessageController from "./message.controller";

const router = express.Router();

router.post("/", MessageController.create);
router.get("/:conversation_id", MessageController.fetchByConversation);

export default router;
