import React from "react";
import { Field, FieldArray } from "formik";

import AddAnswer from "./AddAnswer";

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

const AddQuestion = () => {
  return (
    <div className="add-questions">
      <div className="add-questions-title">Add Questions</div>
      <FieldArray name="questions">
        {({ push, remove, form }) => {
          const { values: valueQuestions } = form;
          const { questions } = valueQuestions;

          return (
            <div className="add-questions-list">
              {questions.map((question: IQuestion, indexQuestion: number) => (
                <div className="add-question" key={indexQuestion}>
                  <div className="top-answer">
                    <label htmlFor={`questions.${indexQuestion}.content`}>
                      Question
                    </label>

                    <div
                      className="add-question-remove"
                      onClick={() => remove(indexQuestion)}
                    >
                      X
                    </div>
                  </div>

                  <Field
                    name={`questions.${indexQuestion}.content`}
                    type="text"
                  />

                  <AddAnswer
                    question={question}
                    indexQuestion={indexQuestion}
                  />
                </div>
              ))}
              <div
                className="add-question-push"
                onClick={() =>
                  push({
                    content: "",
                    answers: [{ content: "", is_correct: false }],
                  })
                }
              >
                Dodaj
              </div>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default AddQuestion;
