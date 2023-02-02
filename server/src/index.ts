import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db";
import { AnswerRouter } from "./routes/answers";
import { QuestionRouter } from "./routes/questions";
import { TestRouter } from "./routes/tests";
import { AuthRouter } from "./routes/auth";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

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

// swagger

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// define routes
app.use("/api/tests", TestRouter);
app.use("/api/questions", QuestionRouter);
app.use("/api/answers", AnswerRouter);
app.use("/api/auth", AuthRouter)

// start the server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
