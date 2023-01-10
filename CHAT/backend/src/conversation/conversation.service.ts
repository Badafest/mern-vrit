import mongoose from "mongoose";
import Conversation, { IConversation } from "./conversation";

type TUserID = mongoose.Types.ObjectId | undefined;

interface IConversationService {
  create(user_id: TUserID, name: string): Promise<IConversation>;
  getAll(user_id: TUserID): Promise<IConversation[]>;
  requestAddMember(user_id: TUserID, conversation_name: string): Promise<void>;
  addMember(
    user_id: TUserID,
    conversation_name: string,
    member_id: string
  ): Promise<void>;
}

class ConversationService implements IConversationService {
  private _model;

  constructor(_model: mongoose.Model<IConversation>) {
    this._model = _model;
  }

  async create(user_id: TUserID, name: string) {
    const newConversation = this._model.create({
      admin: user_id,
      name,
      members: [user_id],
    });
    return newConversation;
  }

  async getAll(user_id: TUserID) {
    const allConversations = this._model
      .find({ members: user_id })
      .populate("members", "name");
    return allConversations;
  }

  async getById(user_id: TUserID) {
    const conversation = this._model.findById(user_id);
    return conversation;
  }

  async requestAddMember(user_id: TUserID, conversation_name: string) {
    const conversation = await this._model.findOne({ name: conversation_name });
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    if (user_id && conversation.members.includes(user_id)) {
      throw new Error("Already a member");
    }
    if (user_id && conversation.requests.includes(user_id)) {
      throw new Error("Request already exists");
    }
    user_id && conversation.requests.push(user_id);
    await conversation.save();
  }

  async addMember(
    user_id: TUserID,
    conversation_name: string,
    member_id: string
  ) {
    if (!member_id) {
      throw new Error("Member id is required");
    }

    const conversation = await this._model.findOne({ name: conversation_name });
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    if (conversation.admin.toString !== user_id?.toString) {
      throw new Error("Not authorized");
    }

    const memberId = new mongoose.Types.ObjectId(member_id);

    if (memberId && conversation.members.includes(memberId)) {
      throw new Error("Already a member");
    }

    if (!conversation.requests.includes(memberId)) {
      throw new Error("Member has not requested yet");
    }

    await conversation.updateOne({
      $pull: {
        requests: memberId,
      },
    });

    conversation.members.push(memberId);
    await conversation.save();
  }
}

export default new ConversationService(Conversation);
