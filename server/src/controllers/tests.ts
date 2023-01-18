import { Request, Response } from "express";
import { Test } from "../models/Test";

// create a new test
export const createTest = async (req: Request, res: Response) => {
  try {
    const test = new Test({
      title: req.body.title,
      description: req.body.description
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
    const tests = await Test.find();
    res.status(200).json({ message: "Tests retrieved", tests });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tests", error });
  }
};

// read a test
export const getTestById = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test retrieved", test });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving test", error });
  }
};
