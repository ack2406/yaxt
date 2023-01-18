import { Request, Response } from "express";
import { isCallChain } from "typescript";
import { Answer } from "../models/Answer";

// create a new answer
export const createAnswer = async (req: Request, res: Response) => {
  try {
    const answer = new Answer({
      content: req.body.content,
      isCorrect: req.body.isCorrect,
    });

    await answer.save();

    res.status(201).json({ message: "Answer created", answer: answer });
  } catch (error) {
    res.status(500).json({ message: "Error creating answer", error });
  }
};

// read all answers
export const getAllAnswers = async (req: Request, res: Response) => {
  try {
    const answers = await Answer.find();
    res.status(200).json({ message: "Answers retrieved", answers });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving answers", error });
  }
};

// read a answer
export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ message: "Answer retrieved", answer });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving answer", error });
  }
};
