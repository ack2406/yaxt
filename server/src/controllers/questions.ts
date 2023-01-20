import { Request, Response } from "express";
import { Question } from "../models/Question";
import { Test } from "../models/Test";

// create a new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = new Question({
      content: req.body.content,
      type: req.body.type,
      image: req.body.image,
      test: req.body.test,
    });

    await question.save();

    // add reference to question in test
    const test = await Test.findByIdAndUpdate(
      req.body.test,
      {
        $push: { questions: question._id },
      },
      { new: true }
    );

    if (!test) {
      res.status(404).json({ message: "Test not found" });
    }

    res.status(201).json({ message: "Question created", question: question });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
};

// read all questions
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find()
      .populate("test")
      .populate("answers");
    res.status(200).json({ message: "Questions retrieved", questions });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questions", error });
  }
};

// read a question
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id).populate("answers");
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question retrieved", question });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving question", error });
  }
};

// update a question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
      },
      { new: true }
    );
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question updated", question });
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error });
  }
};

// delete a question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted", question });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
};
