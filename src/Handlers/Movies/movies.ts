import { Request, Response } from "express";
import User from "../../Models/UserModel";
import Movie from "../../Models/MovieModel";
import { ObjectId } from "mongodb";

export const postMovie = async (req: Request, res: Response) => {
  const reqBody = req.body;
  const user = req.user;

  const loggedInUser = await User.findOne({ email: user?.email });
  const genersId = reqBody.movie_geners.map(
    (gener: { _id: string }) => new ObjectId(gener._id)
  );

  const movie = new Movie({
    ...reqBody,
    movie_geners: genersId,
    user: loggedInUser?._id,
  });
  await movie.save();
  return res.send({ message: "Movie added successfully", success: true });
};
