import { Request, Response } from "express";
import { isCallChain } from "typescript";
import { Answer } from "../models/Answer";
import { Question } from "../models/Question";

// create a new answer
export const createAnswer = async (req: Request, res: Response) => {
  try {
    const answer = new Answer({
      content: req.body.content,
      isCorrect: req.body.isCorrect,
      image: req.body.image,
      question: req.body.question,
    });

    await answer.save();

    // add reference to question
    const question = await Question.findByIdAndUpdate(
      req.body.question,
      { $push: { answers: answer._id } },
      { new: true }
    );

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

// update a answer
export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        isCorrect: req.body.isCorrect,
      },
      { new: true }
    );
    if (!answer) {
      res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({ message: "Answer updated", answer });
  } catch (error) {
    res.status(500).json({ message: "Error updating answer", error });
  }
};

// delete a answer
export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) {
      res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({ message: "Answer deleted", answer });
  } catch (error) {
    res.status(500).json({ message: "Error deleting answer", error });
  }
};
