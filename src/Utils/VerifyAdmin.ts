import { NextFunction, Request, Response } from "express";
import User from "../Models/UserModel";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) return res.status(400).json({ message: "User not found" });
  const dbUser = await User.findOne({ email: user.email });
  if (dbUser?.role === "ADMIN") {
    return next();
  }
  return res.status(401).send({ message: "Unauthorized" });
};
