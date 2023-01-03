import mongoose from "mongoose";

export interface IUser {
  name: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
