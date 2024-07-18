import { Document } from "mongoose";

export interface IGerners extends Document {
  _id?: string;
  value: string;
  label: string;
}
