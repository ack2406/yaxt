import { Request, Response } from "express";
import { Test } from "../models/Test";

// create a new test
export const createTest = async (req: Request, res: Response) => {
  try {
    const test = new Test({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    await test.save();

    res.status(201).json({ message: "Test created", test: test });
  } catch (error) {
    res.status(500).json({ message: "Error creating test", error });
  }
};

// read all tests
export const getAllTests = async (req: Request, res: Response) => {
  try {
    const tests = await Test.find().populate({
      path: "questions",
      populate: {
        path: "answers",
      },
    });
    res.status(200).json({ message: "Tests retrieved", tests });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tests", error });
  }
};

// read a test
export const getTestById = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.id).populate({
      path: "questions",
      populate: {
        path: "answers",
      },
    });
    if (!test) {
      res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test retrieved", test });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving test", error });
  }
};

// update a test
export const updateTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );
    if (!test) {
      res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test updated", test });
  } catch (error) {
    res.status(500).json({ message: "Error updating test", error });
  }
};

// delete a test
export const deleteTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted", test });
  } catch (error) {
    res.status(500).json({ message: "Error deleting test", error });
  }
};
