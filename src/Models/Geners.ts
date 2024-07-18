import { Document, Schema, model } from "mongoose";

interface gernersType extends Document {
  value: string;
  label: string;
}

const generSchema: Schema<gernersType> = new Schema({
  value: String,
  label: String,
});

const Geners = model("Geners", generSchema);

export default Geners;
