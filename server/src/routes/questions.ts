import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questions";
import { checkAuth } from "../config/utils";

const QuestionRouter = express.Router();

QuestionRouter.route("/").get(getAllQuestions).post(checkAuth, createQuestion);

QuestionRouter.route("/:id")
  .get(getQuestionById)
  .put(checkAuth, updateQuestion)
  .delete(checkAuth, deleteQuestion);

export { QuestionRouter };
