import { Request, Response } from "express";
import Movie from "../../../Models/MovieModel";
import { ObjectId } from "mongodb";

export const makedMovieFeatured = async (req: Request, res: Response) => {
  const params = req.params;
  const { id } = params;
  try {
    const movie = await Movie.findByIdAndUpdate(new ObjectId(id), {
      featured: true,
    });
    return res.send({
      message: "Made movie featured successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
