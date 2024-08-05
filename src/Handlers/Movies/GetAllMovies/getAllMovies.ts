import { Request, Response } from "express";
import Movie from "../../../Models/MovieModel";

export const getAllMovies = async (req: Request, res: Response) => {
  const query = req.query;

  try {
    // Setting the filter first
    let filter;
    if (query?.movie_name) {
      filter = {
        movie_name: { $regex: query.movie_name, $options: "i" },
      };
    }

    // Getting the data according to the filter
    const movies = await Movie.find(filter ? filter : {})
      .populate("movie_geners")
      .populate("user");
    return res.send(movies);
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
