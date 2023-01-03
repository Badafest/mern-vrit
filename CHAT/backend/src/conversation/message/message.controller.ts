import { Request, Response } from "express";
import MessageService from "./message.service";

const MessageController = {
  create: async (req: Request, res: Response) => {
    try {
      const { message, type, from_id, conversation_id } = req.body;
      const newMessage = await MessageService.create(
        type,
        from_id,
        message,
        conversation_id
      );
      return res.status(200).json({
        message: "Message created successfully",
        newMessage,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create message",
        error,
      });
    }
  },

  fetchByConversation: async (req: Request, res: Response) => {
    try {
      const { conversation_id } = req.params;
      const messages = await MessageService.fetchByConversation(
        conversation_id
      );
      return res.status(200).json({
        message: "Messages fetched successfully",
        messages,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to fetch messages",
        error,
      });
    }
  },
};

export default MessageController;
