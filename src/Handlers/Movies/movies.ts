import { Request, Response } from "express";
import User from "../../Models/UserModel";
import Movie from "../../Models/MovieModel";
import { ObjectId } from "mongodb";
import { IUser } from "../../@types/UserType";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate("movie_geners").populate("user");
    return res.send(movies);
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};
export const getFeaturedMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find({ featured: true })
      .populate("movie_geners")
      .populate("user");
    return res.send(movies);
  } catch (error) {
    console.log(error);
    res.send({ message: "There was an error", error });
  }
};

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

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Getting the user
  const userReqObj = req.user;
  if (!userReqObj?.email) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
  const user = await User.findOne({ email: userReqObj.email });
  const movie = await Movie.findById(new ObjectId(id));

  if (user?._id?.toString() == movie?.user?.toString()) {
    const deleteRes = await movie?.deleteOne();
    if (
      deleteRes &&
      "deletedCount" in deleteRes &&
      deleteRes.deletedCount > 0
    ) {
      return res.send({ message: "Movie deleted successfully", success: true });
    } else {
      return res.send({
        message: "Failed to deleted the movie",
        success: false,
      });
    }
  }

  return res.send({
    message: "Sorry you're not the author of this post",
    success: false,
  });
};
