export interface Test {
  id: string;
  title: string;
  description: string;
  image: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  content: string;
  type: string;
  image: string;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
