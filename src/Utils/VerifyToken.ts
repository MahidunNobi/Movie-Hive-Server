import { NextFunction, Request, Response } from "express";
import Jwt, { VerifyErrors } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.movie_token;
  if (!token) return res.status(401).send({ message: "Unauthenticated!" });
  Jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decode: Object | undefined) => {
      if (err || decode === undefined) {
        console.log(err);
        return res.status(403).send({ message: "Token verify failled" });
      }
      const decodedData = decode as { email: string };
      req.user = decodedData;
      next();
    }
  );
};
