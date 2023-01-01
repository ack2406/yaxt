import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
}

interface ITestTileProps {
  test: ITest;
}

const TestTile = ({ test }: ITestTileProps) => {
  const getTest = () => {
    // get test from database
    return fetch(`http://localhost:5000/tests/${test.id}`)
      .then((response) => response.json())
      .then((data) => data);
  };

  // create function that removes test with all its questions and answers
  const removeTest = async () => {
    const fullTest = await getTest();
    const questions = fullTest.questions;
    const answers = questions.map((question: IQuestion) => question.answers)[0];

    // remove all answers
    answers &&
      answers.forEach((answer: IAnswer) => {
        fetch(`http://localhost:5000/answers/${answer.id}`, {
          method: "DELETE",
        });
      });

    // remove all questions
    questions &&
      questions.forEach((question: IQuestion) => {
        fetch(`http://localhost:5000/questions/${question.id}`, {
          method: "DELETE",
        });
      });

    // remove test
    fetch(`http://localhost:5000/tests/${test.id}`, {
      method: "DELETE",
    });

    // refresh page
    window.location.reload();
  };

  return (
    <div className="test-tile">
      <div className="test-tile-data">
        <div className="test-tile-title">{test.name}</div>
        <div className="test-tile-description">{test.description}</div>
      </div>
      <div className="test-tile-buttons">
        <Link to={`/edit-test/${test.id}`}>
          <button className="test-tile-button">Edytuj</button>
        </Link>
        <button className="test-tile-button" onClick={() => removeTest()}>
          Usuń
        </button>
      </div>
    </div>
  );
};

export default TestTile;
