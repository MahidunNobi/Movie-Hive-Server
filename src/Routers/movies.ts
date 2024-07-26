import { Router } from "express";
import { getUserMovie, postMovie } from "../Handlers/Movies/movies";
import { verifyToken } from "../Utils/VerifyToken";

const movieRouter = Router();

movieRouter.post("/", verifyToken, postMovie);
movieRouter.get("/user", verifyToken, getUserMovie);

export default movieRouter;
