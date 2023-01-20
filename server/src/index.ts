import express from "express";
import { TestRouter } from "./routes/tests";
import { QuestionRouter } from "./routes/questions";
import { AnswerRouter } from "./routes/answers";
import connectDB from "./config/db";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 3000;

const app = express();

// connect to the database
connectDB();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors());


// define routes
app.use("/api/tests", TestRouter);
app.use("/api/questions", QuestionRouter);
app.use("/api/answers", AnswerRouter);

// start the server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
