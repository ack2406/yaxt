import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questions";

const QuestionRouter = express.Router();

QuestionRouter.route("/").get(getAllQuestions).post(createQuestion);

QuestionRouter.route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

export { QuestionRouter };
