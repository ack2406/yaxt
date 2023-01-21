import { Answer, Question, Test } from "./Basic";

export interface NavbarButtonProps {
  content: string;
  refLink: string;
  icon: JSX.Element;
}

export interface QuestionProps {
  question: Question;
  validateAnswer: (question: Question, answer: Answer) => void;
}

export interface TestTileProps {
  test: Test;
}

export interface AddAnswerProps {
  indexQuestion: number;
  question: Question;
}

export interface CloseProps {
  remove: <T>(index: number) => T | undefined;
  indexQuestion: number;
}