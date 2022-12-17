import React from "react";
import { FieldArray, Formik, useFormik, Field, Form } from "formik";

import AddQuestion from "./AddQuestion";

import "./addTest.scss";

const AddTest = () => {
  const initialValues = {
    name: "",
    description: "",
    questions: [
      {
        content: "",
        answers: [
          {
            content: "",
            is_correct: false,
          },
        ],
      },
    ],
  };

  return (
    <div className="add-test">
      <div className="add-test-title">Add Test</div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: values.name,
              description: values.description,
              picture_path: ""
            }),
          };
          fetch("http://sobke.duckdns.org:8000/sets", requestOptions)
            .then((res) => res.json())
            .then((res) => {
              values.questions.forEach((question) => {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    content: question.content,
                    picture_path: ""
                  }),
                };
                fetch(`http://sobke.duckdns.org:8000/sets/${res.id}/questions`, requestOptions)
                  .then((res) => res.json())
                  .then((res) => {
                    question.answers.forEach((answer) => {
                      const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          content: answer.content,
                          is_correct: answer.is_correct,
                          question_id: res.id,
                        }),
                      };
                      fetch(`http://sobke.duckdns.org:8000/questions/${res.id}/answers`, requestOptions);
                    });
                  });
              });
            });
        }}
        enableReinitialize
      >
        {() => (
          <Form>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />

              <label htmlFor="description">Description</label>
              <Field name="description" type="text" />

              <AddQuestion />

              <button type="submit">Submit</button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTest;
