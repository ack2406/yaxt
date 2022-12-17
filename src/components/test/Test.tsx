import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import "./test.scss";
import Question from "./Question";

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

interface ITest {
  id: number;
  name: string;
  questions: IQuestion[];
}

const Test = () => {
  const [test, setTest] = useState({} as ITest);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [answersGiven, setAnswersGiven] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTest = () => {
    fetch(`http://sobke.duckdns.org:8000/sets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // shuffle questions and answers
        data.questions.forEach((question: IQuestion) => {
          question.answers.sort(() => Math.random() - 0.5);
        });
        data.questions.sort(() => Math.random() - 0.5);
        return data;
      })
      .then((data) => {
        setTest(data);
      });
  };

  const resetTest = () => {
    getTest();
    setQuestionIndex(0);
    setPoints(0);
    setAnswersGiven(0);
    setFinished(false);
    setTime(0);
  };

  const nextQuestion = () => {
    setAnswered(false);
    if (finished) {
      resetTest();
    } else {
      if (questionIndex < test.questions.length - 1) {
        setQuestionIndex((questionIndex) => questionIndex + 1);
      } else {
        setFinished(true);
      }
    }
  };

  const validateAnswer = (question: IQuestion, answer: IAnswer) => {
    setAnswered(true);
    setAnswersGiven((answersGiven) => answersGiven + 1);
    if (answer.is_correct) {
      setPoints((points) => points + 1);
    } else {
      setTest((prevTest) => {
        let newQuestion = { ...question };
        // increment newQuestion's id by one bigger than last in test array
        newQuestion.id =
          prevTest.questions[prevTest.questions.length - 1].id + 1;
        // add newQuestion to test array
        prevTest.questions.push(newQuestion);

        return prevTest;
      });
    }
  };

  const { id } = useParams();

  useEffect(() => getTest(), []);

  return (
    <div className="test">
      <div className="test-title">{test.name}</div>

      <div className="test-stats">
        <div className="test-stat-points">
          {points}/{answersGiven}
        </div>
        <div className="test-stat-percent">
          {answersGiven
            ? Math.round((points / answersGiven) * 10000) / 100
            : "-"}
          %
        </div>
        <div className="test-stat-time">
          {
            // display time in minutes and seconds
            Math.floor(time / 60) +
              ":" +
              (time % 60 < 10 ? "0" : "") +
              (time % 60)
          }
        </div>
      </div>

      <div className="test-question">
        {test.questions &&
          (!finished ? (
            <Question
              key={test.questions[questionIndex].id}
              question={test.questions[questionIndex]}
              validateAnswer={validateAnswer}
            />
          ) : (
            <div className="test-finished">Test zakończony.</div>
          ))}
      </div>

      <div className="test-controls">
        <div
          className="test-control-button-next"
          onClick={() => nextQuestion()}
        >
          {finished
            ? "Zacznij od nowa"
            : answered
            ? "Następne pytanie"
            : "Pomiń pytanie"}
        </div>
      </div>
    </div>
  );
};

export default Test;
