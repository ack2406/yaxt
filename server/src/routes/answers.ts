import express from "express";
import {
  getAllAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answers";

const AnswerRouter = express.Router();

AnswerRouter.route("/").get(getAllAnswers).post(createAnswer);

AnswerRouter.route("/:id")
  .get(getAnswerById)
  .put(updateAnswer)
  .delete(deleteAnswer);

export { AnswerRouter };
