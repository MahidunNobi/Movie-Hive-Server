import { Router } from "express";
import {
  getMovie,
  getUserMovie,
  postMovie,
  updateMovie,
} from "../Handlers/Movies/movies";
import { verifyToken } from "../Utils/VerifyToken";

const movieRouter = Router();

movieRouter.post("/", verifyToken, postMovie);
movieRouter.patch("/:id", verifyToken, updateMovie);
movieRouter.get("/user", verifyToken, getUserMovie);
movieRouter.get("/:id", verifyToken, getMovie);

export default movieRouter;
