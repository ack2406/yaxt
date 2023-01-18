import { Request, Response } from "express";
import { Question } from "../models/Question";

// create a new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = new Question({
      content: req.body.content,
    });

    await question.save();

    res.status(201).json({ message: "Question created", question: question });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
};

// read all questions
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ message: "Questions retrieved", questions });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questions", error });
  }
};

// read a question
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question retrieved", question });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving question", error });
  }
};
