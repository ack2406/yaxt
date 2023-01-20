import express from "express";
import {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
} from "../controllers/tests";
import { checkAuth } from "../config/utils";

const TestRouter = express.Router();

TestRouter.route("/").get(getAllTests).post(checkAuth, createTest);

TestRouter.route("/:id").get(getTestById).put(checkAuth, updateTest).delete(checkAuth, deleteTest);

export { TestRouter };
