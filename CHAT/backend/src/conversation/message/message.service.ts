import mongoose from "mongoose";
import Conversation from "../conversation";
import Message, { IMessage } from "./message";

interface IMessageService {
  create(
    type: "text" | "image",
    from_id: mongoose.Types.ObjectId,
    message: string,
    conversation_id: string
  ): Promise<IMessage>;
  fetchByConversation(
    conversation_id: string,
    user_id: mongoose.Types.ObjectId | undefined
  ): Promise<IMessage[]>;
}

class MessageService implements IMessageService {
  private _model;
  constructor(_model: mongoose.Model<IMessage>) {
    this._model = _model;
  }

  async fetchByConversation(
    conversation_id: string,
    user_id: mongoose.Types.ObjectId | undefined
  ) {
    const conversation = await Conversation.findById(conversation_id);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    if (!user_id || !conversation.members.includes(user_id)) {
      throw new Error("User is not a member");
    }
    const messages = await this._model.find({ conversation_id });
    return messages;
  }

  async create(
    type: "text" | "image",
    from_id: mongoose.Types.ObjectId | undefined,
    message: string,
    conversation_id: string
  ) {
    const newMessage = await this._model.create({
      type,
      message,
      from_id,
      conversation_id,
    });
    return newMessage;
  }
}

export default new MessageService(Message);
