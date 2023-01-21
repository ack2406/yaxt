import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }

  if (token == JWT_SECRET) {
    next();
  } else {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
