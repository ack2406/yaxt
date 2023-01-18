import express from "express";
import {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
} from "../controllers/tests";

const TestRouter = express.Router();

TestRouter.route("/").get(getAllTests).post(createTest);

TestRouter.route("/:id").get(getTestById).put(updateTest).delete(deleteTest);

export { TestRouter };
