import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../../../Models/UserModel";
import Movie from "../../../Models/MovieModel";

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
