import { Request, Response } from "express";
import User from "../../Models/UserModel";
import Movie from "../../Models/MovieModel";
import { ObjectId } from "mongodb";
import { IUser } from "../../@types/UserType";

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

export const getUserMovie = async (req: Request, res: Response) => {
  const userObj = req.user;
  const user = await User.findOne({ email: userObj?.email });
  const movies = await Movie.find({ user: user?._id }).populate("movie_geners");

  res.send({ Message: "Successfull", data: movies });
};
