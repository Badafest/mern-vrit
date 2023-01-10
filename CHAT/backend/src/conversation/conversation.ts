import mongoose, { Schema } from "mongoose";
import User from "../user/user";

export interface IConversation {
  name: string;
  members: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
  requests: mongoose.Types.ObjectId[];
}

const ConversationSchema = new mongoose.Schema<IConversation>(
  {
    name: {
      type: String,
      required: [true, "Conversation name is required"],
      unique: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: [true, "Admin id is required"],
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: User,
    },
    requests: {
      type: [Schema.Types.ObjectId],
      ref: User,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", ConversationSchema);

export default Conversation;
