import { Request } from "express";
import Controller from "../../utilities/Controller";
import MessageService from "./message.service";

const MessageController = {
  create: Controller(
    async (req: Request) => {
      const { message, type, from_id, conversation_id } = req.body;
      const newMessage = await MessageService.create(
        type,
        from_id,
        message,
        conversation_id
      );
      return { newMessage };
    },
    "Message created successfully",
    "Failed to create message",
    400
  ),

  fetchByConversation: Controller(
    async (req: Request) => {
      const { conversation_id } = req.params;
      const messages = await MessageService.fetchByConversation(
        conversation_id
      );
      return {
        messages,
      };
    },
    "Messages fetched successfully",
    "Failed to fetch messages",
    400
  ),
};

export default MessageController;
