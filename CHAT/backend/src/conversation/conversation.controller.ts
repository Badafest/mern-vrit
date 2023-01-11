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
      console.log(user_id);
      return {
        conversations: await ConversationService.getAll(user_id),
      };
    },
    "Conversations fetched successfully",
    "Failed to fetch conversations",
    400
  ),

  requestAddMember: Controller(
    async (req: IExtendedReq) => {
      const { user_id } = req;
      const { conversation_name } = req.body as { conversation_name: string };
      await ConversationService.requestAddMember(user_id, conversation_name);
      return {};
    },
    "Request sent successfully",
    "Failed to send request",
    400
  ),

  addMember: Controller(
    async (req: IExtendedReq) => {
      const { user_id } = req;
      const { member_id, conversation_name } = req.body as {
        member_id: string;
        conversation_name: string;
      };
      await ConversationService.addMember(
        user_id,
        conversation_name,
        member_id
      );
      return {};
    },
    "Member added successfully",
    "Failed to add member"
  ),
};

export default ConversationController;
