import { Request, Response } from "express";
import User from "../../Models/UserModel";
import Movie from "../../Models/MovieModel";

export const postMovie = async (req: Request, res: Response) => {
  const reqBody = req.body;
  const user = req.user;

  const loggedInUser = await User.findOne({ email: user?.email });

  const movie = new Movie({ ...reqBody, user: loggedInUser?._id });

  await movie.save();

  return res.send({ message: "Movie added successfully", success: true });
};
