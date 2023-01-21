import { Test } from "./Basic";

export interface TestTileProps {
  test: Test;
}

export interface Values {
  values: {
    title: string;
    description: string;
    questions: {
      content: string;
      answers: {
        content: string;
        isCorrect: boolean;
      }[];
    }[];
  };
}
