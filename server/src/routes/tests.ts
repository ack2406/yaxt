import express from "express";
import { getAllTests, getTestById, createTest } from "../controllers/tests";

const TestRouter = express.Router();

TestRouter.route("/").get(getAllTests).post(createTest);

TestRouter.route("/:id").get(getTestById);

export { TestRouter };
