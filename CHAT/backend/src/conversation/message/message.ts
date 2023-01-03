import mongoose, { Schema } from "mongoose";
// import User from "../../user/user";
// import Conversation from "../conversation";

export interface IMessage {
  type: "text" | "image";
  message: string;
  from_id: mongoose.Types.ObjectId;
  conversation_id: mongoose.Types.ObjectId;
}

const MessageSchema = new mongoose.Schema<IMessage>(
  {
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
    from_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Sender is required"],
    },
    conversation_id: {
      type: Schema.Types.ObjectId,
      required: [true, "Conversation is required"],
    },
  },
  { timestamps: true }
);

// MessageSchema.virtual("from", {
//   ref: "conversation",
//   localField: "from_id",
//   foreignField: "members._id",
//   justOne: true,
// });

const Message = mongoose.model("message", MessageSchema);

export default Message;
