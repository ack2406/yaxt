import React from "react";
import { useEffect } from "react";

import "./test.scss";

interface IAnswer {
  id: number;
  content: string;
  is_correct: boolean;
}

interface IQuestion {
  id: number;
  content: string;
  answers: IAnswer[];
}

interface IQuestionProps {
  question: IQuestion;
  validateAnswer: (question: IQuestion, answer: IAnswer) => void;
}

const Question = ({ question, validateAnswer }: IQuestionProps) => {
  const [active, setActive] = React.useState(true);

  const [answerClasses, setAnswerClasses] = React.useState([] as string[]);

  const clickAnswer = (answer: IAnswer) => {
    if (active) {
      setActive(false);

      validateAnswer(question, answer);

      question.answers.forEach((otherAnswer) => {
        setAnswerClasses((answerClasses) => {
          if (otherAnswer.is_correct) {
            answerClasses[otherAnswer.id] = "correct";
          }
          else if (otherAnswer.id === answer.id) {
            answerClasses[otherAnswer.id] = "incorrect";
          }
          else {
            answerClasses[otherAnswer.id] = "grayed-out";
          }
          answerClasses[otherAnswer.id] += " answered";

          return answerClasses;
        });
      });
    }
  };

  return (
    <>
      <div className="question-content">{question.content}</div>
      <div className="question-answers">
        {question.answers.map((answer) => (
          <div
            className={`question-answer${answerClasses[answer.id] !== undefined ? " " + answerClasses[answer.id] : ""}`}
            key={answer.id}
            onClick={() => clickAnswer(answer)}
          >
            {answer.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default Question;
