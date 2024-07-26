import { Types } from "mongoose";

export interface IUser extends Document {
  _id?: Types.ObjectId;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
}
