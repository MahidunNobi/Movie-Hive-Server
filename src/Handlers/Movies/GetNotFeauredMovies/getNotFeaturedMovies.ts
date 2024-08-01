import { Request, Response } from "express";
import Movie from "../../../Models/MovieModel";

export const getNotFeaturedMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find({
      $or: [{ featured: { $exists: false } }, { featured: false }],
    })
      .populate("movie_geners")
      .populate("user");
    return res.send(movies);
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
