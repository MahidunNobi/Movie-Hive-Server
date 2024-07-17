import { Router } from "express";
import { postMovie } from "../Handlers/Movies/movies";
import { verifyToken } from "../Utils/VerifyToken";

const movieRouter = Router()

movieRouter.post("/", verifyToken, postMovie)

export default movieRouter