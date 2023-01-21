export interface Test {
  _id: number;
  title: string;
  description: string;
  image: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  _id: number;
  content: string;
  type: string;
  image: string;
  test: Test;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  _id: number;
  content: string;
  isCorrect: boolean;
  image: string;
  question: Question;
  createdAt: Date;
  updatedAt: Date;
}