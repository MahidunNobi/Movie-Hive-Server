import { Request, Response } from "express";
import Movie from "../../../Models/MovieModel";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate("movie_geners").populate("user");
    return res.send(movies);
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
