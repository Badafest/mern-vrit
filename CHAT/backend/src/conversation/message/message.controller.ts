import { Request } from "express";
import { IExtendedReq } from "../../user/user.middleware";
import Controller from "../../utilities/Controller";
import socketService from "../../utilities/SocketService";
import conversationService from "../conversation.service";
import MessageService from "./message.service";

const MessageController = {
  create: Controller(
    async (req: IExtendedReq) => {
      const { user_id } = req;
      const { message, type, conversation_id } = req.body;
      const newMessage = await MessageService.create(
        type,
        user_id,
        message,
        conversation_id
      );
      const conversation = await conversationService.getById(
        newMessage.conversation_id
      );
      const members = conversation?.members.filter(
        (member) => member.toString() !== user_id?.toString()
      );
      if (members?.length) {
        await Promise.all(
          members.map(async (member) => {
            const client = await socketService.getClient(member.toString());
            client && client.socket.send(JSON.stringify(newMessage));
          })
        );
      }
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
