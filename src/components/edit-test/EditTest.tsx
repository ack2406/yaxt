import React from "react";
import { FieldArray, Formik, useFormik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EditQuestion from "./EditQuestion";



interface IAnswer {
  id: number | null;
  content: string;
  is_correct: boolean;
}

interface IQuestion {
  id: number | null;
  content: string;
  answers: IAnswer[];
}

interface ITest {
  id: number | null;
  name: string;
  description: string;
  questions: IQuestion[];
}

const EditTest = () => {
  const [test, setTest] = useState({} as ITest);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/tests/${id}`)
      .then((response) => response.json())
      .then((data) => setTest(data));
  }, []);

  return (
    <div className="edit-test">
      <div className="edit-test-title">Edit Test</div>
      {test.id && (
        <Formik
          initialValues={test}
          onSubmit={(values) => {
            console.log(test);
            console.log(values);
          }}
          enableReinitialize
        >
          {() => (
            <Form>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />

              <label htmlFor="description">Description</label>
              <Field name="description" type="text" />

              <EditQuestion />

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditTest;
