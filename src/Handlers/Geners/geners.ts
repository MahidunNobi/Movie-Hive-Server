import { Request, Response } from "express";
import Geners from "../../Models/Geners";

export const getGeners = async (req: Request, res: Response) => {
  const genersRes = await Geners.find();
  return res.send(genersRes);
};
