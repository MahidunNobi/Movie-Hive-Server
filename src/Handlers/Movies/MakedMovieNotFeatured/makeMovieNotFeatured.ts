import { Request, Response } from "express";
import Movie from "../../../Models/MovieModel";
import { ObjectId } from "mongodb";

export const makedMovieNotFeatured = async (req: Request, res: Response) => {
  const params = req.params;
  const { id } = params;
  try {
    const movie = await Movie.findByIdAndUpdate(new ObjectId(id), {
      featured: false,
    });
    return res.send({
      message: "Removed movie from featured list",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
