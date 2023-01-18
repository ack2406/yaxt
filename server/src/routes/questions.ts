import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
} from "../controllers/questions";

const QuestionRouter = express.Router();

QuestionRouter.route("/").get(getAllQuestions).post(createQuestion);

QuestionRouter.route("/:id").get(getQuestionById);

export { QuestionRouter };
