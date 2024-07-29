import { Router } from "express";
import {
  deleteMovie,
  getAllMovies,
  getFeaturedMovies,
  getMovie,
  getUserMovie,
  postMovie,
  updateMovie,
} from "../Handlers/Movies/movies";
import { verifyToken } from "../Utils/VerifyToken";

const movieRouter = Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/featured", getFeaturedMovies);
movieRouter.post("/", verifyToken, postMovie);
movieRouter.patch("/:id", verifyToken, updateMovie);
movieRouter.delete("/:id", verifyToken, deleteMovie);
movieRouter.get("/user", verifyToken, getUserMovie);
movieRouter.get("/:id", verifyToken, getMovie);

export default movieRouter;
