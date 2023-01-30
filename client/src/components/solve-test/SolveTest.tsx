import { SetStateAction, useEffect, useState } from "react";
import { To, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";

import SolveTestQuestion from "./SolveTestQuestion";

import { Answer, Question, Test } from "../../types/Basic";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SolveTest = () => {
  const [test, setTest] = useState({} as Test);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [answersGiven, setAnswersGiven] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState({} as NodeJS.Timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    setTimer(interval)

    return () => clearInterval(interval);
  }, []);

  const getTest = () => {
    fetch(API_URL + `/tests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // shuffle questions and answers
        data.test.questions.forEach((question: Question) => {
          question.answers.sort(() => Math.random() - 0.5);
        });
        data.test.questions.sort(() => Math.random() - 0.5);
        return data.test;
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
        clearInterval(timer);
        setFinished(true);
      }
    }
  };

  const validateAnswer = (question: Question, answer: Answer) => {
    setAnswered(true);
    setAnswersGiven((answersGiven) => answersGiven + 1);
    if (answer.isCorrect) {
      setPoints((points) => points + 1);
    } else {
      setTest((prevTest) => {
        let newQuestion = { ...question };
        // increment newQuestion's id by one bigger than last in test array
        newQuestion._id =
          prevTest.questions[prevTest.questions.length - 1]._id + 1;
        // add newQuestion to test array
        prevTest.questions.push(newQuestion);

        return prevTest;
      });
    }
  };

  const { id } = useParams();

  useEffect(() => getTest(), []);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg="gray.700"
        w={{ base: "95%", md: "50%", lg: "31rem" }}
        p="5"
        borderWidth="1px"
        rounded="md"
        boxShadow="sm"
        display="flex"
        flexDirection="column"
      >
        <Heading textAlign="center">{test.title}</Heading>
        <Flex justifyContent="center" gap="8">
          <Text>
            Pytanie: {questionIndex + 1}/{test.questions?.length}
          </Text>
          <Text>
            Punkty: {points}/{answersGiven}
          </Text>
          <Text>
            Czas: {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
            {time % 60}
          </Text>
        </Flex>

        <Button
          onClick={nextQuestion}
          disabled={!answered && !finished}
          m="auto"
          mt="5"
          w="100%"
          bg="gray.600"
          _hover={{
            bg: "gray.600",
          }}
          {...((answered || finished) && {
            _hover: {
              bg: "gray.500",
            },
          })}
        >
          {finished ? "Restart" : "Następne Pytanie"}
        </Button>

        <Box>
          {test.questions &&
            (!finished ? (
              <SolveTestQuestion
                key={test.questions[questionIndex]._id}
                question={test.questions[questionIndex]}
                validateAnswer={validateAnswer}
              />
            ) : (
              <Text></Text>
            ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default SolveTest;
