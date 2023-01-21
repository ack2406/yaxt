import { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Question = model("Question", QuestionSchema);
