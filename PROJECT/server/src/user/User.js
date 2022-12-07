const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      enum: ["ADMIN", "BUYER"],
      default: "BUYER",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    last_token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
