import mongoose, { Document, Schema, Types } from "mongoose";

interface IMovie extends Document {
  movie_name: string;
  published_year: number;
  story: string;
  movie_geners: [string];
  movie_ratting: number;
  user: Types.ObjectId;
}

const movieSchema: Schema<IMovie> = new Schema({
  movie_name: String,
  published_year: Number,
  story: String,
  movie_geners: [String],
  movie_ratting: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
