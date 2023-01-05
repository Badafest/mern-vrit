import mongoose, { Schema } from "mongoose";
import User from "../user/user";

export interface IConversation {
  name: string;
  members: mongoose.Types.ObjectId[];
}

const ConversationSchema = new mongoose.Schema<IConversation>(
  {
    name: {
      type: String,
      required: [true, "Conversation name is required"],
      unique: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: User,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", ConversationSchema);

export default Conversation;
