import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import ENVIRONMENT from "../config/vars";

export interface IUser {
  name: string;
  password: string;
  access_token: string;
  refresh_token: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      match: /@[a-z_]+[0-9]*/,
      maxlength: 16,
      minlength: 8,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    access_token: String,
    refresh_token: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    if (
      !this.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/) //minimum 8 character, one lowercase, one uppercase and one number
    ) {
      throw new Error("Password validation failed");
    }
    const salt = await bcrypt.genSalt(ENVIRONMENT.SALT_ROUND);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
