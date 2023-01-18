import express from "express";
import {
  getAllAnswers,
  getAnswerById,
  createAnswer,
} from "../controllers/answers";

const AnswerRouter = express.Router();

AnswerRouter.route("/").get(getAllAnswers).post(createAnswer);

AnswerRouter.route("/:id").get(getAnswerById);

export { AnswerRouter };
