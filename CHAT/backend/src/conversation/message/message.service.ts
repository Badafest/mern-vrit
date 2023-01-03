import mongoose from "mongoose";
import Message, { IMessage } from "./message";

interface IMessageService {
  create(
    type: "text" | "image",
    from_id: string,
    message: string,
    conversation_id: string
  ): Promise<IMessage>;
  fetchByConversation(conversation_id: string): Promise<IMessage[]>;
}

class MessageService implements IMessageService {
  private _model;
  constructor(_model: mongoose.Model<IMessage>) {
    this._model = _model;
  }

  async fetchByConversation(conversation_id: string) {
    const messages = await this._model.find({ conversation_id });
    return messages;
  }

  async create(
    type: "text" | "image",
    from_id: string,
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
