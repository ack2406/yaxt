import React from "react";
import { Field, FieldArray } from "formik";

import EditAnswer from "./EditAnswer";

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

const EditQuestion = () => {
  return (
    <div className="edit-questions">
      <div className="edit-questions-title">Edit Questions</div>
      <FieldArray name="questions">
        {({ push, remove, form }) => {
          const { values: valueQuestions } = form;
          const { questions } = valueQuestions;

          return (
            <div className="edit-questions-list">
              {questions.map((question: IQuestion, indexQuestion: number) => (
                <div className="edit-question" key={indexQuestion}>
                  <div className="top-answer">
                    <label htmlFor={`questions.${indexQuestion}.content`}>
                      Question
                    </label>

                    <div
                      className="edit-question-remove"
                      onClick={() => remove(indexQuestion)}
                    >
                      X
                    </div>
                  </div>

                  <Field
                    name={`questions.${indexQuestion}.content`}
                    type="text"
                  />

                  <EditAnswer
                    question={question}
                    indexQuestion={indexQuestion}
                  />
                </div>
              ))}
              <div
                className="edit-question-push"
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

export default EditQuestion;
