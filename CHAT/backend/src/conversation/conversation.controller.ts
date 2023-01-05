import ConversationService from "./conversation.service";
import { Request } from "express";
import Controller from "../utilities/Controller";

const ConversationController = {
  create: Controller(
    async (req: Request) => {
      const { name, members } = req.body as {
        name: string;
        members: string[];
      };

      const conversation = await ConversationService.create(name, members);
      return { conversation };
    },
    "Conversation created successfully",
    "Failed to create conversation",
    400
  ),

  getAll: Controller(
    async (_: Request) => ({
      conversations: await ConversationService.getAll(),
    }),
    "Conversations fetched successfully",
    "Failed to fetch conversations",
    400
  ),
};

export default ConversationController;
