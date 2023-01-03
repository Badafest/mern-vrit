import mongoose from "mongoose";
import Conversation, { IConversation } from "./conversation";

interface IConversationService {
  create(name: string, members: string[]): Promise<IConversation>;
  getAll(): Promise<IConversation[]>;
}

class ConversationService implements IConversationService {
  private _model;

  constructor(_model: mongoose.Model<IConversation>) {
    this._model = _model;
  }

  async create(name: string, members: string[]) {
    const newConversation = this._model.create({
      name,
      members,
    });
    return newConversation;
  }

  async getAll() {
    const allConversations = this._model.find({}).populate("members");
    return allConversations;
  }
}

export default new ConversationService(Conversation);
