import express, { Request, Response } from "express";
import { TestRouter } from "./routes/tests";
import connectDB from "./config/db";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000;

const app = express();

// connect to the database
connectDB();


// define routes
app.use("/api/tests", TestRouter);
// app.use("/api/questions", QuestionRouter);
// app.use("/api/answers", AnswerRouter);

// start the server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
