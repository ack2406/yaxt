import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

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
    fetch(`http://localhost:5000/tests/${id}`)
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
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("gray.100", "gray.700")}
        w={{ base: "95%", md: "50%", lg: "31rem" }}
        p="5"
        borderWidth="1px"
        rounded="md"
        boxShadow={"sm"}
        display="flex"
        flexDirection="column"
      >
        <Heading textAlign="center">{test.name}</Heading>
        <Flex justifyContent="center" gap="8">
          <Text>
            {points}/{answersGiven}
          </Text>
          <Text>
            {answersGiven
              ? Math.round((points / answersGiven) * 10000) / 100
              : "-"}
            %
          </Text>
          <Text>
            {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
            {time % 60}
          </Text>
        </Flex>

        <Button
          onClick={nextQuestion}
          disabled={!answered && !finished}
          m="auto"
          mt="5"
          w="100%"
          bg={useColorModeValue("gray.300", "gray.600")}
          _hover={{
            bg: useColorModeValue("gray.300", "gray.600"),
          }}
          {...((answered || finished) && {
            _hover: {
              bg: useColorModeValue("gray.400", "gray.500"),
            },
          })}
        >
          {finished ? "Restart" : "Następne Pytanie"}
        </Button>

        <Box>
          {test.questions &&
            (!finished ? (
              <Question
                key={test.questions[questionIndex].id}
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

export default Test;
