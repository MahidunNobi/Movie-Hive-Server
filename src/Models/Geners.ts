import { Document, Schema, model } from "mongoose";
import { IGerners } from "../@types/GenersType";

const generSchema: Schema<IGerners> = new Schema({
  value: String,
  label: String,
});

const Geners = model("Geners", generSchema);

export default Geners;
