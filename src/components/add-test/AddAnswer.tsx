import React from "react";
import { Field, FieldArray } from "formik";

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

interface AddAnswerProps {
  indexQuestion: number;
  question: IQuestion;
}

const AddAnswer = ({ indexQuestion, question }: AddAnswerProps) => {
  return (
    <FieldArray name={`questions.${indexQuestion}.answers`}>
      {({ push, remove }) => {
        return (
          <div className="add-question-answers">
            {question.answers.map((_, indexAnswer: number) => (
              <div className="add-question-answer" key={indexAnswer}>
                <div className="top-answer">
                  <label
                    htmlFor={`questions.${indexQuestion}.answers.${indexAnswer}.content`}
                  >
                    Answer
                  </label>
                  <div
                    className="add-question-answer-remove"
                    onClick={() => remove(indexAnswer)}
                  >
                    X
                  </div>
                </div>

                <Field
                  name={`questions.${indexQuestion}.answers.${indexAnswer}.content`}
                  type="text"
                />
                <div className="correctField">
                  <label
                    htmlFor={`questions.${indexQuestion}.answers.${indexAnswer}.is_correct`}
                  >
                    Correct
                  </label>
                  <Field
                    name={`questions.${indexQuestion}.answers.${indexAnswer}.is_correct`}
                    type="checkbox"
                  />
                </div>
              </div>
            ))}
            <div
              className="add-question-answer-push"
              onClick={() =>
                push({
                  content: "",
                  is_correct: false,
                })
              }
            >
              Dodaj odpowiedź
            </div>
          </div>
        );
      }}
    </FieldArray>
  );
};

export default AddAnswer;
