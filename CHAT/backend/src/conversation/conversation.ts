import mongoose, { Schema } from "mongoose";
import User from "../user/user";

export interface IConversation {
  name: string;
  members: mongoose.Types.ObjectId[];
}

const ConversationSchema = new mongoose.Schema<IConversation>({
  name: {
    type: String,
    required: [true, "Conversation name is required"],
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: User,
  },
});

const Conversation = mongoose.model("conversation", ConversationSchema);

export default Conversation;
