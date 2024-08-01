import { Router } from "express";
import {
  deleteMovie,
  getAllMovies,
  getFeaturedMovies,
  getMovie,
  getNotFeaturedMovies,
  getUserMovie,
  makedMovieFeatured,
  makedMovieNotFeatured,
  postMovie,
  updateMovie,
} from "../Handlers/Movies/movies";
import { verifyToken } from "../Utils/VerifyToken";
import { verifyAdmin } from "../Utils/VerifyAdmin";

const movieRouter = Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/featured", getFeaturedMovies);
movieRouter.get("/not-featured", getNotFeaturedMovies);
movieRouter.post("/", verifyToken, postMovie);
movieRouter.patch("/:id", verifyToken, updateMovie);
movieRouter.delete("/:id", verifyToken, deleteMovie);
movieRouter.get("/user", verifyToken, getUserMovie);
movieRouter.get("/:id", verifyToken, getMovie);

// Admin Routes
movieRouter.post("/featured/:id", verifyToken, verifyAdmin, makedMovieFeatured);
movieRouter.post(
  "/not-featured/:id",
  verifyToken,
  verifyAdmin,
  makedMovieNotFeatured
);

export default movieRouter;
