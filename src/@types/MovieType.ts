import { Types } from "mongoose";

export interface IMovie extends Document {
  movie_name: string;
  published_year: number;
  story: string;
  movie_geners: [string];
  movie_ratting: number;
  user: Types.ObjectId;
}
