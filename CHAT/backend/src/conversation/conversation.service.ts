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
    member_id: TUserID
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
      .populate("members")
      .populate("members.name");
    return allConversations;
  }

  async requestAddMember(user_id: TUserID, conversation_name: string) {
    const conversation = await this._model.findOne({ name: conversation_name });
    if (!conversation) {
      throw new Error("Conversation not found");
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
    member_id: TUserID
  ) {
    const conversation = await this._model.findOne({ name: conversation_name });
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    if (conversation.admin !== user_id) {
      throw new Error("Not authorized");
    }

    if (member_id && !conversation.requests.includes(member_id)) {
      throw new Error("Member has not requested yet");
    }

    conversation.requests = conversation.requests.filter(
      (item) => item !== member_id
    );
    member_id && conversation.members.push(member_id);
    await conversation.save();
  }
}

export default new ConversationService(Conversation);
