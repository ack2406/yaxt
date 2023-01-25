import dotenv from "dotenv";
import express from "express";
import { checkAuth } from "../config/utils";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const AuthRouter = express.Router();

AuthRouter.route("/").post((req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }

  if (token == JWT_SECRET) {
    return res.status(200).json({
      message: "Auth successful",
      token: token,
    });
  } else {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
});

export { AuthRouter };
