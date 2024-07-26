import { Types } from "mongoose";

export interface IMovie extends Document {
  _id?: Types.ObjectId | string;
  movie_name: string;
  published_year: number;
  story: string;
  movie_geners: [string];
  movie_ratting: number;
  user?: string;
  movie_poster_url?: string;
}
