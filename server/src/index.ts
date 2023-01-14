import express, { Request, Response } from "express";
import { TestRouter } from "./routes/tests";

const app = express();

// connect to the database
// connectToDatabase();

// define routes
app.use("/api/tests", TestRouter);
// app.use("/api/questions", QuestionRouter);
// app.use("/api/answers", AnswerRouter);

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
