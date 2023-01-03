import ConversationService from "./conversation.service";
import { Request, Response } from "express";

const ConversationController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, members } = req.body as {
        name: string;
        members: string[];
      };

      const conversation = await ConversationService.create(name, members);
      return res.status(200).json({
        message: "Conversation created successfully",
        conversation,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create conversation",
        error,
      });
    }
  },

  getAll: async (_: Request, res: Response) => {
    try {
      const conversations = await ConversationService.getAll();
      return res.status(200).json({
        message: "Conversations fetched successfully",
        conversations,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to get all conversations",
        error,
      });
    }
  },
};

export default ConversationController;
