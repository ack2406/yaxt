import { Schema, model } from "mongoose";

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Answer = model("Answer", AnswerSchema);
