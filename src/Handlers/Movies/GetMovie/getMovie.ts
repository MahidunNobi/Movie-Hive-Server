import { Request, Response } from "express";
import Movie from "../../../Models/MovieModel";
import { ObjectId } from "mongodb";

export const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(new ObjectId(id))
      .populate("movie_geners")
      .populate("user");
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
