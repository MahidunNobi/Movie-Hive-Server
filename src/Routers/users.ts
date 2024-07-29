import express from "express";
import { getUser, saveUser } from "../Handlers/Users";
import { verifyToken } from "../Utils/VerifyToken";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.get("/:email", verifyToken, getUser);

export default userRouter;
