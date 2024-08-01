import { Router } from "express";
import { verifyToken } from "../Utils/VerifyToken";
import { verifyAdmin } from "../Utils/VerifyAdmin";
import { getAllMovies } from "../Handlers/Movies/GetAllMovies/getAllMovies";
import { getFeaturedMovies } from "../Handlers/Movies/GetFeaturedMovies/getFeaturedMovies";
import { getNotFeaturedMovies } from "../Handlers/Movies/GetNotFeauredMovies/getNotFeaturedMovies";
import { postMovie } from "../Handlers/Movies/PostMovie/postMovie";
import { updateMovie } from "../Handlers/Movies/UpdateMovie/updateMovie";
import { deleteMovie } from "../Handlers/Movies/DeleteMovie/deleteMovie";
import { getUserMovie } from "../Handlers/Movies/GetUserMovie/getUserMovie";
import { getMovie } from "../Handlers/Movies/GetMovie/getMovie";
import { makedMovieFeatured } from "../Handlers/Movies/MakedMovieFeatured/makedMovieFeatured";
import { makedMovieNotFeatured } from "../Handlers/Movies/MakedMovieNotFeatured/makeMovieNotFeatured";

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
