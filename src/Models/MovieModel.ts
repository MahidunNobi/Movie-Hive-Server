import mongoose, { Document, Schema, Types } from "mongoose";
import { IMovie } from "../@types/MovieType";

const movieSchema: Schema<IMovie> = new Schema({
  movie_name: String,
  published_year: Number,
  story: String,
  movie_geners: [{ type: Schema.Types.ObjectId, ref: "Geners" }],
  movie_ratting: Number,
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  movie_poster_url: String,
  featured: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
