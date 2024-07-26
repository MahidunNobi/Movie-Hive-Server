import { Router } from "express";
import { getMovie, getUserMovie, postMovie } from "../Handlers/Movies/movies";
import { verifyToken } from "../Utils/VerifyToken";

const movieRouter = Router();

movieRouter.post("/", verifyToken, postMovie);
movieRouter.get("/user", verifyToken, getUserMovie);
movieRouter.get("/:id", verifyToken, getMovie);

export default movieRouter;
