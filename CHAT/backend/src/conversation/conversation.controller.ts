import ConversationService from "./conversation.service";
import Controller from "../utilities/Controller";
import { IExtendedReq } from "../user/user.middleware";

const ConversationController = {
  create: Controller(
    async (req: IExtendedReq) => {
      const { user_id } = req;
      const { name } = req.body as { name: string };

      const conversation = await ConversationService.create(user_id, name);
      return { conversation };
    },
    "Conversation created successfully",
    "Failed to create conversation",
    400
  ),

  getAll: Controller(
    async (req: IExtendedReq) => {
      const { user_id } = req;
      return {
        conversations: await ConversationService.getAll(user_id),
      };
    },
    "Conversations fetched successfully",
    "Failed to fetch conversations",
    400
  ),
};

export default ConversationController;
