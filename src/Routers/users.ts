import express from "express"
import { saveUser } from "../Handlers/Users";

const userRouter = express.Router();

userRouter.post("/", saveUser)

export default userRouter