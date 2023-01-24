import express from "express";
import {
  getAllAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answers";
import { checkAuth } from "../config/utils";

const AnswerRouter = express.Router();

AnswerRouter.route("/").get(getAllAnswers).post(checkAuth, createAnswer);

AnswerRouter.route("/:id")
  .get(getAnswerById)
  .put(checkAuth, updateAnswer)
  .delete(checkAuth, deleteAnswer);

export { AnswerRouter };
