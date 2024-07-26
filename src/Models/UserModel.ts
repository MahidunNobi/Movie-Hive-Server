import mongoose, { Schema } from "mongoose";
import { IUser } from "../@types/UserType";

const userSchema: Schema<IUser> = new Schema({
  email: String,
  displayName: String,
  photoURL: String,
  role: String,
});

const User = mongoose.model("Users", userSchema);
export default User;
