import mongoose, { Schema } from "mongoose";
import User from "../../user/user";

export interface IMessage {
  type: "text" | "image";
  message: string;
  from: mongoose.Types.ObjectId;
  conversation_id: mongoose.Types.ObjectId;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  type: {
    type: String,
    enum: ["text", "string"],
    required: [true, "Message type is required"],
    default: "text",
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  from: {
    type: Schema.Types.ObjectId,
    required: [true, "Sender is required"],
    ref: User,
  },
});

const Message = mongoose.model("message", MessageSchema);

export default Message;
