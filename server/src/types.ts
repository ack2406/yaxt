export interface Test {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Question {
    id: string;
    content: string;
    answers: Answer[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Answer {
    id: string;
    content: string;
    isCorrect: boolean;
    createdAt: Date;
    updatedAt: Date;
}