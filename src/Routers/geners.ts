import { Router } from "express";
import { getGeners } from "../Handlers/Geners/geners";

const genersRouter = Router();

genersRouter.get("/", getGeners);

export default genersRouter;
