const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    password: String,
    googleAuth: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    role: {
      type: String,
      enum: ["ADMIN", "BUYER"],
      default: "BUYER",
    },
    cart: [
      {
        item: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    refresh_token: String,
    access_token: String,
    reset_token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
