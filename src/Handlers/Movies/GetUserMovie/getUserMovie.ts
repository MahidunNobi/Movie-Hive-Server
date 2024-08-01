import { Request, Response } from "express";
import User from "../../../Models/UserModel";
import Movie from "../../../Models/MovieModel";

export const getUserMovie = async (req: Request, res: Response) => {
  const userObj = req.user;
  const user = await User.findOne({ email: userObj?.email });
  const movies = await Movie.find({ user: user?._id }).populate("movie_geners");

  res.send({ Message: "Successfull", data: movies });
};
