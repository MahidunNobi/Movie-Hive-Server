import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Movie from "../../../Models/MovieModel";

export const updateMovie = async (req: Request, res: Response) => {
  const reqBody = req.body;
  const { id } = req.params;
  const user = req.user;

  // const loggedInUser = await User.findOne({ email: user?.email });
  const genersId = reqBody.movie_geners.map(
    (gener: { _id: string }) => new ObjectId(gener._id)
  );
  const movieObj = {
    ...reqBody,
    movie_geners: genersId,
    user: reqBody.user,
  };

  const movie = await Movie.findByIdAndUpdate(new ObjectId(id), movieObj);
  return res.send({ message: "Movie updated successfully", success: true });
};
